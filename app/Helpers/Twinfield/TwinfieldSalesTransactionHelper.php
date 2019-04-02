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
    private $currency;

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
    }

    public function createAllSalesTransactions(){
        set_time_limit(0);
        $messages = [];

        // todo ingangsdatum voor welke facturen naar twinfield moeten, hier wellicht per een administratieveld nog van maken?
        foreach ($this->administration->invoices()->where('status_id', 'sent')->where('date_sent', '>', '20190301')->get() as $invoice){
            $response = $this->createSalesTransation($invoice);

            if($response === true){
                array_push($messages, 'Transactie factuur ' . $invoice->number . ' succesvol gesynchroniseerd.');
            }
            else{
                //soms zitten in de error message van Twinfield // voor de melding.
                $response = str_replace('//', '', $response);
                array_push($messages, 'Synchronisatie transactie factuur ' . $invoice->number . ' gaf de volgende foutmelding: ' . $response);
            }
        }

        if(count($messages) == 0){
            array_push($messages, 'Geen facturen om te synchroniseren gevonden.');
        }

        return implode(';', $messages);
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
            ->setDestiny(Destiny::FINAL())
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
        $totaalBedragExcl = $invoice->getTotalPriceExVatInclReductionAttribute();
        $totaalBedragBtw  = $invoice->getTotalVatAttribute();
        $totaalBedragIncl = new Money(($totaalBedragExcl + $totaalBedragBtw )*100, $this->currency );
        $twinfieldTransactionLineTotal = new SalesTransactionLine();
        $twinfieldTransactionLineTotal
            ->setId($idTeller)
            ->setLineType(LineType::TOTAL())
            ->setDim1($this->grootboekDebiteuren)
            ->setDim2($twinfieldCustomer->getCode())
            ->setValue($totaalBedragIncl)
            ->setDebitCredit(DebitCredit::DEBIT() )
            ->setDescription($twinfieldCustomer ? $twinfieldCustomer->getName() : '' ." / ". $invoice->number );
        $twinfieldSalesTransaction->addLine($twinfieldTransactionLineTotal);

        //Vanuit invoice products bedragen per product (omzet) / bedragen per btw code alvast doortellen voor VAT regels hierna
        //Salestransaction - Detail lines maken (omzet regels)
        $vatData = new Collection();
        foreach($invoice->invoiceProducts as $invoiceProduct){
            $vatCodeTwinfield   = $invoiceProduct->product->ledger->vatCode->twinfield_code;
            $vatLedgerCodeTwinfield   = $invoiceProduct->product->ledger->vatCode->twinfield_ledger_code;
            $ledgerCode = $invoiceProduct->twinfield_ledger_code ? $invoiceProduct->twinfield_ledger_code :  "";

            $vatAmount = $invoiceProduct->getAmountVatAttribute();

            $vatAmountOld  = key_exists( $vatCodeTwinfield, $vatData) ? $vatData[$vatCodeTwinfield]->get('vatAmount') : 0;
            $vatData[$vatCodeTwinfield] = ['vatLedgerCode' => $vatLedgerCodeTwinfield, 'vatAmount' => $vatAmountOld + $vatAmount];

            $exclAmount = $invoiceProduct->getPriceExVatInclReductionAttribute();
            $invoiceDetailExcl = new Money($exclAmount*100, $this->currency );
            $twinfieldTransactionLineVat = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineVat
                ->setId($idTeller)
                ->setLineType(LineType::DETAIL())
                ->setDim1($ledgerCode)
                ->setVatCode($vatCodeTwinfield)
                ->setValue($invoiceDetailExcl)
                ->setDebitCredit(DebitCredit::CREDIT() );
            $twinfieldSalesTransaction->addLine($twinfieldTransactionLineVat);
        }


        //Salestransaction - Vat lines maken (btw bedrag per btw code)
        foreach($vatData as $code => $vatDataDetail) {
            $invoiceDetailExcl = new Money(($vatDataDetail['vatAmount'])*100, $this->currency );
            $twinfieldTransactionLineVat = new SalesTransactionLine();
            $idTeller++;
            $twinfieldTransactionLineVat
                ->setId($idTeller)
                ->setLineType(LineType::VAT())
                ->setDim1($vatDataDetail['vatLedgerCode'])
                ->setVatCode($code)
                ->setValue($invoiceDetailExcl)
                ->setDebitCredit(DebitCredit::CREDIT() );
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