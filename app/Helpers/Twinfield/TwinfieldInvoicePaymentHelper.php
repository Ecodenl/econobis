<?php

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
    private $countRequestsgetBrowserData = 0;
    public $messages;
    private const BATCH_SIZE = 100; // Set the batch size for processing invoices

    public function __construct(Administration $administration, $fromInvoiceDateSent = null)
    {
        $this->administration = $administration;
        $this->fromInvoiceDateSent = $this->determineInvoiceDateSent($fromInvoiceDateSent);
        $this->office = Office::fromCode($administration->twinfield_office_code);
        $this->redirectUri = \Config::get('app.url_api') . '/twinfield';
        $this->initializeConnection();
        $this->invoiceApiConnector = new InvoiceApiConnector($this->connection);
        $this->messages = [];
        $this->logStartSync();
    }

    private function determineInvoiceDateSent($fromInvoiceDateSent)
    {
        if ($fromInvoiceDateSent) {
            return $fromInvoiceDateSent;
        }

        if ($this->administration->date_sync_twinfield_payments) {
            return $this->administration->date_sync_twinfield_payments;
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

    public function processTwinfieldInvoicePayment()
    {
        if (!$this->administration->uses_twinfield) {
            return "Deze administratie maakt geen gebruik van Twinfield.";
        }

        if (!$this->administration->twinfield_is_valid) {
            return "Twinfield is onjuist geconfigureerd. Pas de configuratie aan om Twinfield te gebruiken.";
        }

        set_time_limit(0);
        $browseDataApiConnector = new BrowseDataApiConnector($this->connection);
        //Deze function kan je gebruiken om te kijken wel browseDefinition fields er zijn voor een bepaald code
//        $this->readBrowseDefinition($browseDataApiConnector);

        // Retrieve invoices to be checked in batches
        // We controleren alle invoices met status exported of paid en met koppeling Twinfield en vanaf gewenste date sent
        $invoicesToBeChecked = $this->getInvoicesToBeChecked();

        $invoiceBatches = array_chunk($invoicesToBeChecked->toArray(), self::BATCH_SIZE);

        $chunkNumber = 0;
        $numberOfChunks = ceil($invoicesToBeChecked->count() / self::BATCH_SIZE);

        foreach ($invoiceBatches as $batch) {
            $chunkNumber = $chunkNumber + 1;
            $message = 'Start batch voor betalingen (' . $chunkNumber . '/' . $numberOfChunks . ') voor in totaal ' . $invoicesToBeChecked->count() . ' nota\'s (' . self::BATCH_SIZE . ' per batch)';
            $this->logBatchSync($message);

            $this->processInvoiceBatch($batch, $browseDataApiConnector);
            // hier eventueel delay inbouwen?

        }
        $message = 'Einde synchroniseren betalingen (vanaf ' . Carbon::parse($this->fromInvoiceDateSent)->format('d-m-Y') . '), organisatie: '
            . $this->administration->twinfield_organization_code
            . ', code : ' . $this->administration->twinfield_office_code
            . ', client Id: ' . $this->administration->twinfield_client_id
            . '. Aantal verzoeken naar Twinfield: ' . $this->countRequestsgetBrowserData
            . '.';
        $this->logEndSync($message);

        if (count($this->messages) == 0) {
            array_push($this->messages, 'Geen betalingen gevonden.');
        }

        return implode(';', $this->messages);
    }

    private function getInvoicesToBeChecked()
    {
        return $this->administration->invoices()
            ->whereIn('status_id', ['exported', 'paid'])
            ->whereNotNull('twinfield_number')
            ->where('date_sent', '>=', $this->fromInvoiceDateSent)
            ->get();
    }

    private function processInvoiceBatch(array $invoiceBatch, $browseDataApiConnector)
    {
        foreach ($invoiceBatch as $invoiceToBeChecked) {
            $this->processInvoice($invoiceToBeChecked, $browseDataApiConnector);
        }
    }

    private function processInvoice($invoiceToBeChecked, $browseDataApiConnector)
    {
        if (!$invoiceToBeChecked['twinfield_number']) {
            $message = 'Nota ' . $invoiceToBeChecked['id'] . ' met nummer ' . $invoiceToBeChecked['number'] . ' heeft status geexporteerd maar heeft geen Twinfield nummer.';
            $this->logMissingTwinfieldNumber($invoiceToBeChecked, $message);
            return;
        }

        $columnsSalesTransaction = $this->getSalesTransaction($invoiceToBeChecked);
        try {
            $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('100', $columnsSalesTransaction);
            $this->countRequestsgetBrowserData++;
        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Er is een twinfield fout opgetreden bij ophalen verkoopgegevens notanr. ' . $invoiceToBeChecked['number'] . '. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            return $this->logTwinfieldError($invoiceToBeChecked, $message);
        } catch (\Exception $e) {
            $message = 'Er is een fout opgetreden bij ophalen verkoopgegevens notanr. ' . $invoiceToBeChecked['number'] . '. Foutmelding: ' . $e->getMessage();
            return $this->logGeneralError($invoiceToBeChecked, $message);
        }

        $paidData = $this->getPaidData($twinfieldInvoiceTransactions);

        if ($paidData) {
            $this->processPaidData($invoiceToBeChecked, $browseDataApiConnector, $paidData);
        }
    }

    private function getSalesTransaction($invoiceToBeChecked){

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
            ->setFrom( $invoiceToBeChecked['number']);
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

    private function getPaidData($twinfieldInvoiceTransactions)
    {
        foreach ($twinfieldInvoiceTransactions->getRows() as $row) {
            // [1] - Dagboek (VRK)
            // [3] - Matchstatus
            // [4] - Matchnumber
            // [5] - Nota bedrag
            // [6] - Openstaand bedrag
//            $dagBoekVRK     = ($row->getCells()[1]->getValue());
            $matchStatusVRK = ($row->getCells()[3]->getValue());
            $matchNumberVRK = ($row->getCells()[4]->getValue());
//            $amountInvoiceVRK = ($row->getCells()[5]->getValue());
            $amountOpenVRK = ($row->getCells()[6]->getValue());

            if (!empty($matchNumberVRK)) {
                return [
//                  'dagBoekVRK' => $dagBoekVRK,
                    'matchStatusVRK' => $matchStatusVRK,
                    'matchNumberVRK' => $matchNumberVRK,
//                    'amountInvoiceVRK' => $amountInvoiceVRK,
                    'amountOpenVRK' => $amountOpenVRK,
                ];
            }
        }

        return false;
    }

    private function processPaidData($invoiceToBeChecked, $browseDataApiConnector, $paidData)
    {
        $columnsPaidInfo = $this->getPaidInfo($invoiceToBeChecked);
        try {
            $twinfieldInvoiceTransactions = $browseDataApiConnector->getBrowseData('100', $columnsPaidInfo);
            $this->countRequestsgetBrowserData++;
        } catch (PhpTwinfieldException $exceptionTwinfield) {
            $message = 'Er is een twinfield fout opgetreden bij ophalen betaalgegevens notanr. ' . $invoiceToBeChecked['number'] . '. Twinfield foutmelding: ' . $exceptionTwinfield->getMessage();
            return $this->logTwinfieldError($invoiceToBeChecked, $message);
        } catch (\Exception $e) {
            $message = 'Er is een fout opgetreden bij ophalen betaalgegevens notanr. ' . $invoiceToBeChecked['number'] . '. Foutmelding: ' . $e->getMessage();
            return $this->logGeneralError($invoiceToBeChecked, $message);
        }

        $this->setPaymentsInProgress($invoiceToBeChecked);

        // Indien 1 row (dat is dan alleen de VRK regel als het goed is), dan nota op betaald indien:
        // matchstatus = matched and openstaand bedrag is 0,00
        // Dit komt bijvoorbeeld voor als Nota's tegen elkaar afgeletterd worden (nota / creditnota biiv.)
        if($twinfieldInvoiceTransactions && $twinfieldInvoiceTransactions->getTotal() == 1
            && $paidData['matchStatusVRK'] == 'matched'
            && floatval(number_format($paidData['amountOpenVRK'], 2, '.', '') == 0) ){
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
        $invoiceReload = Invoice::find($invoiceToBeChecked['id']);
        foreach($invoiceReload->payments as $payment) {
            if($payment->in_progress) {
                $payment->in_progress = false;
                $payment->save();
                $payment->delete();
            }
        }
    }

    private function getPaidInfo($invoiceToBeChecked){

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
            ->setFrom( $invoiceToBeChecked['number']);
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

    private function setPaymentsInProgress($invoiceToBeChecked)
    {
        // Set huidige invoice payments op in_progress
        $invoiceReload = Invoice::find($invoiceToBeChecked['id']);
        foreach($invoiceReload->payments as $payment) {
            $payment->in_progress = true;
            $payment->save();
        }
    }

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

        $invoicePaymentCheck = InvoicePayment::where('invoice_id', $invoiceToBeChecked['id'])->where('twinfield_number', $twinfieldNumber)->where('twinfield_match_number', $twinfieldMatchNumber);
        // InvoicePayment bestaat nog niet, dan nieuw aanmaken
        if (!$invoicePaymentCheck->exists()) {
            $invoicePayment = new InvoicePayment();
            $invoicePayment->invoice_id = $invoiceToBeChecked['id'];
            $invoicePayment->twinfield_number = $twinfieldNumber;
            $invoicePayment->twinfield_match_number = $twinfieldMatchNumber;
            $invoicePayment->twinfield_modified = $twinfieldModifiedDate;
            $invoicePayment->amount = $amount;
            $invoicePayment->type_id = $dagBoek;
            $invoicePayment->date_paid = $dateInput;
            $invoicePayment->payment_reference = $paymentReference;
            $invoicePayment->in_progress = false;
            $invoicePayment->save();

            $message = 'Betaling van € ' . $amount . ' toegevoegd via Twinfield voor nota ' . $invoiceToBeChecked['number'] . '.';
            $this->logPaymentSuccess($invoiceToBeChecked, $message);
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

                $message = 'Betaling van € ' . $amount . ' (datum ' . $dateInput . ') aangepast via Twinfield voor nota ' . $invoiceToBeChecked['number'] . '. Bedrag was € ' . $oldAmount . ' (datum ' . $oldDateInput . ').';
                $this->logPaymentSuccess($invoiceToBeChecked, $message);
                array_push($this->messages, $message);
            } else {
                $invoicePayment->in_progress = false;
                $invoicePayment->save();
            }
        }

    }

    private function logStartSync()
    {
        $message = 'Start synchroniseren betalingen (vanaf ' . Carbon::parse($this->fromInvoiceDateSent)->format('d-m-Y') . '), organisatie: '
            . $this->administration->twinfield_organization_code
            . ', code : ' . $this->administration->twinfield_office_code
            . ', client Id: ' . $this->administration->twinfield_client_id
            . '.';

        TwinfieldLog::create([
            'invoice_id' => null,
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'payment',
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
            'message_type' => 'payment',
            'user_id' => Auth::user()->id,
            'is_error' => false,
        ]);
    }
    private function logMissingTwinfieldNumber($invoiceToBeChecked, $message)
    {
        Log::info($message);

        TwinfieldLog::create([
            'invoice_id' => $invoiceToBeChecked['id'],
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'payment',
            'user_id' => Auth::user()->id,
            'is_error' => true,
        ]);
    }

    private function logPaymentSuccess($invoiceToBeChecked, $message)
    {
        TwinfieldLog::create([
            'invoice_id' => $invoiceToBeChecked['id'],
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'payment',
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
            'message_type' => 'payment',
            'user_id' => Auth::user()->id,
            'is_error' => false,
        ]);
    }

    private function logTwinfieldError($invoiceToBeChecked, $message)
    {
        Log::info($message);
        TwinfieldLog::create([
            'invoice_id' => $invoiceToBeChecked['id'],
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'payment',
            'user_id' => Auth::user()->id,
            'is_error' => true,
        ]);
    }

    private function logGeneralError($invoiceToBeChecked, $message)
    {
        Log::info($message);
        TwinfieldLog::create([
            'invoice_id' => $invoiceToBeChecked['id'],
            'contact_id' => null,
            'message_text' => substr($message, 0, 256),
            'message_type' => 'payment',
            'user_id' => Auth::user()->id,
            'is_error' => true,
        ]);
    }


}
