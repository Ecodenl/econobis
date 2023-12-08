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
    private $currency;
    public $messages;

    /**
     * TwinfieldSalesTransactionHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->administration = $administration;

        if($this->administration->date_sync_twinfield_invoices){
            $this->fromInvoiceDateSent = $this->administration->date_sync_twinfield_invoices;
        }else{
            $this->fromInvoiceDateSent = '2019-01-01';
        }

        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->redirectUri = \Config::get('app.url_api') . '/twinfield';

        if ($administration->twinfield_connection_type === "openid") {

            $provider = new OAuthProvider([
                'clientId'                => $administration ? $administration->twinfield_client_id : '',    // The client ID assigned to you by the provider
                'clientSecret'            => $administration ? $administration->twinfield_client_secret : '',   // The client password assigned to you by the provider
                'redirectUri'             => $this->redirectUri,
            ]);
            if(!empty($administration->twinfield_refresh_token)){
                $this->connection = new OpenIdConnectAuthentication($provider, $administration->twinfield_refresh_token, $this->office);
            }else{
                $this->connection = null;
            }

        }

        $this->transactionApiConnector = new TransactionApiConnector($this->connection);
        $this->dagboekCode = config('services.twinfield.verkoop_dagboek_code');
        $this->currency = new Currency( config('services.twinfield.verkoop_default_currency') );
        $this->grootboekDebiteuren = config('services.twinfield.verkoop_grootboek_debiteuren');
        $this->messages = [];

    }

    public function procesTwinfieldSalesTransaction(){
        if(!$this->administration->uses_twinfield){
            return "Deze administratie maakt geen gebruik van Twinfield.";
        }
        if(!$this->administration->twinfield_is_valid){
            return "Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken.";
        }
        set_time_limit(0);

        // We controleren alle invoices met status exported of paid en met koppeling Twinfield
        // Standaard invoices vanaf 01-01-2019 tenzij anders opgegeven bij administratie.
        if($this->administration->date_sync_twinfield_invoices){
            $invoicesToBeChecked = $this->administration->invoices()
                ->where('status_id', 'sent')
                ->where('date_sent', '>=', $this->fromInvoiceDateSent)
                ->whereDoesntHave('invoiceProducts', function ($query) {
                    $query->whereNull('twinfield_ledger_code');
                })
                ->get();
        }else{
            $invoicesToBeChecked = $this->administration->invoices()
                ->where('status_id', 'sent')
                ->where('date_sent', '>=', '20190101')
                ->whereDoesntHave('invoiceProducts', function ($query) {
                    $query->whereNull('twinfield_ledger_code');
                })
                ->get();
        }

        foreach ($invoicesToBeChecked as $invoice){
            $response = $this->createSalesTransation($invoice);

            if($response === true){
                $message = 'Transactie nota ' . $invoice->number . ' succesvol gesynchroniseerd.';
                TwinfieldLog::create([
                    'invoice_id' => $invoice->id,
                    'contact_id' => null,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'invoice',
                    'user_id' => Auth::user()->id,
                    'is_error' => false,
                ]);
                array_push($this->messages, $message);
                // Indien contact ingesteld op Incasso, maar nota is gekenmerkt voor Overboeking, dan blokkeer voor betaal/incasso run in Twinfield
                $contact = $invoice->order->contact;
                if($contact->is_collect_mandate && $invoice->payment_type_id=='transfer')
                {
                    $this->setPayStatusNo($invoice);
                }
            }
            else{
                //soms zitten in de error message van Twinfield // voor de melding.
                $response = str_replace('//', '', $response);
                $message = 'Synchronisatie transactie nota ' . $invoice->number . ' gaf de volgende foutmelding: ' . $response;
                TwinfieldLog::create([
                    'invoice_id' => $invoice->id,
                    'contact_id' => null,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'invoice',
                    'user_id' => Auth::user()->id,
                    'is_error' => true,
                ]);
                array_push($this->messages, $message);
            }
        }

        if(count($this->messages) == 0){
            array_push($this->messages, "Geen nota's om te synchroniseren gevonden.");
        }

        return implode(';', $this->messages);
    }

    public function createSalesTransation(Invoice $invoice){
        // connection van hier kunnen we ook gebruiken in TwinfieldcustomerHelper
        $twinfieldCustomerHelper = new TwinfieldCustomerHelper($this->administration, $this->connection);
        $twinfieldNumbers = $invoice->order->contact->twinfieldNumbers;
        $twinfieldNumber  = $twinfieldNumbers->where('administration_id', '=', $this->administration->id)->first();
        $twinfieldCustomer = null;
        if($twinfieldNumber && $twinfieldNumber->twinfield_number)
        {
            $twinfieldCustomer = $twinfieldCustomerHelper->getTwinfieldCustomerByCode($twinfieldNumber->twinfield_number, $invoice->order->contact);
        }
        if(!$twinfieldCustomer)
        {
            $twinfieldCustomer = $twinfieldCustomerHelper->createCustomer($invoice->order->contact);
            $twinfieldCustomerHelper->updateCustomer($invoice->order->contact);
        }

        //Invoice totaal bedrag incl. BTW
        //Destiny FINAL indien 0 invoice, anders TEMPORARY
        $totaalBedragIncl = new Money((round($invoice->getTotalInclVatInclReductionAttribute() * 100, 0) ), $this->currency );
        $isNullInvoice = $invoice->getTotalInclVatInclReductionAttribute() == 0;
        $invoiceDestiny = $isNullInvoice ? Destiny::FINAL() : Destiny::TEMPORARY();

        //Invoice datum
        $dateInvoice = Carbon::parse($invoice->date_sent);

        //Due datum bepalen
        if ($invoice->payment_type_id === 'transfer') {
            if ( $invoice->days_to_expire && $invoice->days_to_expire > 0 ){
                $daysToAdd2 = new \DateInterval('P' . $invoice->days_to_expire . 'D');
                $dueDateInvoice2 = new \DateTime($invoice->date_sent); ;
                $dueDateInvoice2->add( $daysToAdd2);

                $dueDateInvoice = Carbon::parse($invoice->date_sent)->addDay($invoice->days_to_expire);
            }else {
                $datePaymentDue = $invoice->getDatePaymentDueAttribute();
                if ($dueDateInvoice = 0) {
                    $dueDateInvoice = Carbon::parse($invoice->date_sent);
                } else {
                    $dueDateInvoice = Carbon::parse($datePaymentDue);
                }
            }
        }else{
            if ($invoice->payment_type_id === 'collection' && $invoice->date_collection) {
                $dueDateInvoice = Carbon::parse($invoice->date_collection);
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
            ->setInvoiceNumber($invoice->number)
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
            ->setDescription(substr($this->translateToValidCharacterSet($invoice->subject), 0, 40));
        $twinfieldSalesTransaction->addLine($twinfieldTransactionLineTotal);

        //Vanuit invoice products bedragen per product (omzet) / bedragen per btw code alvast doortellen voor VAT regels hierna
        //Salestransaction - Detail lines maken (omzet regels)
        $vatData = new Collection();
        foreach($invoice->invoiceProducts as $invoiceProduct){
            $vatCode   = $invoiceProduct->product->ledger->vatCode;
            $vatCodeTwinfield   = "";
            if($vatCode && $vatCode->id>0)
            {
                $vatCodeTwinfield   = $vatCode->twinfield_code;
                $vatLedgerCodeTwinfield   = $vatCode->twinfield_ledger_code;
            }
            $ledgerCode = $invoiceProduct->twinfield_ledger_code ? $invoiceProduct->twinfield_ledger_code :  "";

            $order = $invoice->order;
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
//            $descriptionDetail = $twinfieldCustomer ? ($twinfieldCustomer->getCode() . " " . $twinfieldCustomer->getName()) : ($invoice->contact->number . " " . $invoice->contact->full_name);
            $descriptionDetail = $invoice->order->contact->number . " " . $this->translateToValidCharacterSet($invoice->order->contact->full_name);

            $twinfieldTransactionLineDetail = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineDetail
                ->setId($idTeller)
                ->setLineType(LineType::DETAIL())
                ->setDim1($ledgerCode)
                ->setDim2($costCenterCode)
                ->setDim3($invoice->order->project_number)
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
            if($invoice->status_id === 'sent'){
                // 0 invoice meteen op betaald zetten
                if($isNullInvoice){
                    $invoice->status_id = 'paid';
                }else{
                    $invoice->status_id = 'exported';
                }
            }
            $invoice->twinfield_number = $response->getNumber();
            $invoice->save();
            return true;
        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = $exceptionTwinfield->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => $invoice->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'invoice',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            return $message;
        } catch (\Exception $e) {
            $message = $e->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => $invoice->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'invoice',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            return $message;
        }

    }

    public function setPayStatusNo(Invoice $invoice){
        $twinfieldSalesTransaction = new ChangPayStatusTransaction();
        $twinfieldSalesTransaction
        ->setCode($this->dagboekCode)
        ->setOffice($this->office)
        ->setNumber($invoice->twinfield_number)
        ->setPayStatus('N');

            //Salestransaction - versturen naar Twinfield
        try {
            $testConnector = new ChangPayStatusTransactionApiConnector($this->connection);
            $response = $testConnector->send($twinfieldSalesTransaction);
            $message = 'Transactie nota ' . $invoice->number . ' geblokkeerd voor betaalrun.';
            TwinfieldLog::create([
                'invoice_id' => $invoice->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'invoice',
                'user_id' => Auth::user()->id,
                'is_error' => false,
            ]);
            array_push($this->messages, $message);
            return true;

        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Blokkeren voor betaalrun (nota ' . $invoice->number . ') gaf de volgende twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => $invoice->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'invoice',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            array_push($this->messages, $message);
        } catch (\Exception $e) {
            $message = 'Blokkeren voor betaalrun (nota ' . $invoice->number . ') gaf de volgende foutmelding: ' . $e->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => $invoice->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'invoice',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            array_push($this->messages, $message);
        }

        return false;

    }

    protected function translateToValidCharacterSet($field){

//        $field = strtr(utf8_decode($field), utf8_decode('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ'), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
        $field = strtr(mb_convert_encoding($field, 'UTF-8', mb_list_encodings()), mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'UTF-8', mb_list_encodings()), 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy');
//        $field = iconv('UTF-8', 'ASCII//TRANSLIT', $field);
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }

}