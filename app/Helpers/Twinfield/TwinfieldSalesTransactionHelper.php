<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Twinfield;

use App\Eco\Administration\Administration;
use App\Eco\Invoice\Invoice;
use App\Eco\Twinfield\TwinfieldLog;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Money\Currency;
use Money\Money;
use PhpTwinfield\ApiConnectors\TransactionApiConnector;
use PhpTwinfield\Enums\DebitCredit;
use PhpTwinfield\Enums\Destiny;
use PhpTwinfield\Enums\LineType;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Office;
use PhpTwinfield\SalesTransaction;
use PhpTwinfield\SalesTransactionLine;
use PhpTwinfield\Secure\OpenIdConnectAuthentication;
use PhpTwinfield\Secure\Provider\OAuthProvider;

class TwinfieldSalesTransactionHelper
{
    private $connection;
    private $administration;
    private $fromInvoiceDateSent;
    private $office;
    private $redirectUri;
    private $transactionApiConnector;
    private $changPayStatusTransactionApiConnector;
    private $currency;
    public $messages;

// Add a property to store accumulated transactions
    private $salesTransactionsBatch = [];

    const BATCH_SIZE = 50; // Set a batch size limit

    /**
     * TwinfieldSalesTransactionHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->administration = $administration;
        $this->fromInvoiceDateSent = $this->determineInvoiceDateSent();
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->redirectUri = \Config::get('app.url_api') . '/twinfield';
        $this->initializeConnection();

        $this->transactionApiConnector = new TransactionApiConnector($this->connection);
        $this->changPayStatusTransactionApiConnector = new ChangPayStatusTransactionApiConnector($this->connection);
        $this->dagboekCode = config('services.twinfield.verkoop_dagboek_code');
        $this->currency = new Currency( config('services.twinfield.verkoop_default_currency') );
        $this->grootboekDebiteuren = config('services.twinfield.verkoop_grootboek_debiteuren');
        $this->messages = [];
        $this->logStartSync();
    }

    private function determineInvoiceDateSent()
    {
        if($this->administration->date_sync_twinfield_invoices){
            return $this->administration->date_sync_twinfield_invoices;
        }

        return '2019-01-01';
    }

    private function initializeConnection()
    {
        if ($this->administration->twinfield_connection_type === "openid") {
            $provider = new OAuthProvider([
                'clientId'     => $this->administration->twinfield_client_id,
                'clientSecret' => $this->administration->twinfield_client_secret,
                'redirectUri'  => $this->redirectUri,
            ]);

            if (!empty($this->administration->twinfield_refresh_token)) {
                $this->connection = new OpenIdConnectAuthentication($provider, $this->administration->twinfield_refresh_token, $this->office);
            } else {
                $this->connection = null;
            }
        }
    }

    public function procesTwinfieldSalesTransaction()
    {
        if (!$this->administration->uses_twinfield) {
            return "Deze administratie maakt geen gebruik van Twinfield.";
        }

        if (!$this->administration->twinfield_is_valid) {
            return "Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken.";
        }

        set_time_limit(0);

        // Retrieve invoices to be checked in batches
        $invoicesToBeChecked = $this->getInvoicesToBeChecked();

        // Split invoices into chunks/batches
        $invoiceBatches = array_chunk($invoicesToBeChecked->toArray(), self::BATCH_SIZE);

        $chunkNumber = 0;
        $numberOfChunks = ceil($invoicesToBeChecked->count() / self::BATCH_SIZE);

        foreach ($invoiceBatches as $batch) {
            $chunkNumber++;
            $message = 'Start batch voor nota\'s (' . $chunkNumber . '/' . $numberOfChunks . ') voor in totaal ' . $invoicesToBeChecked->count() . ' nota\'s (' . self::BATCH_SIZE . ' per batch)';
            $this->logBatchSync($message);

            $this->processInvoiceBatch($batch);
            // hier eventueel delay inbouwen?

        }
        // Log the end of the entire synchronization process
        $message = 'Einde synchroniseren nota\'s voor Twinfield (organisatie: '
            . $this->administration->twinfield_organization_code
            . ', code: ' . $this->administration->twinfield_office_code
            . ', client Id: ' . $this->administration->twinfield_client_id
            . ').';
        $this->logEndSync($message);

        // If no messages were generated, add a default one
        if (count($this->messages) == 0) {
            array_push($this->messages, "Geen nota's om te synchroniseren gevonden.");
        }

        return implode(';', $this->messages);
    }

    private function getInvoicesToBeChecked()
    {
        return $this->administration->invoices()
            ->where('status_id', 'sent')
            ->where('date_sent', '>=', $this->fromInvoiceDateSent)
            ->whereDoesntHave('invoiceProducts', function ($query) {
                $query->whereNull('twinfield_ledger_code');
            })
            ->get();
    }

    private function processInvoiceBatch(array $invoiceBatch)
    {
        foreach ($invoiceBatch as $invoiceToBeChecked) {
            $invoiceToProcess = Invoice::find($invoiceToBeChecked['id']);
            if ($invoiceToProcess){
                $this->processInvoice($invoiceToProcess);
            }
        }
    }
    private function processInvoice($invoiceToProcess)
    {
        $response = $this->createSalesTransaction($invoiceToProcess);

        if($response === true){
            $message = 'Transactie nota ' . $invoiceToProcess->number . ' succesvol gesynchroniseerd.';
            $this->logGeneral($invoiceToProcess, $message, false, false);
            array_push($this->messages, $message);
            // Indien contact ingesteld op Incasso, maar nota is gekenmerkt voor Overboeking, dan blokkeer voor betaal/incasso run in Twinfield
            $contact = $invoiceToProcess->order->contact;
            if($contact->is_collect_mandate && $invoiceToProcess->payment_type_id == 'transfer')
            {
                $this->changePaymentStatus($invoiceToProcess);
            }
        }
        else{
            //soms zitten in de error message van Twinfield // voor de melding.
            $response = str_replace('//', '', $response);
//            $message = 'Synchronisatie transactie nota ' . $invoiceToProcess->number . ' gaf de volgende foutmelding: ' . $response;
//            $this->logGeneral($invoiceToProcess, $message, true, false);
            array_push($this->messages, $response);
        }

    }

    public function createSalesTransaction(Invoice $invoiceToProcess) {
        // connection van hier kunnen we ook gebruiken in TwinfieldcustomerHelper
        $twinfieldCustomerHelper = new TwinfieldCustomerHelper($this->administration, $this->connection);
        $twinfieldNumbers = $invoiceToProcess->order->contact->twinfieldNumbers;
        $twinfieldNumber  = $twinfieldNumbers->where('administration_id', '=', $this->administration->id)->first();
        $twinfieldCustomer = null;
        if($twinfieldNumber && $twinfieldNumber->twinfield_number)
        {
            $twinfieldCustomer = $twinfieldCustomerHelper->getTwinfieldCustomerByCode($twinfieldNumber->twinfield_number, $invoiceToProcess->order->contact);
        }
        if(!$twinfieldCustomer)
        {
            $twinfieldCustomer = $twinfieldCustomerHelper->createCustomer($invoiceToProcess->order->contact);
            $twinfieldCustomerHelper->updateCustomer($invoiceToProcess->order->contact);
        }

        //Invoice totaal bedrag incl. BTW
        //Destiny FINAL indien 0 invoice, anders TEMPORARY
        $totaalBedragIncl = new Money((round($invoiceToProcess->getTotalInclVatInclReductionAttribute() * 100, 0) ), $this->currency );
        $isNullInvoice = $invoiceToProcess->getTotalInclVatInclReductionAttribute() == 0;
        $invoiceDestiny = $isNullInvoice ? Destiny::FINAL() : Destiny::TEMPORARY();

        //Invoice datum
        $dateInvoice = Carbon::parse($invoiceToProcess->date_sent);

        //Due datum bepalen
        if ($invoiceToProcess->payment_type_id === 'transfer') {
            if ( $invoiceToProcess->days_to_expire && $invoiceToProcess->days_to_expire > 0 ){
                $daysToAdd2 = new \DateInterval('P' . $invoiceToProcess->days_to_expire . 'D');
                $dueDateInvoice2 = new \DateTime($invoiceToProcess->date_sent); ;
                $dueDateInvoice2->add( $daysToAdd2);

                $dueDateInvoice = Carbon::parse($invoiceToProcess->date_sent)->addDay($invoiceToProcess->days_to_expire);
            }else {
                $datePaymentDue = $invoiceToProcess->getDatePaymentDueAttribute();
                if ($dueDateInvoice = 0) {
                    $dueDateInvoice = Carbon::parse($invoiceToProcess->date_sent);
                } else {
                    $dueDateInvoice = Carbon::parse($datePaymentDue);
                }
            }
        }else{
            if ($invoiceToProcess->payment_type_id === 'collection' && $invoiceToProcess->date_collection) {
                $dueDateInvoice = Carbon::parse($invoiceToProcess->date_collection);
            }
        }

        //Salestransaction - Header XML maken
        $twinfieldSalesTransaction = new SalesTransaction();
        $twinfieldSalesTransaction
            ->setDestiny($invoiceDestiny)
            ->setRaiseWarning(false )
            ->setCode($this->dagboekCode)
            ->setCurrency($this->currency)
            ->setDate($dateInvoice)
            ->setPeriod($dateInvoice->format("Y/m"))
            ->setInvoiceNumber($invoiceToProcess->number)
            ->setPaymentReference("")
            ->setOffice($this->office)
            ->setDueDate($dueDateInvoice);

        //Salestransaction - Total line maken
        $idTeller = 1;
        $twinfieldTransactionLineTotal = new SalesTransactionLine();
        $twinfieldTransactionLineTotal
            ->setId($idTeller)
            ->setLineType(LineType::TOTAL())
            ->setDim1($this->grootboekDebiteuren)
            ->setDim2($twinfieldCustomer->getCode())
            ->setValue($totaalBedragIncl)
            ->setDebitCredit($totaalBedragIncl->getAmount()<0 ? DebitCredit::CREDIT() : DebitCredit::DEBIT())
            ->setDescription(substr($this->translateToValidCharacterSet($invoiceToProcess->subject), 0, 40));
        $twinfieldSalesTransaction->addLine($twinfieldTransactionLineTotal);

        //Vanuit invoice products bedragen per product (omzet) / bedragen per btw code alvast doortellen voor VAT regels hierna
        //Salestransaction - Detail lines maken (omzet regels)
        $vatData = new Collection();
        foreach($invoiceToProcess->invoiceProducts as $invoiceProduct){
            $vatCode   = $invoiceProduct->product->ledger->vatCode;
            $vatCodeTwinfield   = "";
            if($vatCode && $vatCode->id>0)
            {
                $vatCodeTwinfield   = $vatCode->twinfield_code;
                $vatLedgerCodeTwinfield   = $vatCode->twinfield_ledger_code;
            }
            $ledgerCode = $invoiceProduct->twinfield_ledger_code ? $invoiceProduct->twinfield_ledger_code :  "";

            $order = $invoiceToProcess->order;
            $orderProduct = $order->orderProducts->where('product_id', '=', $invoiceProduct->product_id)->first();
            $costCenterCode = '';
            if($orderProduct && $orderProduct->costCenter)
            {
                $costCenterCode = $orderProduct->costCenter->twinfield_cost_center_code;
            }
            if(!$costCenterCode)
            {
                $costCenterCode = '';
            }

            if($vatCode && $vatCode->id>0)
            {
                $vatAmount = $invoiceProduct->getAmountInclReductionVat();
                $invoiceVatAmount = new Money(round($vatAmount*100, 0), $this->currency );
                $vatAmountOld  = isset( $vatData[$vatCodeTwinfield]) ? $vatData[$vatCodeTwinfield]['vatAmount'] : 0;
                $vatData[$vatCodeTwinfield] = ['vatLedgerCode' => $vatLedgerCodeTwinfield, 'vatAmount' => $vatAmountOld + $vatAmount];
            }else{
                $invoiceVatAmount = new Money(0, $this->currency );
            }

            $exclAmount = round($invoiceProduct->getAmountInclReductionExclVat()*100, 0);
            $invoiceDetailExcl = new Money($exclAmount, $this->currency );
//            $descriptionDetail = $twinfieldCustomer ? ($twinfieldCustomer->getCode() . " " . $twinfieldCustomer->getName()) : ($invoiceToProcess->contact->number . " " . $invoiceToProcess->contact->full_name);
            $descriptionDetail = $invoiceToProcess->order->contact->number . " " . $this->translateToValidCharacterSet($invoiceToProcess->order->contact->full_name);

            $twinfieldTransactionLineDetail = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineDetail
                ->setId($idTeller)
                ->setLineType(LineType::DETAIL())
                ->setDim1($ledgerCode)
                ->setDim2($costCenterCode)
                ->setDim3($invoiceToProcess->order->project_number)
                ->setDescription(substr($descriptionDetail, 0, 40))
                ->setVatValue($invoiceVatAmount)
                ->setValue($invoiceDetailExcl)
                ->setDebitCredit($invoiceDetailExcl->getAmount()<0 ? DebitCredit::DEBIT() : DebitCredit::CREDIT());
            if($vatCode && $vatCode->id>0)
            {
                $twinfieldTransactionLineDetail
                    ->setVatCode($vatCodeTwinfield);
            }

            $twinfieldSalesTransaction->addLine($twinfieldTransactionLineDetail);
        }

        //Salestransaction - Vat lines maken (btw bedrag per btw code)
        foreach($vatData as $code => $vatDataDetail) {
            $invoiceDetailExcl = new Money( round(($vatDataDetail['vatAmount'])*100, 0), $this->currency );
            $twinfieldTransactionLineVat = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineVat
                ->setId($idTeller)
                ->setLineType(LineType::VAT())
                ->setDim1($vatDataDetail['vatLedgerCode'])
                ->setVatCode($code)
                ->setValue($invoiceDetailExcl)
                ->setDebitCredit($invoiceDetailExcl->getAmount()<0 ? DebitCredit::DEBIT() : DebitCredit::CREDIT());
            $twinfieldSalesTransaction->addLine($twinfieldTransactionLineVat);
        }

        //Salestransaction - versturen naar Twinfield
        try {
            $response = $this->transactionApiConnector->send($twinfieldSalesTransaction);
            if($invoiceToProcess->status_id === 'sent'){
                // 0 invoice meteen op betaald zetten
                if($isNullInvoice){
                    $invoiceToProcess->status_id = 'paid';
                }else{
                    $invoiceToProcess->status_id = 'exported';
                }
            }
            $invoiceToProcess->twinfield_number = $response->getNumber();
            $invoiceToProcess->save();
            return true;
        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Er is een twinfield fout opgetreden bij synchronisatie nota\'s, nota: ' . $invoiceToProcess->number . '. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            $this->logGeneral($invoiceToProcess, $message, true, true);
            return $message;
        } catch (\Exception $e) {
            $message = 'Er is een fout opgetreden bij synchronisatie nota\'s, nota: ' . $invoiceToProcess->number . '. Foutmelding: ' . $e->getMessage();
            $this->logGeneral($invoiceToProcess, $message, true, true);
            return $message;
        }
    }

    public function changePaymentStatus(Invoice $invoiceToProcess)
    {
        $transaction = new ChangPayStatusTransaction();
        $transaction->setOffice($this->office)
            ->setCode($this->dagboekCode)
            ->setNumber($invoiceToProcess->twinfield_number)
            ->setPayStatus('N');

        try {
            $this->changPayStatusTransactionApiConnector->send($transaction);
            $this->messages[] = "Payment status updated successfully for Invoice {$invoiceToProcess->number}.";

            $message = 'Transactie nota ' . $invoiceToProcess->number . ' geblokkeerd voor betaalrun.';
            return $this->logGeneral($invoiceToProcess, $message, false, false);
            TwinfieldLog::create([
                'invoice_id' => $invoiceToProcess->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'invoice',
                'user_id' => Auth::user()->id,
                'is_error' => false,
            ]);
            array_push($this->messages, $message);

        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Er is een twinfield fout opgetreden bij Blokkeren voor betaalrun, nota:  ' . $invoiceToProcess->number . '. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            $this->logGeneral($invoiceToProcess, $message, true, true);
        } catch (\Exception $e) {
            $message = 'Er is een fout opgetreden bij Blokkeren voor betaalrun, nota: ' . $invoiceToProcess->number . '. Foutmelding: ' . $e->getMessage();
            $this->logGeneral($invoiceToProcess, $message, true, true);
        }
    }

    private function logStartSync()
    {
        $message = 'Start synchroniseren nota\'s (vanaf ' . Carbon::parse($this->fromInvoiceDateSent)->format('d-m-Y') . '), organisatie: '
            . $this->administration->twinfield_organization_code
            . ', code : ' . $this->administration->twinfield_office_code
            . ', client Id: ' . $this->administration->twinfield_client_id
            . '.';

        TwinfieldLog::create([
            'invoice_id' => null,
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'invoice',
            'user_id' => Auth::user()->id,
            'is_error' => false,
        ]);
    }
    private function logBatchSync($message)
    {
        TwinfieldLog::create([
            'invoice_id' => null,
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'invoice',
            'user_id' => Auth::user()->id,
            'is_error' => false,
        ]);
    }
    private function logEndSync($message)
    {
        TwinfieldLog::create([
            'invoice_id' => null,
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'invoice',
            'user_id' => Auth::user()->id,
            'is_error' => false,
        ]);
    }
    private function logGeneral($invoiceToProcess, $message, $isError, $laravelInfo)
    {
        if ($laravelInfo){
            Log::info($message);
        }
        TwinfieldLog::create([
            'invoice_id' => $invoiceToProcess->id,
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'invoice',
            'user_id' => Auth::user()->id,
            'is_error' => $isError,
        ]);
    }
    protected function translateToValidCharacterSet($field){

        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
        $field = strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

}