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
use App\Eco\Twinfield\TwinfieldLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use PhpTwinfield\ApiConnectors\InvoiceApiConnector;
use PhpTwinfield\ApiConnectors\BrowseDataApiConnector;
use PhpTwinfield\BrowseColumn;
use PhpTwinfield\Enums\BrowseColumnOperator;
use PhpTwinfield\Exception as PhpTwinfieldException;
use PhpTwinfield\Office;
use PhpTwinfield\Secure\OpenIdConnectAuthentication;
use PhpTwinfield\Secure\Provider\OAuthProvider;

class TwinfieldInvoicePaymentHelper
{
    private $connection;
    private $administration;
    private $fromInvoiceDateSent;
    private $office;
    private $redirectUri;
    private $invoiceApiConnector;
    public $messages;

    /**
     * TwinfieldInvoicePaymentHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Administration $administration, $fromInvoiceDateSent)
    {
        $this->administration = $administration;

        if($fromInvoiceDateSent){
            $this->fromInvoiceDateSent = $fromInvoiceDateSent;
        }elseif($this->administration->date_sync_twinfield_payments){
            $this->fromInvoiceDateSent = $this->administration->date_sync_twinfield_payments;
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

        $this->invoiceApiConnector = new InvoiceApiConnector($this->connection);
        $this->messages = [];
    }

    public function processTwinfieldInvoicePayment(){
        if(!$this->administration->uses_twinfield){
            return "Deze administratie maakt geen gebruik van Twinfield.";
        }
        if(!$this->administration->twinfield_is_valid){
            return "Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken.";
        }
        set_time_limit(0);

        $browseDataApiConnector = new BrowseDataApiConnector($this->connection);
        //Deze function kan je gebruiken om te kijken wel browseDefinition fields er zijn voor een bepaald code
//        $this->readBrowseDefinition($browseDataApiConnector);

        // We controleren alle invoices met status exported of paid en met koppeling Twinfield en vanaf gewenste date sent
        $invoicesToBeChecked = $this->administration->invoices()
            ->whereIn('status_id', ['exported', 'paid'])
            ->whereNotNull('twinfield_number')
            ->where('date_sent', '>=', $this->fromInvoiceDateSent)
            ->get();
        foreach ($invoicesToBeChecked as $invoiceToBeChecked)
        {
            if(!$invoiceToBeChecked->twinfield_number){
                $message = 'Nota ' . $invoiceToBeChecked->id . ' met nummer ' . $invoiceToBeChecked->number . ' heeft status geexporteerd maar heeft geen Twinfield nummer.';
                Log::info($message);
                TwinfieldLog::create([
                    'invoice_id' => $invoiceToBeChecked->id,
                    'contact_id' => null,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'payment',
                    'user_id' => Auth::user()->id,
                    'is_error' => true,
                ]);
            }
            else {

                //Salestransaction - ophalen van Twinfield
                $columnsSalesTransaction = $this->getSalesTransaction($invoiceToBeChecked);
                try {
                    $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('100', $columnsSalesTransaction);
                } catch (PhpTwinfieldException $exceptionTwinfield) {
                    $message = 'Er is een twinfield fout opgetreden bij ophalen verkoopgegevens notanr. ' . $invoiceToBeChecked->number . '. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
                    Log::info($message);
                    TwinfieldLog::create([
                        'invoice_id' => $invoiceToBeChecked->id,
                        'contact_id' => null,
                        'message_text' => substr($message, 0, 256),
                        'message_type' => 'payment',
                        'user_id' => Auth::user()->id,
                        'is_error' => true,
                    ]);
                    return $message;
                } catch (\Exception $e) {
                    $message = 'Er is een fout opgetreden bij ophalen verkoopgegevens notanr. ' . $invoiceToBeChecked->number . '. Foutmelding: ' . $e->getMessage();
                    Log::info($message);
                    TwinfieldLog::create([
                        'invoice_id' => $invoiceToBeChecked->id,
                        'contact_id' => null,
                        'message_text' => substr($message, 0, 256),
                        'message_type' => 'payment',
                        'user_id' => Auth::user()->id,
                        'is_error' => true,
                    ]);
                    return $message;
                }

                $getPaidData = false;

                foreach($twinfieldInvoiceTransactions->getRows() as $row){

                    // [1] - Dagboek (VRK)
                    // [3] - Matchstatus
                    // [4] - Matchnumber
                    // [5] - Nota bedrag
                    // [6] - Openstaand bedrag
                    $dagBoekVRK     = ($row->getCells()[1]->getValue());
                    $matchStatusVRK = ($row->getCells()[3]->getValue());
                    $matchNumberVRK = ($row->getCells()[4]->getValue());
                    $amountInvoiceVRK = ($row->getCells()[5]->getValue());
                    $amountOpenVRK = ($row->getCells()[6]->getValue());

//                Log::info("Dagboek           :" . $dagBoekVRK);
//                Log::info("Matchstatus       :" . $matchStatusVRK);
//                Log::info("Matchnumber       :" . $matchNumberVRK);
//                Log::info("Notabedrag        :" . $amountInvoiceVRK);
//                Log::info("Openstaand bedrag :" . $amountOpenVRK);

                    //VRK is de verkoop nota (zit al in ask filter getSalesTransaction
                    //Bij openstaande nota's (met of zonder deelbetalingen) is matchstatus 'available'
                    //Als er een betaling is, dan is matchnummer ingevuld. Dat zijn de nota's waar we paid data van willen ophalen.
                    if(!empty($matchNumberVRK))
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
                    } catch (PhpTwinfieldException $exceptionTwinfield) {
                        $message = 'Er is een twinfield fout opgetreden bij ophalen betaalgegevens notanr. ' . $invoiceToBeChecked->number . '. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
                        Log::info($message);
                        TwinfieldLog::create([
                            'invoice_id' => $invoiceToBeChecked->id,
                            'contact_id' => null,
                            'message_text' => substr($message, 0, 256),
                            'message_type' => 'payment',
                            'user_id' => Auth::user()->id,
                            'is_error' => true,
                        ]);
                        return $message;
                    } catch (\Exception $e) {
                        $message = 'Er is een fout opgetreden bij ophalen betaalgegevens notanr. ' . $invoiceToBeChecked->number . '. Foutmelding: ' . $e->getMessage();
                        Log::info($message);
                        TwinfieldLog::create([
                            'invoice_id' => $invoiceToBeChecked->id,
                            'contact_id' => null,
                            'message_text' => substr($message, 0, 256),
                            'message_type' => 'payment',
                            'user_id' => Auth::user()->id,
                            'is_error' => true,
                        ]);
                        return $message;
                    }

                    // Set huidige invoice payments op in_progress
                    foreach($invoiceToBeChecked->payments as $payment) {
                        $payment->in_progress = true;
                        $payment->save();
                    }

                    // Indien 1 row (dat is dan alleen de VRK regel als het goed is), dan nota op betaald indien:
                    // matchstatus = matched and openstaand bedrag is 0,00
                    // Dit komt bijvoorbeeld voor als Nota's tegen elkaar afgeletterd worden (nota / creditnota biiv.)
                    if($twinfieldInvoiceTransactions && $twinfieldInvoiceTransactions->getTotal() == 1
                        && $matchStatusVRK == 'matched'
                        && floatval(number_format($amountOpenVRK, 2, '.', '') == 0) ){
                        $row = $twinfieldInvoiceTransactions->getRows()[0];
                        $dagBoek = ($row->getCells()[1]->getValue());
                        if($dagBoek === 'VRK') {
                            $this->createOrUpdateInvoicePayment($row, $dagBoek, $invoiceToBeChecked);
                        }
                    }

                    // Sync nieuwe een aangepaste invoice payments
                    foreach($twinfieldInvoiceTransactions->getRows() as $row){
                        $dagBoek = ($row->getCells()[1]->getValue());
                        // VRK is de verkoop nota, die slaan we nu hier over
                        if($dagBoek !== 'VRK'){
                            $this->createOrUpdateInvoicePayment($row, $dagBoek, $invoiceToBeChecked);
                        }
                    };
                    // Invoice payments die we niet meer binnenkrijgen verwijderen we (softdelete))
                    $invoiceReload = Invoice::find($invoiceToBeChecked->id);
                    foreach($invoiceReload->payments as $payment) {
                        if($payment->in_progress) {
                            $payment->in_progress = false;
                            $payment->save();
                            $payment->delete();
                        }
                    }
                }
            }
        }

        if(count($this->messages) == 0){
            array_push($this->messages, 'Geen betalingen gevonden.');
        }

        return implode(';', $this->messages);
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
            ->setVisible(true)
            ->setAsk(false);
        // [4] - Matchnumber
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchnumber')
            ->setLabel('Betaalnr.')
            ->setVisible(true)
            ->setAsk(false);
        // [5] - Notabedrag in EUR
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.basevaluesigned')
            ->setLabel('Bedrag in administratie valuta')
            ->setVisible(true)
            ->setAsk(false);
        // [6] - Openstaand bedrag
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.openbasevaluesigned')
            ->setLabel('Openstaand bedrag')
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
            ->setAsk(false);
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
            ->setAsk(false);
        // [4] - Betaaldatum
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchdate')
            ->setLabel('Betaaldatum')
            ->setVisible(true)
            ->setAsk(true)
            ->setOperator(BrowseColumnOperator::BETWEEN())
            ->setFrom('19800101')
            ->setTo('20391201');
        // [5] - Twinfield nr.
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.head.number')
            ->setLabel('Boekst.nr.')
            ->setVisible(true)
            ->setAsk(false);
        // [6] - Matchnumber
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.matchnumber')
            ->setLabel('Betaalnr.')
            ->setVisible(true)
            ->setAsk(false);
        // [7] - Wijzigingsdatum
        $columns[] = (new BrowseColumn())
            ->setField('fin.trs.line.modified')
            ->setLabel('Wijzigingsdatum')
            ->setVisible(true)
            ->setAsk(false);

        return $columns;

    }

    /**
     * @param \PhpTwinfield\BrowseDataRow $row
     * @param $invoiceToBeChecked
     */
    private function createOrUpdateInvoicePayment(\PhpTwinfield\BrowseDataRow $row, $dagBoek, $invoiceToBeChecked)
    {
        // [1] - Dagboek
        // [2] - Notanr.
        // [3] - Bedrag
        // [4] - Betaaldatum
        // [5] - Twinfieldnumber
        // [6] - Matchnumber
        // [7] - Wijzigingsdatum

        $amountInvoice = $row->getCells()[3]->getValue();
        $dateInput = $row->getCells()[4]->getValue(); //datetime
        $dateInput = date_format($dateInput, 'Y-m-d');
        //todo WM: nog uitzoeken of en hoe we deze kunnen bepalen vanuit Twinfield???
        $paymentReference = null;
        $twinfieldNumber = ($row->getCells()[5]->getValue());
        $twinfieldMatchNumber = ($row->getCells()[6]->getValue());
        $twinfieldModifiedDate = ($row->getCells()[7]->getValue());
        $twinfieldModifiedDate = Carbon::parse($twinfieldModifiedDate);

//        Log::info("   Dagboek        :" . $dagBoek);
//        Log::info("   Notabedrag     :" . $amountInvoice);
//        Log::info("   Betaaldatum    :" . $dateInput);
//        Log::info("   Twinfieldnumber:" . $twinfieldNumber);
//        Log::info("   Matchnumber    :" . $twinfieldMatchNumber);
//        Log::info("   Wijzigingsdatum:" . $twinfieldModifiedDate);

        if($dagBoek === 'VRK') {
            //Nota bedrag 100 is dus ook 100 betaald
            $amount = floatval(number_format($amountInvoice, 2, '.', ''));
        }else{
            //Niet verkoop regel: -100 is dus 100 betaald
            $amount = floatval(number_format($amountInvoice * -1, 2, '.', ''));
        }

        $invoicePaymentCheck = InvoicePayment::where('invoice_id', $invoiceToBeChecked->id)->where('twinfield_number', $twinfieldNumber)->where('twinfield_match_number', $twinfieldMatchNumber);
        // InvoicePayment bestaat nog niet, dan nieuw aanmaken
        if (!$invoicePaymentCheck->exists()) {
            $invoicePayment = new InvoicePayment();
            $invoicePayment->invoice_id = $invoiceToBeChecked->id;
            $invoicePayment->twinfield_number = $twinfieldNumber;
            $invoicePayment->twinfield_match_number = $twinfieldMatchNumber;
            $invoicePayment->twinfield_modified = $twinfieldModifiedDate;
            $invoicePayment->amount = $amount;
            $invoicePayment->type_id = $dagBoek;
            $invoicePayment->date_paid = $dateInput;
            $invoicePayment->payment_reference = $paymentReference;
            $invoicePayment->in_progress = false;
            $invoicePayment->save();

            $message = 'Betaling van € ' . $amount . ' toegevoegd via Twinfield voor nota ' . $invoiceToBeChecked->number . '.';
            TwinfieldLog::create([
                'invoice_id' => $invoiceToBeChecked->id,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'payment',
                'user_id' => Auth::user()->id,
                'is_error' => false,
            ]);
            array_push($this->messages, $message);
            // anders bijwerken
        } else {
            $invoicePayment = $invoicePaymentCheck->first();
            $oldAmount = floatval(number_format($invoicePayment->amount, 2, '.', ''));
            $oldDateInput = $invoicePayment->date_paid;
            $oldTwinfieldModified = Carbon::parse($invoicePayment->twinfield_modified);
            $oldPaymentReference = $invoicePayment->payment_reference;
            if ($oldAmount != $amount || $oldDateInput != $dateInput || $oldTwinfieldModified != $twinfieldModifiedDate || $oldPaymentReference != $paymentReference) {
                $data = ['amount' => $amount, 'date_paid' => $dateInput, 'twinfield_modified' => $twinfieldModifiedDate, 'payment_reference' => $paymentReference];
                $invoicePayment->fill($data);
                $invoicePayment->in_progress = false;
                $invoicePayment->save();

                $message = 'Betaling van € ' . $amount . ' (datum ' . $dateInput . ') aangepast via Twinfield voor nota ' . $invoiceToBeChecked->number . '. Bedrag was € ' . $oldAmount . ' (datum ' . $oldDateInput . ').';
                TwinfieldLog::create([
                    'invoice_id' => $invoiceToBeChecked->id,
                    'contact_id' => null,
                    'message_text' => substr($message, 0, 256),
                    'message_type' => 'payment',
                    'user_id' => Auth::user()->id,
                    'is_error' => false,
                ]);
                array_push($this->messages, $message);
            } else {
                $invoicePayment->in_progress = false;
                $invoicePayment->save();
            }
        }
    }

    public function readBrowseDefinition(BrowseDataApiConnector $browseDataApiConnector){

        // Code 020 = Transaction list
        // Code 100 = Customer transactions
        try {
//            $browseDefinitions = $browseDataApiConnector->getBrowseDefinition('020');
            $browseDefinitions = $browseDataApiConnector->getBrowseDefinition('100');
//            $browseDefinitions = $browseDataApiConnector->getBrowseFields();
        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Er is een twinfield fout opgetreden. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => null,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'payment',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            return $message;
        } catch (\Exception $e) {
            $message = 'Er is een fout opgetreden. Foutmelding: ' . $e->getMessage();
            Log::info($message);
            TwinfieldLog::create([
                'invoice_id' => null,
                'contact_id' => null,
                'message_text' => substr($message, 0, 256),
                'message_type' => 'payment',
                'user_id' => Auth::user()->id,
                'is_error' => true,
            ]);
            return $message;
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
////                    ->setFrom('19800101')
////                    ->setTo('20391201');
//

