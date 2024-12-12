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
class SepaHelper
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

    /**
     *
     * @return string - the XML
     */
    private function createXml()
    {

        $batchNumber = Sepa::where('administration_id', $this->administration->id)->count();
        $dateCollection = false;
        $totalOpen = 0;
        $amountOfInvoices = $this->invoices->count();



        foreach($this->invoices as $invoice){
            $totalOpen += $invoice->amount_open;

            if(!$dateCollection){
                $dateCollection = Carbon::parse($invoice->date_collection)->format('Y-m-d');
            }

            if($invoice->amount_open <= 0){
                $amountOfInvoices--;
            }
        }
        $totalOpen = floatval(number_format(($totalOpen), 2, '.', ''));

        if(!$dateCollection){
            $dateCollection = Carbon::now()->nextWeekday()->format('Y-m-d');
        }

        $xml = '';

        $xml .= "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
        $xml .= "\n<Document xmlns=\"urn:iso:std:iso:20022:tech:xsd:pain.008.001.02\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">";
        $xml .= "\n\t<CstmrDrctDbtInitn>";

        // GroupHeader
        $xml .= "\n\t\t<GrpHdr>";
        $xml .= "\n\t\t\t<MsgId>" . Carbon::now()->format('Ymd') . $batchNumber . "</MsgId>"; // Uniek nummer - Datum + Batchnummer
        $xml .= "\n\t\t\t<CreDtTm>" . Carbon::now()->format('c') . "</CreDtTm>"; // Aanmaakdatum van bestand > 2012-12-01T13:00:00 (ISO Time)
        $xml .= "\n\t\t\t<NbOfTxs>" . $amountOfInvoices . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totalOpen . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)
        $xml .= "\n\t\t\t<InitgPty>";
        $xml .= "\n\t\t\t\t<Nm>" . $this->translateToValidCharacterSet($this->administration->name) . "</Nm>"; // Naam van opdrachtgever
        $xml .= "\n\t\t\t</InitgPty>";
        $xml .= "\n\t\t</GrpHdr>";

        // Payment Information
        $xml .= "\n\t\t<PmtInf>";
        $xml .= "\n\t\t\t<PmtInfId>" . Carbon::now()->format('Ymd') . $batchNumber . "</PmtInfId>"; // Referentienummer
        $xml .= "\n\t\t\t<PmtMtd>DD</PmtMtd>"; // DD - Vaste waarde voor incasso
        $xml .= "\n\t\t\t<BtchBookg>false</BtchBookg>"; // true=dan worden de transacties binnen een batch als ��n betaling verwerkt, false = dan worden de transacties binnen een batch als individuele opdrachten in ��n bulkopdracht verwerkt
        $xml .= "\n\t\t\t<NbOfTxs>" . $amountOfInvoices . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totalOpen . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)

        /// Payment Type Information
        $xml .= "\n\t\t\t<PmtTpInf>";
        $xml .= "\n\t\t\t\t<SvcLvl>";
        $xml .= "\n\t\t\t\t\t<Cd>SEPA</Cd>"; // SEPA - Vaste code
        $xml .= "\n\t\t\t\t</SvcLvl>";
        $xml .= "\n\t\t\t\t<LclInstrm>";
        $xml .= "\n\t\t\t\t\t<Cd>CORE</Cd>"; // CORE/B2B - Vaste waarde CORE voor euro incasso, B2B voor bedrijven incasso
        $xml .= "\n\t\t\t\t</LclInstrm>";
        $xml .= "\n\t\t\t\t<SeqTp>RCUR</SeqTp>"; // First is nu ook RCUR (vervolgincasso)
        $xml .= "\n\t\t\t</PmtTpInf>";

        $xml .= "\n\t\t\t<ReqdColltnDt>" . $dateCollection . "</ReqdColltnDt>"; // Gewenste uitvoerdatum

        $xml .= "\n\t\t\t<Cdtr>"; // Crediteur
        $xml .= "\n\t\t\t\t<Nm>" . $this->translateToValidCharacterSet($this->administration->name) . "</Nm>"; // Naam crediteur
        $xml .= "\n\t\t\t</Cdtr>";

        /// Creditor Account
        $xml .= "\n\t\t\t<CdtrAcct>";
        $xml .= "\n\t\t\t\t<Id>";
        $xml .= "\n\t\t\t\t\t<IBAN>" . str_replace(" ", "", $this->administration->IBAN) . "</IBAN>"; // IBAN nummer opdrachtgever, spaties zijn in dit veld niet toegestaan
        $xml .= "\n\t\t\t\t</Id>";
        $xml .= "\n\t\t\t</CdtrAcct>";

        /// Creditor Agent
        $xml .= "\n\t\t\t<CdtrAgt>";
        $xml .= "\n\t\t\t\t<FinInstnId>";
        $xml .= "\n\t\t\t\t\t<BIC>" .  str_replace(" ", "", $this->administration->bic) . "</BIC>"; // SWIFT/BIC code van bank opdrachtgever, spaties zijn in dit veld niet toegestaan
        $xml .= "\n\t\t\t\t</FinInstnId>";
        $xml .= "\n\t\t\t</CdtrAgt>";

        $xml .= "\n\t\t\t<ChrgBr>SLEV</ChrgBr>"; // SLEV - Vaste waarde

        /// Creditor Scheme Identification
        $xml .= "\n\t\t\t<CdtrSchmeId>";
        $xml .= "\n\t\t\t\t<Id>";
        $xml .= "\n\t\t\t\t\t<PrvtId>";
        $xml .= "\n\t\t\t\t\t\t<Othr>";
        $xml .= "\n\t\t\t\t\t\t\t<Id>" . $this->administration->sepa_creditor_id . "</Id>"; // Geen idee, zie bijlage B - dit is het Incassant ID volgens mij ton
        $xml .= "\n\t\t\t\t\t\t\t<SchmeNm>";
        $xml .= "\n\t\t\t\t\t\t\t\t<Prtry>SEPA</Prtry>"; // SEPA - Vaste waarde
        $xml .= "\n\t\t\t\t\t\t\t</SchmeNm>";
        $xml .= "\n\t\t\t\t\t\t</Othr>";
        $xml .= "\n\t\t\t\t\t</PrvtId>";
        $xml .= "\n\t\t\t\t</Id>";
        $xml .= "\n\t\t\t</CdtrSchmeId>";

        // Transacties
        foreach($this->invoices AS $invoice){

            $iban = $invoice->order->contact->iban;
            $iban_attn = $invoice->order->contact->iban_attn;
            if(!$iban_attn){
                $iban_attn = $invoice->order->contact->full_name;
            }

            if($invoice->amount_open <=0 ){
                continue;
            }

            $xml .= "\n\t\t\t<DrctDbtTxInf>";
            // Payment Identification
            $xml .= "\n\t\t\t\t<PmtId>";
            $xml .= "\n\t\t\t\t\t<EndToEndId>" . $invoice->number . "</EndToEndId>"; // Uniek nummer, wordt niet naar klant doorgegeven
            $xml .= "\n\t\t\t\t</PmtId>";

            $xml .= "\n\t\t\t\t<InstdAmt Ccy=\"EUR\">" . $invoice->amount_open . "</InstdAmt>"; // Bedrag incl BTW

            // Direct Debit Transaction
            $xml .= "\n\t\t\t\t<DrctDbtTx>";
            $xml .= "\n\t\t\t\t\t<MndtRltdInf>";
            $xml .= "\n\t\t\t\t\t\t<MndtId>" . $invoice->order->contact->collect_mandate_code  . "</MndtId>"; // Uniek nummer per klant, debiteurnummer
            $xml .= "\n\t\t\t\t\t\t<DtOfSgntr>" .  $invoice->order->contact->collect_mandate_signature_date . "</DtOfSgntr>"; // Mandaat ondertekening
            $xml .= "\n\t\t\t\t\t</MndtRltdInf>";
            $xml .= "\n\t\t\t\t</DrctDbtTx>";

            // Debtor Agent
            $xml .= "\n\t\t\t\t<DbtrAgt>";
            $xml .= "\n\t\t\t\t\t<FinInstnId>";
            //$xml .= "\n\t\t\t\t\t\t<BIC>...</BIC>"; // Swiftcode van de bank van geincasseerde, mag weggelaten worden
            $xml .= "\n\t\t\t\t\t</FinInstnId>";
            $xml .= "\n\t\t\t\t</DbtrAgt>";

            // Debtor
            $xml .= "\n\t\t\t\t<Dbtr>";
            $xml .= "\n\t\t\t\t\t<Nm>" . $this->translateToValidCharacterSet($iban_attn) . "</Nm>"; // Naam van geincasseerde
            $xml .= "\n\t\t\t\t</Dbtr>";

            // Debtor Account
            $xml .= "\n\t\t\t\t<DbtrAcct>";
            $xml .= "\n\t\t\t\t\t<Id>";
            $xml .= "\n\t\t\t\t\t\t<IBAN>" . str_replace(' ', '', $iban) . "</IBAN>"; // IBAN nummer van geincasseerde
            $xml .= "\n\t\t\t\t\t</Id>";
            $xml .= "\n\t\t\t\t</DbtrAcct>";

            // Remittance Information
            $xml .= "\n\t\t\t\t<RmtInf>";
            $xml .= "\n\t\t\t\t\t<Ustrd>Notanummer " . $invoice->number . "</Ustrd>"; // Unstructured (voorkeur in NL)
            $xml .= "\n\t\t\t\t</RmtInf>";
            $xml .= "\n\t\t\t</DrctDbtTxInf>";
        }

        $xml .= "\n\t\t</PmtInf>";
        $xml .= "\n\t</CstmrDrctDbtInitn>";
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

        $sepa = new Sepa();
        $sepa->administration_id = $this->administration->id;
        $sepa->sepa_type_id = 'credit';
        $sepa->filename = '';
        $sepa->name = '';
        $sepa->save();

        $name = 'incasso-sepa-' . $sepa->id .  '-' . Carbon::now()->format('Ymdhi') . '.xml';
        $path = 'administration_' . $this->administration->id
            . DIRECTORY_SEPARATOR . 'sepas' . DIRECTORY_SEPARATOR . $name;
        Storage::put('administrations/' . $path, $xml);

        $sepa->filename = $path;
        $sepa->name = $name;
        $sepa->save();

        foreach ($this->invoices as $invoice){
            $invoice->sepa_id = $sepa->id;
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

        $filePath = Storage::disk('administration-logos')
            ->path($sepa->filename);
        header('X-Filename:' . $sepa->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $sepa->name, ['Content-Type: application/xml']);
    }

    /**
     *
     */
    public function checkStorageDir(){
        //Check if storage map exists
        $storageDir = Storage::disk('administrations')
            ->path(DIRECTORY_SEPARATOR . 'administration_' . $this->administration->id . DIRECTORY_SEPARATOR . 'sepas');

        if (!is_dir($storageDir)) {
            mkdir($storageDir, 0777, true);
        }
    }

    protected function translateToValidCharacterSet($field){

        $fieldUtf8Decoded = mb_convert_encoding($field, 'ISO-8859-1', 'UTF-8');
        $replaceFrom = mb_convert_encoding('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ', 'ISO-8859-1', 'UTF-8');
        $replaceTo = mb_convert_encoding('AAAAAAACEEEEIIIIDNOOOOOOUUUUYsaaaaaaaceeeeiiiionoooooouuuuyy', 'ISO-8859-1', 'UTF-8');
        $field = strtr( $fieldUtf8Decoded, $replaceFrom, $replaceTo );
        $field = preg_replace('/[^A-Za-z0-9 -]/', '', $field);

        return $field;
    }
}