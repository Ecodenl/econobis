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
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
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
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldSalesTransactionHelper
{
    private $connection;
    private $office;
    private $administration;
    private $transactionApiConnector;
    private $currency;
    private $messages;

    /**
     * TwinfieldSalesTransactionHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->connection = new WebservicesAuthentication($administration->twinfield_username,
            $administration->twinfield_password, $administration->twinfield_organization_code);
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->administration = $administration;
        $this->transactionApiConnector = new TransactionApiConnector($this->connection);
        $this->dagboekCode = config('services.twinfield.verkoop_dagboek_code');
        $this->currency = new Currency( config('services.twinfield.verkoop_default_currency') );
        $this->grootboekDebiteuren = config('services.twinfield.verkoop_grootboek_debiteuren');
        $this->messages = [];

    }

    public function createAllSalesTransactions(){
        set_time_limit(0);

        foreach ($this->administration->invoices()->where('status_id', 'sent')->where('date_sent', '>=', '20190101')
            ->whereDoesntHave('invoiceProducts', function ($query) {
                $query->whereNull('twinfield_ledger_code');
            })
            ->get() as $invoice){
            $response = $this->createSalesTransation($invoice);

            if($response === true){
                array_push($this->messages, 'Transactie nota ' . $invoice->number . ' succesvol gesynchroniseerd.');
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
                array_push($this->messages, 'Synchronisatie transactie nota ' . $invoice->number . ' gaf de volgende foutmelding: ' . $response);
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
            $twinfieldCustomer = $twinfieldCustomerHelper->getTwinfieldCustomerByCode($twinfieldNumber->twinfield_number);
        }
        if(!$twinfieldCustomer)
        {
            $twinfieldCustomer = $twinfieldCustomerHelper->createCustomer($invoice->order->contact);
            $twinfieldCustomerHelper->updateCustomer($invoice->order->contact);
        }

        //Invoice datum
        $dateInvoice = new \DateTime($invoice->date_sent);
        //Due datum bepalen
        if ($invoice->payment_type_id === 'transfer') {
            if ( $invoice->days_to_expire && $invoice->days_to_expire > 0 ){
                $daysToAdd = new \DateInterval('P' . $invoice->days_to_expire . 'D');
                $dueDateInvoice = new \DateTime($invoice->date_sent); ;
                $dueDateInvoice->add( $daysToAdd);
            }else {
                $datePaymentDue = $invoice->getDatePaymentDueAttribute();
                if ($dueDateInvoice = 0) {
                    $dueDateInvoice = new \DateTime($invoice->date_sent); ;
                } else {
                    $dueDateInvoice = new \DateTime($datePaymentDue);
                }
            }
        }else{
            if ($invoice->payment_type_id === 'collection' && $invoice->date_collection) {
                $dueDateInvoice = new \DateTime($invoice->date_collection);
            }
        }

        //Salestransaction - Header XML maken
        $twinfieldSalesTransaction = new \PhpTwinfield\SalesTransaction();
        $twinfieldSalesTransaction
            ->setDestiny(Destiny::TEMPORARY())
            ->setRaiseWarning(false )
            ->setCode($this->dagboekCode)
            ->setCurrency($this->currency)
            ->setDate($dateInvoice)
            ->setInvoiceNumber($invoice->number)
            ->setPaymentReference("")
            ->setOffice($this->office)
            ->setDueDate($dueDateInvoice);

        //Salestransaction - Total line maken
        $idTeller = 1;
        $totaalBedragExcl = round($invoice->getTotalPriceExVatInclReductionAttribute() * 100, 0);
        $totaalBedragBtw  = round($invoice->getTotalVatAttribute() * 100, 0);
        $totaalBedragIncl = new Money(($totaalBedragExcl + $totaalBedragBtw ), $this->currency );
        $twinfieldTransactionLineTotal = new SalesTransactionLine();
        $twinfieldTransactionLineTotal
            ->setId($idTeller)
            ->setLineType(LineType::TOTAL())
            ->setDim1($this->grootboekDebiteuren)
            ->setDim2($twinfieldCustomer->getCode())
            ->setValue($totaalBedragIncl)
            ->setDebitCredit($totaalBedragIncl->getAmount()<0 ? DebitCredit::CREDIT() : DebitCredit::DEBIT())
            ->setDescription($twinfieldCustomer ? $twinfieldCustomer->getName() : '' ." / ". $invoice->number );
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
                $vatAmount = $invoiceProduct->getAmountVatAttribute();
                $invoiceVatAmount = new Money(round($vatAmount*100, 0), $this->currency );
                $vatAmountOld  = isset( $vatData[$vatCodeTwinfield]) ? $vatData[$vatCodeTwinfield]['vatAmount'] : 0;
                $vatData[$vatCodeTwinfield] = ['vatLedgerCode' => $vatLedgerCodeTwinfield, 'vatAmount' => $vatAmountOld + $vatAmount];
            }else{
                $invoiceVatAmount = new Money(0, $this->currency );
            }

            $exclAmount = round($invoiceProduct->getPriceExVatInclReductionAttribute()*100, 0);
            $invoiceDetailExcl = new Money($exclAmount, $this->currency );
            $twinfieldTransactionLineDetail = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineDetail
                ->setId($idTeller)
                ->setLineType(LineType::DETAIL())
                ->setDim1($ledgerCode)
                ->setDim2($costCenterCode)
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
                $invoice->status_id = 'exported';
            }
            $invoice->twinfield_number = $response->getNumber();
            $invoice->save();
            return true;

        } catch (PhpTwinfieldException $e) {
            Log::error($e->getMessage());
            return $e->getMessage() ? $e->getMessage() : 'Er is een fout opgetreden.';
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
        array_push($this->messages, 'Transactie nota ' . $invoice->number . ' geblokkeerd voor betaalrun.');
        return true;

        return implode(';', $messages);
        } catch (PhpTwinfieldException $e) {
            Log::error($e->getMessage());
            array_push($this->messages, 'Blokkeren voor betaalrun (nota ' . $invoice->number . ') gaf de volgende foutmelding: ' . $e->getMessage());
        }

    }


}