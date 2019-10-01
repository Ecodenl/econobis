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

        // We controleren alle invoices met status exported of paid en met koppeling Twinfield
        // todo Op den duur worden dit steeds meer invoices die hij moet checken.
        //  wellicht moeten we een max periode terug in tijd afspreken. En wellicht dan h.m. correctie mogelijk maken voor oude betalingen.
        foreach ($this->administration->invoices()->whereIn('status_id', ['exported', 'paid'])->whereNotNull('twinfield_number')->get() as $invoiceToBeChecked)
        {
            if(!$invoiceToBeChecked->twinfield_number){
                Log::error('Nota ' . $invoiceToBeChecked->id . ' met nummer ' . $invoiceToBeChecked->number . ' heeft status geexporteerd maar heeft geen Twinfield nummer.');
            }
            else {

                $columnsSalesTransaction = $this->getSalesTransaction($invoiceToBeChecked);
                //Salestransaction - ophalen van Twinfield
                try {
                    $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('100', $columnsSalesTransaction);
                } catch (PhpTwinfieldException $e) {
                    Log::error($e->getMessage());
                    return $e->getMessage() ? $e->getMessage() : 'Er is een fout opgetreden bij ophalen verkoopgegevens notanr. ' . $invoiceToBeChecked->number . '.';
                }

                $getPaidData = false;

                foreach($twinfieldInvoiceTransactions->getRows() as $row){

                    // [1] - Dagboek (VRK)
                    // [3] - Matchstatus
                    // [4] - Matchnumber
                    $dagBoek     = ($row->getCells()[1]->getValue());
                    $matchStatus = ($row->getCells()[3]->getValue());
                    $matchNumber = ($row->getCells()[4]->getValue());

                    //VRK is de verkoop nota
                    if($dagBoek === 'VRK' && ($matchStatus=='matched' || !empty($matchNumber) ) )
                    {
                        $getPaidData = true;
                    }
                };

                if($getPaidData)
                {
                    $columnsPaidInfo = $this->getPaidInfo($invoiceToBeChecked);
                    //Paid info - ophalen van Twinfield
                    try {
                        $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('100', $columnsPaidInfo);
                    } catch (PhpTwinfieldException $e) {
                        Log::error($e->getMessage());
                        return $e->getMessage() ? $e->getMessage() : 'Er is een fout opgetreden bij ophalen betaalgegevens notanr. ' . $invoiceToBeChecked->number . '.';
                    }
//                dd($twinfieldInvoiceTransactions);

                    foreach($twinfieldInvoiceTransactions->getRows() as $row){

                        // [1] - Dagboek (alle)
                        // [3] - Notabedrag
                        // [4] - Openstaand bedrag
                        // [5] - Betaaldatum
                        // [6] - Twinfieldnumber
                        // [7] - Matchnumber

                        $dagBoek     = ($row->getCells()[1]->getValue());
                        $amountInvoice = $row->getCells()[3]->getValue();
                        $amountOpen = $row->getCells()[4]->getValue();
                        $dateInput = $row->getCells()[5]->getValue(); //datetime
                        $dateInput = date_format($dateInput, 'Y-m-d');
                        $twinfieldNumber = ($row->getCells()[6]->getValue());
                        $twinfieldMatchNumber = ($row->getCells()[7]->getValue());

                        //VRK is de verkoop nota, die slaan we nu over
                        if($dagBoek !== 'VRK')
                        {
                            //-100 op debiteur is dus 100 betaald
                            $amount = ($amountInvoice-$amountOpen) * -1;
                            $invoicePaymentCheck = InvoicePayment::where('invoice_id', $invoiceToBeChecked->id)->where('twinfield_number', $twinfieldNumber)->where('twinfield_match_number', $twinfieldMatchNumber);
                            // InvoicePayment bestaat nog niet, dan nieuw aanmaken
                            if(!$invoicePaymentCheck->exists())
                            {
                                $invoicePayment = new InvoicePayment();
                                $invoicePayment->invoice_id = $invoiceToBeChecked->id;
                                $invoicePayment->twinfield_number = $twinfieldNumber;
                                $invoicePayment->twinfield_match_number = $twinfieldMatchNumber;
                                $invoicePayment->amount = $amount;
                                $invoicePayment->type_id = $dagBoek;
                                $invoicePayment->date_paid = $dateInput;
                                $invoicePayment->save();
                                Log::info('Betaling van ' . $amount . ' toegevoegd via twinfield voor nota ' . $invoiceToBeChecked->number);
                                array_push($messages, 'Betaling van €' . $amount . ' toegevoegd via Twinfield voor nota ' . $invoiceToBeChecked->number . '.');
                            // anders bijwerken
                            }else{
                                $invoicePayment = $invoicePaymentCheck->first();
                                if($invoicePayment->amount <> $amount || $invoicePayment->date_paid <> $dateInput )
                                {
                                    $data = ['amount'=>$amount, 'date_paid'=>$dateInput];
                                    $invoicePayment->fill($data);
                                    $invoicePayment->save();
                                    Log::info('Betaling van ' . $amount . ' aangepast via twinfield voor nota ' . $invoiceToBeChecked->number);
                                    array_push($messages, 'Betaling van €' . $amount . ' aangepast via Twinfield voor nota ' . $invoiceToBeChecked->number . '.');
                                }
                            }
                        }
                    };

                }

            }
        }

        if(count($messages) == 0){
            array_push($messages, 'Geen betalingen gevonden.');
        }

        return implode(';', $messages);
    }

    public function getSalesTransaction($invoiceToBeChecked){

        $columns = [];

        // [0] - Filter Office (code)
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.head.office')
            ->setLabel('Office code')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::EQUAL())
            ->setFrom( $this->office );
        // [1] - Dagboek (VRK)
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.head.code')
            ->setLabel('Dagboek')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::EQUAL())
            ->setFrom("VRK");
        // [2] - Notanr.
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.invnumber')
            ->setLabel('Notanr.')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::EQUAL())
            ->setFrom( $invoiceToBeChecked->number );
        // [3] - Matchstatus
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchstatus')
            ->setLabel('Betaalstatus')
            ->setVisible(true);
//            ->setAsk(true)
//            ->setOperator(BrowseColumnOperator::EQUAL())
//            ->setFrom( "matched" );
        // [4] - Matchnumber
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchnumber')
            ->setLabel('Betaalnr.')
            ->setVisible(true)
            ->setAsk(false);

        return $columns;

    }

    public function getPaidInfo($invoiceToBeChecked){

        $columns = [];

        // [0] - Filter Office (code)
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.head.office')
            ->setLabel('Office code')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::EQUAL())
            ->setFrom( $this->office );
        // [1] - Dagboek (alles)
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.head.code')
            ->setLabel('Dagboek')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::EQUAL());
        // [2] - Notanr.
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.invnumber')
            ->setLabel('Notanr.')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::EQUAL())
            ->setFrom( $invoiceToBeChecked->number );
        // [3] - Notabedrag in EUR
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.basevaluesigned')
            ->setLabel('Bedrag in administratie valuta')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::BETWEEN());
        // [4] - Openstaand bedrag
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.openbasevaluesigned')
            ->setLabel('Openstaand bedrag')
            ->setVisible(true)
            ->setAsk(false);
        // [5] - Betaaldatum
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchdate')
            ->setLabel('Betaaldatum')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::BETWEEN())
            ->setFrom('19800101')
            ->setTo('20391201');
        // [6] - Twinfield nr.
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.head.number')
            ->setLabel('Boekst.nr.')
            ->setVisible(true)
            ->setAsk(true);
        // [7] - Matchnumber
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchnumber')
            ->setLabel('Betaalnr.')
            ->setVisible(true)
            ->setAsk(false);

        return $columns;

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

// Beschikbare browse columns
////0 - 0
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.office')
//    ->setLabel('Office code')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::EQUAL())
//    ->setFrom( $this->office );
////1 - 1
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.yearperiod')
//    ->setLabel('Periode')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN())
//    ->setFrom( '2018/00' )
//    ->setTo( '2019/55' );
////2 - 2
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.code')
//    ->setLabel('Dagboek')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::EQUAL());
////3 - 3
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.shortname')
//    ->setLabel('Naam')
//    ->setVisible(true)
//    ->setAsk(false);
////4 - 4
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.number')
//    ->setLabel('Boekst.nr.')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////5 - 5
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.status')
//    ->setLabel('Status')
//    ->setVisible(true)
//    ->setAsk(true);
////6 - 6
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.date')
//    ->setLabel('Boekdatum')
//    ->setVisible(true)
//    ->setAsk(false);
////7 - 7
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.dim2')
//    ->setLabel('Debiteurnummer')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////8 - 8
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.dim2name')
//    ->setLabel('Naam debiteur')
//    ->setVisible(true)
//    ->setAsk(false);
////9 - 9
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.head.curcode')
//    ->setLabel('Valuta')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::EQUAL());
////10 - 10
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.valuesigned')
//    ->setLabel('Bedrag')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////11 - 11
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.basevaluesigned')
//    ->setLabel('Bedrag in administratie valuta')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////12 - 12
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.repvaluesigned')
//    ->setLabel('Bedrag in rapportage valuta')
//    ->setVisible(true)
//    ->setAsk(false);
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////13 - 13
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.openbasevaluesigned')
//    ->setLabel('Openstaand bedrag')
//    ->setVisible(true)
//    ->setAsk(false);
////14 - 14
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.invnumber')
//    ->setLabel('Notanr.')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::EQUAL());
////                    ->setFrom( $invoiceToBeChecked->number );
////15 - 15
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.datedue')
//    ->setLabel('Vervaldatum')
//    ->setVisible(true)
//    ->setAsk(false);
////16 - 16
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.matchstatus')
//    ->setLabel('Betaalstatus')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::EQUAL())
//    ->setFrom('matched');
////17 - 17
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.matchnumber')
//    ->setLabel('Betaalnr.')
//    ->setVisible(true)
//    ->setAsk(false)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////18 - 18
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.matchdate')
//    ->setLabel('Betaaldatum')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
////                    ->setFrom('19800101')
////                    ->setTo('20391201');
////19 - 19
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.openvaluesigned')
//    ->setLabel('Openstaand bedrag transactievaluta')
//    ->setVisible(true)
//    ->setAsk(false);
////20 - 20
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.availableforpayruns')
//    ->setLabel('Beschikbaar voor betaalrun')
//    ->setVisible(true)
//    ->setAsk(true);
////21 - 21
//$columns[] = (new BrowseColumn())
//    ->setField('fin.trs.line.modified')
//    ->setLabel('Wijzigingsdatum')
//    ->setVisible(true)
//    ->setAsk(true)
//    ->setOperator(BrowseColumnOperator::BETWEEN());
//

