<?php
/**
 * Created by PhpStorm.
 * User: Rob Rollenberg
 * Date: 14-6-2018
 * Time: 11:40
 */

namespace App\Helpers\Sepa;

use App\Eco\Administration\Administration;
use App\Eco\Administration\Sepa;
use App\Eco\Invoice\Invoice;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

/**
 * Class SepaHelper
 *
 * @package App\Helpers\Sepa
 */
class SepaPaymentHelper
{
    /**
     * @var Administration|string
     */
    private $administration = '';
    /**
     * @var array
     */
    private $invoices = [];

    /**
     * SepaHelper constructor.
     *
     * @param Administration $administration
     * @param                $invoices
     */
    public function __construct(Administration $administration, $invoices)
    {
        $this->administration = $administration;
        $this->invoices = $invoices;
    }

    /**
     * @return Sepa
     */
    public function generateSepaFile()
    {
        //Generate Sepa XML file
       $xml = $this->createXml();

       //Save file on server, also fill in fk sepa_id for invoices
       return $this->saveSepaFile($xml);
    }

    // Make Xml file

    /**
     *
     * @return string - the XML
     */
    private function createXml()
    {

        $batchNumber = Sepa::where('administration_id', $this->administration->id)->count();

        $totalOpen = 0;
        foreach($this->invoices as $invoice){
            $totalOpen += $invoice->amount_open;
        }
        $xml = '';

        $xml .= "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
        $xml .= "\n<Document xmlns=\"urn:iso:std:iso:20022:tech:xsd:pain.001.001.03\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">";
        $xml .= "\n\t<CstmrCdtTrfInitn>";

        // GroupHeader
        $xml .= "\n\t\t<GrpHdr>";
        $xml .= "\n\t\t\t<MsgId>" . Carbon::now()->format('Ymd') . $batchNumber . "</MsgId>"; // Uniek nummer - Datum + Batchnummer
        $xml .= "\n\t\t\t<CreDtTm>" . Carbon::now()->format('c') . "</CreDtTm>"; // Aanmaakdatum van bestand > 2012-12-01T13:00:00 (ISO Time)
        $xml .= "\n\t\t\t<NbOfTxs>" . $this->invoices->count() . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totalOpen . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)
        $xml .= "\n\t\t\t<InitgPty>";
        $xml .= "\n\t\t\t\t<Nm>" . $this->administration->name . "</Nm>"; // Naam van opdrachtgever
        $xml .= "\n\t\t\t</InitgPty>";
        $xml .= "\n\t\t</GrpHdr>";

        // Payment Information
        $xml .= "\n\t\t<PmtInf>";
        $xml .= "\n\t\t\t<PmtInfId>" . Carbon::now()->format('Ymd') . $batchNumber . "</PmtInfId>"; // Referentienummer
        $xml .= "\n\t\t\t<PmtMtd>TRF</PmtMtd>"; // DD - Vaste waarde voor incasso
        $xml .= "\n\t\t\t<NbOfTxs>" . $this->invoices->count() . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totalOpen . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)

        /// Payment Type Information
        $xml .= "\n\t\t\t<PmtTpInf>";
        $xml .= "\n\t\t\t\t<SvcLvl>";
        $xml .= "\n\t\t\t\t\t<Cd>SEPA</Cd>"; // SEPA - Vaste code
        $xml .= "\n\t\t\t\t</SvcLvl>";
        $xml .= "\n\t\t\t\t<LclInstrm>";
        $xml .= "\n\t\t\t\t\t<Cd>ACCEPT</Cd>"; // ACCEPT - Vaste waarde
        $xml .= "\n\t\t\t\t</LclInstrm>";
        $xml .= "\n\t\t\t</PmtTpInf>";

        $xml .= "\n\t\t\t<ReqdExctnDt>" . Carbon::now()->addWeek() . "</ReqdExctnDt>"; // Gewenste uitvoerdatum

        $xml .= "\n\t\t\t<Dbtr>"; // Debiteur
        $xml .= "\n\t\t\t\t<Nm>" . $this->administration->name . "</Nm>"; // Naam Debiteur
        $xml .= "\n\t\t\t</Dbtr>";

        /// Debiteur Account
        $xml .= "\n\t\t\t<DbtrAcct>";
        $xml .= "\n\t\t\t\t<Id>";
        $xml .= "\n\t\t\t\t\t<IBAN>" . str_replace(" ", "", $this->administration->IBAN) . "</IBAN>"; // IBAN nummer opdrachtgever, spaties zijn in dit veld niet toegestaan
        $xml .= "\n\t\t\t\t</Id>";
        $xml .= "\n\t\t\t</DbtrAcct>";

        /// Debiteur Agent
        $xml .= "\n\t\t\t<DbtrAgt>";
        $xml .= "\n\t\t\t\t<FinInstnId>";
        $xml .= "\n\t\t\t\t\t<BIC>" .  str_replace(" ", "", $this->administration->bic) . "</BIC>"; // SWIFT/BIC code van bank opdrachtgever, spaties zijn in dit veld niet toegestaan
        $xml .= "\n\t\t\t\t</FinInstnId>";
        $xml .= "\n\t\t\t</DbtrAgt>";

        $xml .= "\n\t\t\t<ChrgBr>SLEV</ChrgBr>"; // SLEV - Vaste waarde

        // Transacties
        foreach($this->invoices AS $invoice){
            $xml .= "\n\t\t\t<CdtTrfTxInf>";
            $xml .= "\n\t\t\t\t<PmtId>";
            $xml .= "\n\t\t\t\t\t<EndToEndIf>" . $invoice->number . "</EndToEndIf>";
            $xml .= "\n\t\t\t\t</PmtId>";

            $xml .= "\n\t\t\t\t<Amt>";
            $xml .= "\n\t\t\t\t\t<InstdAmt Ccy=\"EUR\">" . $invoice->amount_open . "</InstdAmt>"; // Bedrag incl BTW
            $xml .= "\n\t\t\t\t</Amt>";

            // Crediteur
            $xml .= "\n\t\t\t\t<Cdtr>";
            $xml .= "\n\t\t\t\t\t<Nm>" .  $invoice->revenueDistribution->contact->fullName . "</Nm>"; // Naam
            $xml .= "\n\t\t\t\t\t<PstlAdr>" .  $invoice->revenueDistribution->postal_code . "</PstlAdr>"; // Postcode
            $xml .= "\n\t\t\t\t\t<Ctry>NL</Ctry>";
            $xml .= "\n\t\t\t\t\t<AdrLine>" .  $invoice->revenueDistribution->address . "</AdrLine>"; // Postcode
            $xml .= "\n\t\t\t\t\t<AdrLine>" .  $invoice->revenueDistribution->postal_code . " " . $invoice->revenueDistribution->city .  "</AdrLine>"; // Postcode
            $xml .= "\n\t\t\t\t</Cdtr>";

            // Crediteur Account
            $xml .= "\n\t\t\t\t<CdtrAcct>";
            $xml .= "\n\t\t\t\t\t<Id>";
            $xml .= "\n\t\t\t\t\t\t<IBAN>" . str_replace(' ', '', $invoice->revenueDistribution->participation->IBAN) . "</IBAN>"; // IBAN nummer van geincasseerde
            $xml .= "\n\t\t\t\t\t</Id>";
            $xml .= "\n\t\t\t\t</CdtrAcct>";
            $xml .= "\n\t\t\t</CdtTrfTxInf>";
        }

        $xml .= "\n\t\t</PmtInf>";
        $xml .= "\n\t</CstmrCdtTrfInitn>";
        $xml .= "\n</Document>";

        return $xml;
    }

    /** Saves file on server, also fills in invoice foreign key sepa_id
     * @param $xml
     *
     * @return Sepa
     */
    private function saveSepaFile($xml){

        $this->checkStorageDir();

        $name = 'u-sepa' . Carbon::now()->format('Ymdhi') . '.xml';

        $path = 'administration_' . $this->administration->id
            . DIRECTORY_SEPARATOR . 'sepas' . DIRECTORY_SEPARATOR . $name;

        Storage::put('administrations/' . $path, $xml);

        $sepa = new Sepa();
        $sepa->administration_id = $this->administration->id;
        $sepa->filename = $path;
        $sepa->name = $name;
        $sepa->sepa_type_id = 'payment';
        $sepa->save();

        foreach ($this->invoices as $invoice){
            $invoice->sepa_id = $sepa->id;
            $invoice->date_paid = Carbon::now()->addWeek();
            $invoice->save();
        }

        return $sepa;
    }

    /**
     * @param Sepa $sepa
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadSepa(Sepa $sepa){

        $filePath = Storage::disk('administrations')->getDriver()
            ->getAdapter()->applyPathPrefix($sepa->filename);
        header('X-Filename:' . $sepa->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $sepa->name, ['Content-Type: application/xml']);
    }

    /**
     *
     */
    public function checkStorageDir(){
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')->getDriver()->getAdapter()->getPathPrefix() . DIRECTORY_SEPARATOR . 'administration_' . $this->administration->id . DIRECTORY_SEPARATOR . 'sepas';

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }
}