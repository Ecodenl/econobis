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
use Illuminate\Support\Facades\Log;
use Money\Currency;
use Money\Money;
use PhpTwinfield\ApiConnectors\TransactionApiConnector;
use PhpTwinfield\Enums\DebitCredit;
use PhpTwinfield\Enums\Destiny;
use PhpTwinfield\Enums\LineType;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Office;
use PhpTwinfield\SalesTransactionLine;
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldSalesTransactionHelper
{
    private $connection;
    private $office;
    private $administration;
    private $transactionApiConnector;
    const VRK_CODE = "VRK";
    const VRK_DEBITEUREN_CODE = "1300";
    private $currency;

    /**
     * TwinfieldCustomerHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration)
    {
        $this->connection = new WebservicesAuthentication($administration->twinfield_username, $administration->twinfield_password, $administration->twinfield_organization_code);
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->administration = $administration;
        $this->transactionApiConnector = new TransactionApiConnector($this->connection);
        $this->currency = new Currency("EUR");
    }

    public function createAllSalesTransactions(){
        set_time_limit(0);

        $messages = [];

        foreach ($this->administration->invoices()->where('status_id', 'sent')->get() as $invoice){
            $response = $this->createSalesTransation($invoice);

            if($response === true){
                array_push($messages, 'Transactie factuur ' . $invoice->number . ' succesvol gesynchroniseerd.');
            }
            else{
                //soms zitten in de error message van Twinfield // voor de melding.
                $response = str_replace('//', '', $response);
                array_push($messages, 'Syncronisatie transactie factuur ' . $invoice->number . ' gaf de volgende foutmelding: ' . $response);
            }
        }

        if(count($messages) == 0){
            array_push($messages, 'Geen facturen om te synchroniseren gevonden.');
        }

        return implode(';', $messages);
    }

    public function createSalesTransation(Invoice $invoice){
        $twinfieldCustomerHelper = new TwinfieldCustomerHelper($this->administration);
        $twinfieldCustomer = $twinfieldCustomerHelper->createCustomer($invoice->order->contact);

        //Invoice datum
        $dateInvoice = new \DateTime($invoice->date_sent);
        //Due datum bepalen
        if ($invoice->payment_type_id === 'transfer') {
            if ( $invoice->days_to_expire && $invoice->days_to_expire > 0 ){
                $daysToAdd = new \DateInterval('P' . $invoice->days_to_expire . 'D');
                $dueDateInvoice = $dateInvoice->add( $daysToAdd);
            }else {
                $datePaymentDue = $invoice->getDatePaymentDueAttribute();
                if ($dueDateInvoice = 0) {
                    $dueDateInvoice = $dateInvoice;
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
            ->setDestiny(Destiny::FINAL())
            ->setRaiseWarning(false )
            ->setCode(self::VRK_CODE)
            ->setCurrency($this->currency)
            ->setDate($dateInvoice)
            ->setInvoiceNumber($invoice->number)
            ->setPaymentReference("")
            ->setOffice($this->office)
            ->setDueDate($dueDateInvoice);

        //Salestransaction - Total line maken
        $idTeller = 1;
        $totaalBedragIncl = new Money($invoice->getTotalPriceInclVatAndReductionAttribute()*100, $this->currency );
        $twinfieldTransactionLineTotal = new SalesTransactionLine();
        $twinfieldTransactionLineTotal
            ->setId($idTeller)
            ->setLineType(LineType::TOTAL())
            ->setDim1(self::VRK_DEBITEUREN_CODE)
            ->setDim2($twinfieldCustomer->getCode())
            ->setValue($totaalBedragIncl)
            ->setDebitCredit($totaalBedragIncl->lessThan(new Money(0, $this->currency )) ? DebitCredit::CREDIT() : DebitCredit::DEBIT() )
            ->setDescription($twinfieldCustomer ? $twinfieldCustomer->getName() : '' ." / ". $invoice->number );
        $twinfieldSalesTransaction->addLine($twinfieldTransactionLineTotal);

        //Vanuit details bedragen per btw code bepalen (bedragen omzet en bedragen BTW)
        $invoiceDetailsAmountExcl = array();
        $invoiceDetailsAmountVat = array();
        foreach($invoice->invoiceProducts as $invoiceProduct){
            $vatCode   = "";
            $exclAmount = $invoiceProduct->getPriceExVatInclReductionAttribute();
            $vatAmount = $invoiceProduct->getAmountVatAttribute();
            switch ($invoiceProduct->vat_percentage) {
                case null:
                    $vatCode   = $this->administration->btw_code_sales_null;
                    break;
                case '0':
                    $vatCode   = $this->administration->btw_code_sales_0;
                    break;
                case '6':
                case '9':
                    $vatCode   = $this->administration->btw_code_sales_6;
                    $vatAmountOld = key_exists($vatCode, $invoiceDetailsAmountVat) ? $invoiceDetailsAmountVat[$vatCode] : 0;
                    $invoiceDetailsAmountVat[$vatCode] = $vatAmountOld + $vatAmount;
                    break;
                case '21':
                    $vatCode   = $this->administration->btw_code_sales_21;
                    $vatAmountOld = key_exists($vatCode, $invoiceDetailsAmountVat) ? $invoiceDetailsAmountVat[$vatCode] : 0;
                    $invoiceDetailsAmountVat[$vatCode] = $vatAmountOld + $vatAmount;
                    break;
            }
            $exclAmountOld = key_exists($vatCode, $invoiceDetailsAmountExcl) ? $invoiceDetailsAmountExcl[$vatCode] : 0;
            $invoiceDetailsAmountExcl[$vatCode] = $exclAmountOld + $exclAmount;
        }

        //Salestransaction - Detail lines maken (omzet per btw code)
        foreach($invoiceDetailsAmountExcl as $code => $invoiceDetail) {
            $omzetStandaardGrootBoek = "";
            switch ($code) {
                case $this->administration->btw_code_sales_null:
                case $this->administration->btw_code_sales_0:
                    $omzetStandaardGrootBoek = "8000";
                    break;
                case $this->administration->btw_code_sales_6:
                    $omzetStandaardGrootBoek = "8010";
                    break;
                case $this->administration->btw_code_sales_21:
                    $omzetStandaardGrootBoek = "8020";
                    break;
            }

            $invoiceDetailExcl = new Money($invoiceDetail*100, $this->currency );
            $twinfieldTransactionLineVat = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineVat
                ->setId($idTeller)
                ->setLineType(LineType::DETAIL())
                ->setDim1($omzetStandaardGrootBoek)
                ->setVatCode($code)
                ->setValue($invoiceDetailExcl)
                ->setDebitCredit($invoiceDetailExcl->lessThan(new Money(0, $this->currency )) ? DebitCredit::DEBIT() : DebitCredit::CREDIT() );
            $twinfieldSalesTransaction->addLine($twinfieldTransactionLineVat);
        }

        //Salestransaction - Vat lines maken (btw bedrag per btw code)
        foreach($invoiceDetailsAmountVat as $code => $invoiceDetail) {
            $omzetStandaardGrootBoek = "";
            switch ($code) {
                case $this->administration->btw_code_sales_null:
                case $this->administration->btw_code_sales_0:
                case $this->administration->btw_code_sales_6:
                    $omzetStandaardGrootBoek = "1520";
                    break;
                case $this->administration->btw_code_sales_21:
                    $omzetStandaardGrootBoek = "1530";
                    break;
            }

            $invoiceDetailExcl = new Money($invoiceDetail*100, $this->currency );
            $twinfieldTransactionLineVat = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineVat
                ->setId($idTeller)
                ->setLineType(LineType::VAT())
                ->setDim1($omzetStandaardGrootBoek)
                ->setVatCode($code)
                ->setValue($invoiceDetailExcl)
                ->setDebitCredit($invoiceDetailExcl->lessThan(new Money(0, $this->currency )) ? DebitCredit::DEBIT() : DebitCredit::CREDIT() );
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

}