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
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\ProjectRevenueCategory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * Class SepaPaymentHelper
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
     * SepaPaymentHelper constructor.
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

       $this->createParticipantMutations();
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
            $totalOpen += $invoice->revenueDistribution->payout;
        }
        $totalOpen = floatval(number_format(($totalOpen), 2, '.', ''));

        $xml = '';

        $xml .= "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
        $xml .= "\n<Document xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"urn:iso:std:iso:20022:tech:xsd:pain.001.001.03\">";
        $xml .= "\n\t<CstmrCdtTrfInitn>";

        // GroupHeader
        $xml .= "\n\t\t<GrpHdr>";
        $xml .= "\n\t\t\t<MsgId>" . Carbon::now()->format('Ymd') . $batchNumber . "</MsgId>"; // Uniek nummer - Datum + Batchnummer
        $xml .= "\n\t\t\t<CreDtTm>" . Carbon::now()->format('c') . "</CreDtTm>"; // Aanmaakdatum van bestand > 2012-12-01T13:00:00 (ISO Time)
        $xml .= "\n\t\t\t<NbOfTxs>" . $this->invoices->count() . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totalOpen . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)
        $xml .= "\n\t\t\t<InitgPty>";
        $xml .= "\n\t\t\t\t<Nm>" . $this->translateToValidCharacterSet($this->administration->name) . "</Nm>"; // Naam van opdrachtgever
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
        $xml .= "\n\t\t\t</PmtTpInf>";

        $xml .= "\n\t\t\t<ReqdExctnDt>" . Carbon::parse($invoice->revenueDistribution->date_payout)->format('Y-m-d') . "</ReqdExctnDt>"; // Gewenste uitvoerdatum

        $xml .= "\n\t\t\t<Dbtr>"; // Debiteur
        $xml .= "\n\t\t\t\t<Nm>" . $this->translateToValidCharacterSet($this->administration->name) . "</Nm>"; // Naam Debiteur
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

            $iban_attn = $invoice->revenueDistribution->participation->iban_payout_attn;
            if(!$iban_attn) {
                $iban_attn = $invoice->revenueDistribution->contact->iban_attn;
            }
            if(!$iban_attn)
            {
                $iban_attn = $invoice->revenueDistribution->contact->full_name;
            }

            if($invoice->description != "") {
                $ustrd = substr( $this->translateToValidCharacterSet($invoice->description), 0, 100 ) . " Ref. ". $invoice->number;
            } else {
                $ustrd = "Ref. ". $invoice->number;
            }

            $xml .= "\n\t\t\t<CdtTrfTxInf>";
            $xml .= "\n\t\t\t\t<PmtId>";
            $xml .= "\n\t\t\t\t\t<EndToEndId>" . $invoice->number . "</EndToEndId>";
            $xml .= "\n\t\t\t\t</PmtId>";

            $xml .= "\n\t\t\t\t<Amt>";
            $xml .= "\n\t\t\t\t\t<InstdAmt Ccy=\"EUR\">" . $invoice->revenueDistribution->payout . "</InstdAmt>"; // Bedrag incl BTW
            $xml .= "\n\t\t\t\t</Amt>";

            // Crediteur
            $xml .= "\n\t\t\t\t<Cdtr>";
            $xml .= "\n\t\t\t\t\t<Nm>" .  $this->translateToValidCharacterSet($iban_attn) . "</Nm>"; // Naam
            $xml .= "\n\t\t\t\t\t<PstlAdr>";
            $xml .= "\n\t\t\t\t\t\t<Ctry>NL</Ctry>";
            $xml .= "\n\t\t\t\t\t\t<AdrLine>" .  $this->translateToValidCharacterSet($invoice->revenueDistribution->address) . "</AdrLine>"; // Postcode
            $xml .= "\n\t\t\t\t\t\t<AdrLine>" .  $this->translateToValidCharacterSet($invoice->revenueDistribution->postal_code) . " " . $this->translateToValidCharacterSet($invoice->revenueDistribution->city) .  "</AdrLine>"; // Postcode
            $xml .= "\n\t\t\t\t\t</PstlAdr>";
            $xml .= "\n\t\t\t\t</Cdtr>";

            // Crediteur Account
            $xml .= "\n\t\t\t\t<CdtrAcct>";
            $xml .= "\n\t\t\t\t\t<Id>";
            $xml .= "\n\t\t\t\t\t\t<IBAN>" . str_replace(' ', '', $invoice->revenueDistribution->participation->iban_payout ? $invoice->revenueDistribution->participation->iban_payout : $invoice->revenueDistribution->contact->iban) . "</IBAN>"; // IBAN nummer van geincasseerde
            $xml .= "\n\t\t\t\t\t</Id>";
            $xml .= "\n\t\t\t\t</CdtrAcct>";
            //ref info
            $xml .= "\n\t\t\t\t<RmtInf>";
            $xml .= "\n\t\t\t\t\t<Ustrd>" . $ustrd . "</Ustrd>";
            $xml .= "\n\t\t\t\t</RmtInf>";
            $xml .= "\n\t\t\t</CdtTrfTxInf>";
        }

        $xml .= "\n\t\t</PmtInf>";
        $xml .= "\n\t</CstmrCdtTrfInitn>";
        $xml .= "\n</Document>";

        return $xml;
    }

    private function createParticipantMutations(){
        foreach ($this->invoices as $invoice){
            $participantMutation = new ParticipantMutation();
            $participantMutation->participation_id = $invoice->revenueDistribution->participation_id;

            if ($invoice->revenueDistribution->revenue->category_id == (ProjectRevenueCategory::where('code_ref', 'redemptionEuro')->first())->id) {
                $mutationType = ParticipantMutationType::where('code_ref', 'redemption')
                    ->where('project_type_id', $invoice->revenueDistribution->participation->project->project_type_id)
                    ->value('id');
                $status = ParticipantMutationStatus::where('code_ref', 'final')->value('id');
                $amount = $invoice->revenueDistribution->payout * -1;
                $amountFinal = $invoice->revenueDistribution->payout * -1;
                $dateEntry = $invoice->revenueDistribution->date_payout;

                $participantMutation->status_id = $status;
                $participantMutation->amount = $amount;
                $participantMutation->amount_final = $amountFinal;
                $participantMutation->date_entry = $dateEntry;

             }else{
                $mutationType = ParticipantMutationType::where('code_ref', 'result')
                    ->where('project_type_id', $invoice->revenueDistribution->participation->project->project_type_id)
                    ->value('id');
                $returns = $invoice->revenueDistribution->payout;
                $participantMutation->returns = $returns;
            }
            $participantMutation->type_id = $mutationType;
            $participantMutation->payout_kwh = $invoice->revenueDistribution->payout_kwh;
            $participantMutation->paid_on = $invoice->revenueDistribution->participation->iban_payout ? $invoice->revenueDistribution->participation->iban_payout : $invoice->revenueDistribution->contact->iban;
            $participantMutation->entry = $invoice->number;
            $participantMutation->date_payment = $invoice->revenueDistribution->date_payout;
            $participantMutation->save();

            // Recalculate dependent data in participantProject
            $participantMutation->participation->calculator()->run()->save();

            // Recalculate dependent data in project
            $participantMutation->participation->project->calculator()->run()->save();

        }
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
        $sepa->sepa_type_id = 'payment';
        $sepa->filename = '';
        $sepa->name = '';
        $sepa->save();

        $name = 'betaal-sepa-' . $sepa->id .  '-' . Carbon::now()->format('Ymdhi') . '.xml';
        $path = 'administration_' . $this->administration->id
            . DIRECTORY_SEPARATOR . 'sepas' . DIRECTORY_SEPARATOR . $name;
        Storage::put('administrations/' . $path, $xml);

        $sepa->filename = $path;
        $sepa->name = $name;
        $sepa->save();

        foreach ($this->invoices as $invoice){
            $invoice->sepa_id = $sepa->id;
            $invoice->date_paid = $invoice->revenueDistribution->date_payout;
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

        $filePath = Storage::disk('administrations')->path($sepa->filename);
        header('X-Filename:' . $sepa->name);
        header('administrationId:' . $sepa->administration_id);
        header('Access-Control-Expose-Headers: X-Filename, administrationId');
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