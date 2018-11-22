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
use App\Eco\Invoice\InvoicePayment;
use App\Eco\Invoice\InvoiceProduct;
use Illuminate\Support\Facades\Log;
use PhpTwinfield\ApiConnectors\InvoiceApiConnector;
use PhpTwinfield\ApiConnectors\BrowseDataApiConnector;
use PhpTwinfield\BrowseColumn;
use PhpTwinfield\BrowseSortField;
use PhpTwinfield\Enums\BrowseColumnOperator;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\InvoiceLine;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldInvoiceHelper
{
    private $connection;
    private $office;
    private $administration;
    private $invoiceApiConnector;

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
        $this->invoiceApiConnector = new InvoiceApiConnector($this->connection);
    }

    public function createAllInvoices(){
        set_time_limit(0);

        $messages = [];

        foreach ($this->administration->invoices()->where('status_id', 'sent')->get() as $invoice){
            $response = $this->createInvoice($invoice);

            if($response === true){
                array_push($messages, 'Factuur ' . $invoice->number . ' succesvol gesynchroniseerd.');
            }
            else{
                //soms zitten in de error message van Twinfield // voor de melding.
                $response = str_replace('//', '', $response);
                array_push($messages, 'Factuur ' . $invoice->number . ' gaf de volgende foutmelding: ' . $response);
            }
        }

        if(count($messages) == 0){
            array_push($messages, 'Geen facturen om te synchroniseren gevonden.');
        }

        return implode(';', $messages);
    }

    public function createInvoice(Invoice $invoice){
        $twinfieldCustomerHelper = new TwinfieldCustomerHelper($this->administration);
        $twinfieldCustomer = $twinfieldCustomerHelper->createCustomer($invoice->order->contact);

        $twinfieldInvoice = new \PhpTwinfield\Invoice();

        $twinfieldInvoice
            ->setInvoiceType($this->administration->default_invoice_template)
            ->setCustomer($twinfieldCustomer)
            ->setStatus('final')
            ->setPaymentMethod('bank');

        foreach($invoice->invoiceProducts as $invoiceProduct){
            $this->addInvoiceLine($twinfieldInvoice, $invoiceProduct);
        }


        try {
            $response = $this->invoiceApiConnector->send($twinfieldInvoice);

            if($invoice->status_id === 'sent'){
                $invoice->status_id = 'exported';

            }
            $invoice->twinfield_number = $response->getInvoiceNumber();

            $invoice->save();

            return true;

        } catch (PhpTwinfieldException $e) {
            Log::error($e->getMessage());
            return $e->getMessage() ? $e->getMessage() : 'Er is een fout opgetreden.';
        }


    }

    public function addInvoiceLine(\PhpTwinfield\Invoice $invoice, InvoiceProduct $invoiceProduct){
        $twinfieldInvoiceLine = new InvoiceLine();

        $vatCode = '';

        switch ($invoiceProduct->vat_percentage) {
            case null:
                $vatCode = $this->administration->btw_code_sales_null;
                break;
            case '0':
                $vatCode = $this->administration->btw_code_sales_0;
                break;
            case '6':
                $vatCode = $this->administration->btw_code_sales_6;
                break;
            case '21':
                $vatCode = $this->administration->btw_code_sales_21;
                break;
        }

        $twinfieldInvoiceLine
            ->setQuantity($invoiceProduct->amount)
            ->setUnitsPriceExcl($invoiceProduct->price_ex_vat_incl_reduction)
            ->setVatCode($vatCode)
            ->setDim1($invoiceProduct->twinfield_ledger_code)
            ->setArticle(0)
            ->setDescription($invoiceProduct->product_name);

        $invoice->addLine($twinfieldInvoiceLine);
    }

    public function processPaidInvoices(){
        set_time_limit(0);
        $browseDataApiConnector = new BrowseDataApiConnector($this->connection);

        $messages = [];

        foreach ($this->administration->invoices()->where('status_id', 'exported')->whereNotNull('twinfield_number')->get() as $invoiceToBeChecked)
        {
            if(!$invoiceToBeChecked->twinfield_number){
                Log::error('Factuur ' . $invoiceToBeChecked->id . ' met nummer ' . $invoiceToBeChecked->number . ' heeft status geexporteerd maar heeft geen Twinfield nummer.');
            }
            else {
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.code')
                    ->setLabel('Transactie type')
                    ->setVisible(true);

                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.date')
                    ->setLabel('Invoerdatum')
                    ->setVisible(true);

                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.basevaluesigned')
                    ->setLabel('Euro')
                    ->setVisible(true);

                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.invnumber')
                    ->setLabel('Factuurnr.')
                    ->setOperator(BrowseColumnOperator::EQUAL())
                    ->setFrom($invoiceToBeChecked->twinfield_number)
                    ->setVisible(true);

                $sortFields[] = new BrowseSortField('fin.trs.head.code');

                $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('020', $columns, $sortFields);

                foreach($twinfieldInvoiceTransactions->getRows() as $row){

                    $type = ($row->getCells()[0]->getValue());

                    //VRK is de verkoop factuur
                    if($type !== 'VRK' ){
                        $dateInput = $row->getCells()[1]->getValue(); //datetime

                        $dateInput = date_format($dateInput, 'Y-m-d');

                        $amount = $row->getCells()[2]->getValue();

                        //-100 op debiteur is dus 100 betaald
                        $amount = $amount * -1;

                        if(!InvoicePayment::where('invoice_id', $invoiceToBeChecked->id)->where('amount', $amount)->where('date_paid', $dateInput)->exists()){
                            $invoicePayment = new InvoicePayment();
                            $invoicePayment->invoice_id = $invoiceToBeChecked->id;
                            $invoicePayment->amount = $amount;
                            $invoicePayment->type_id = $type;
                            $invoicePayment->date_paid = $dateInput;

                            $invoicePayment->save();

                            Log::info('Betaling van ' . $amount . ' toegevoegd via twinfield voor factuur ' . $invoiceToBeChecked->number);
                            array_push($messages, 'Betaling van €' . $amount . ' toegevoegd via Twinfield voor factuur ' . $invoiceToBeChecked->number . '.');
                        }
                    }
                };
            }
        }

        if(count($messages) == 0){
            array_push($messages, 'Geen betalingen gevonden.');
        }

        return implode(';', $messages);
    }
}