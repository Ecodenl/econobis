<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Twinfield;

use App\Eco\Administration\Administration;
use App\Eco\Invoice\InvoicePayment;
use Illuminate\Support\Facades\Log;
use PhpTwinfield\ApiConnectors\InvoiceApiConnector;
use PhpTwinfield\ApiConnectors\BrowseDataApiConnector;
use PhpTwinfield\BrowseColumn;
use PhpTwinfield\Enums\BrowseColumnOperator;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Office;
use PhpTwinfield\Request\BrowseData;
use PhpTwinfield\Secure\WebservicesAuthentication;

class TwinfieldInvoiceHelper
{
    private $connection;
    private $office;
    private $administration;
    private $invoiceApiConnector;

    /**
     * TwinfieldInvoiceHelper constructor.
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

    public function processPaidInvoices(){
        set_time_limit(0);
        $browseDataApiConnector = new BrowseDataApiConnector($this->connection);
        //Deze function kan je gebruiken om te kijken wel browseDefinition fields er zijn voor een bepaald code
        //$this->readBrowseDefinition($browseDataApiConnector);

        $messages = [];

        foreach ($this->administration->invoices()->where('status_id', 'exported')->whereNotNull('twinfield_number')->get() as $invoiceToBeChecked)
        {
            if(!$invoiceToBeChecked->twinfield_number){
                Log::error('Factuur ' . $invoiceToBeChecked->id . ' met nummer ' . $invoiceToBeChecked->number . ' heeft status geexporteerd maar heeft geen Twinfield nummer.');
            }
            else {
//  - 0
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.yearperiod')
                    ->setLabel('Periode')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN())
                    ->setFrom( '2018/00' )
                    ->setTo( '2019/55' );
//0 - 1
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.code')
                    ->setLabel('Dagboek')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::EQUAL());
//                    ->setFrom("VRK");
//                <finderparam>hidden=1</finderparam>
//  - 2
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.shortname')
                    ->setLabel('Naam')
                    ->setVisible(true)
                    ->setAsk(false);
//3 - 3
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.number')
                    ->setLabel('Boekst.nr.')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN());
//  - 4
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.status')
                    ->setLabel('Status')
                    ->setVisible(true)
                    ->setAsk(true);
//  - 5
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.date')
                    ->setLabel('Boekdatum')
                    ->setVisible(true)
                    ->setAsk(false);
//  - 6
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.dim2')
                    ->setLabel('Debiteur')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN());
//                <finderparam>dimtype=DEB</finderparam>
//  - 7
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.dim2name')
                    ->setLabel('Naam')
                    ->setVisible(true)
                    ->setAsk(false);
//  - 8
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.head.curcode')
                    ->setLabel('Valuta')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::EQUAL());
//  - 9
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.valuesigned')
                    ->setLabel('Bedrag')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN());
//5 - 10
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.basevaluesigned')
                    ->setLabel('EuroK')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN());
//  - 11
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.repvaluesigned')
                    ->setLabel('XXX')
                    ->setVisible(false)
                    ->setAsk(false)
                    ->setOperator(BrowseColumnOperator::BETWEEN());
//6 - 12
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.openbasevaluesigned')
                    ->setLabel('Openstaand bedrag')
                    ->setVisible(true)
                    ->setAsk(false);
//2 - 13
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.invnumber')
                    ->setLabel('Factuurnr.')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::EQUAL());
//                    ->setFrom( $invoiceToBeChecked->number );
//  - 14
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.datedue')
                    ->setLabel('Vervaldatum')
                    ->setVisible(true)
                    ->setAsk(false);
//1 - 15
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.matchstatus')
                    ->setLabel('Betaalstatus')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::EQUAL());
//7 - 16
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.matchnumber')
                    ->setLabel('Betaalnr.')
                    ->setVisible(true)
                    ->setAsk(false);
//4 - 17
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.matchdate')
                    ->setLabel('Betaaldatum')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN())
                    ->setFrom('19800101')
                    ->setTo('20391201');
//  - 18
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.openvaluesigned')
                    ->setLabel('Openstaand bedrag transactievaluta')
                    ->setVisible(false)
                    ->setAsk(false);
//  - 19
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.availableforpayruns')
                    ->setLabel('Beschikbaar voor betaalrun')
                    ->setVisible(false)
                    ->setAsk(false);
//  - 20
                $columns[] = (new BrowseColumn())
                    ->setField('fin.trs.line.modified')
                    ->setLabel('Wijzigingsdatum')
                    ->setVisible(true)
                    ->setAsk(true)
                    ->setOperator(BrowseColumnOperator::BETWEEN());

//                dd($this->office);

                $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('100', $columns );
dd($twinfieldInvoiceTransactions);

                foreach($twinfieldInvoiceTransactions->getRows() as $row){
//0 - 1  V
//3 - 3
//5 - 10 V
//6 - 12 V
//2 - 13
//1 - 15
//7 - 16
//4 - 17 V

                    // 1e cell (0) bevat code
                    $type = ($row->getCells()[1]->getValue());
                    // 2e cell (1) bevat matchstatus
                    // 3e cell (2) bevat invoicenumber
                    // 4e cell (3) bevat twinfieldnummer

                    //VRK is de verkoop factuur
                    if($type !== 'VRK' ){
                        //5e cell (4) bevat betaaldatum
                        $dateInput = $row->getCells()[17]->getValue(); //datetime
                        $dateInput = date_format($dateInput, 'Y-m-d');

                        //6e cell (5) bevat bedrag (neem aan factuurbedrag en niet betaald bedrag ??)
                        $amountInvoice = $row->getCells()[10]->getValue();
                        //7e cell (6) bevat bedrag openstaand
                        $amountOpen = $row->getCells()[12]->getValue();

                        //-100 op debiteur is dus 100 betaald
                        $amount = ($amountInvoice-$amountOpen) * -1;

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

    public function readBrowseDefinition(BrowseDataApiConnector $browseDataApiConnector){

        // Code 020 = Transaction list
        // Code 100 = Customer transactionsPer
        try {
//            $browseDefinitions = $browseDataApiConnector->getBrowseDefinition('020');
//            $browseDefinitions = $browseDataApiConnector->getBrowseDefinition('100');
            $browseDefinitions = $browseDataApiConnector->getBrowseFields();
        } catch (PhpTwinfieldException $e) {
            Log::error($e->getMessage());
            return $e->getMessage() ? $e->getMessage() : 'Er is een fout opgetreden.';
        }
        dd($browseDefinitions); die();
    }

}