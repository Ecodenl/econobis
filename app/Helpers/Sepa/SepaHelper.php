<?php
/**
 * Created by PhpStorm.
 * User: Rob Rollenberg
 * Date: 14-6-2018
 * Time: 11:40
 */

namespace App\Helpers\Sepa;

use App\Eco\Administration\Administration;
use App\Eco\Invoice\Invoice;

class SepaHelper
{
    private $administration = '';

    public function __construct(Administration $administration)
    {
        $this->administration = $administration;
    }

    public function generateSepaFile()
    {
        // Get invoices with status 'sent' and 'incasso' from administration
        $invoices = Invoice::where('administration_id', $this->administration->id)->where('status_id', 'sent')->where('payment_type_id','collection')->get();
        $invoices->load(['order.contact']);

        return $this->createXml($invoices);


    }

    private function processData($invoices)
    {
        foreach($invoices as $invoice) {
            checkInvoice($invoice);
        }
    }

    // Check invoices en create array for SEPA
    private function checkInvoice($invoice)
    {
        return $invoice;
    }

    // Make Xml file
    private function createXml($invoices)
    {
        $xml = '';

        $xml .= "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
        $xml .= "\n<Document xmlns=\"urn:iso:std:iso:20022:tech:xsd:pain.008.001.02\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">";
        $xml .= "\n\t<CstmrDrctDbtInitn>";

        // GroupHeader
        $xml .= "\n\t\t<GrpHdr>";
        $xml .= "\n\t\t\t<MsgId>" . date("Ymd") . $batchnummer . "</MsgId>"; // Uniek nummer - Datum + Batchnummer
        $xml .= "\n\t\t\t<CreDtTm>" . date("c") . "</CreDtTm>"; // Aanmaakdatum van bestand > 2012-12-01T13:00:00 (ISO Time)
        $xml .= "\n\t\t\t<NbOfTxs>" . count($arrIncasso) . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totaalOpenstaand . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)
        $xml .= "\n\t\t\t<InitgPty>";
        $xml .= "\n\t\t\t\t<Nm>Xaris</Nm>"; // Naam van opdrachtgever
        $xml .= "\n\t\t\t</InitgPty>";
        $xml .= "\n\t\t</GrpHdr>";

        // Payment Information
        $xml .= "\n\t\t<PmtInf>";
        $xml .= "\n\t\t\t<PmtInfId>" . date("Ymd") . $batchnummer . "</PmtInfId>"; // Referentienummer
        $xml .= "\n\t\t\t<PmtMtd>DD</PmtMtd>"; // DD - Vaste waarde voor incasso
        $xml .= "\n\t\t\t<BtchBookg>false</BtchBookg>"; // true=dan worden de transacties binnen een batch als ��n betaling verwerkt, false = dan worden de transacties binnen een batch als individuele opdrachten in ��n bulkopdracht verwerkt
        $xml .= "\n\t\t\t<NbOfTxs>" . count($arrIncasso) . "</NbOfTxs>"; // Aantal opdrachten in dit bestand
        $xml .= "\n\t\t\t<CtrlSum>" . $totaalOpenstaand . "</CtrlSum>"; // Totaalbedrag van alle opdrachten (punt als decimal teken)

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

        $xml .= "\n\t\t\t<ReqdColltnDt>" . $datumVerwerken . "</ReqdColltnDt>"; // Gewenste uitvoerdatum

        $xml .= "\n\t\t\t<Cdtr>"; // Crediteur
        $xml .= "\n\t\t\t\t<Nm>Xaris</Nm>"; // Naam crediteur
        $xml .= "\n\t\t\t</Cdtr>";

        /// Creditor Account
        $xml .= "\n\t\t\t<CdtrAcct>";
        $xml .= "\n\t\t\t\t<Id>";
        $xml .= "\n\t\t\t\t\t<IBAN>" . r(" ", "", $eigenaarInformatie['egn_sepa_iban']) . "</IBAN>"; // IBAN nummer opdrachtgever, spaties zijn in dit veld niet toegestaan
        $xml .= "\n\t\t\t\t</Id>";
        $xml .= "\n\t\t\t</CdtrAcct>";

        /// Creditor Agent
        $xml .= "\n\t\t\t<CdtrAgt>";
        $xml .= "\n\t\t\t\t<FinInstnId>";
        $xml .= "\n\t\t\t\t\t<BIC>" .  r(" ", "", $eigenaarInformatie['egn_sepa_bic']) . "</BIC>"; // SWIFT/BIC code van bank opdrachtgever, spaties zijn in dit veld niet toegestaan
        $xml .= "\n\t\t\t\t</FinInstnId>";
        $xml .= "\n\t\t\t</CdtrAgt>";

        $xml .= "\n\t\t\t<ChrgBr>SLEV</ChrgBr>"; // SLEV - Vaste waarde

        /// Creditor Scheme Identification
        $xml .= "\n\t\t\t<CdtrSchmeId>";
        $xml .= "\n\t\t\t\t<Id>";
        $xml .= "\n\t\t\t\t\t<PrvtId>";
        $xml .= "\n\t\t\t\t\t\t<Othr>";
        $xml .= "\n\t\t\t\t\t\t\t<Id>" . $eigenaarInformatie['egn_sepa_creditor_identifier'] . "</Id>"; // Geen idee, zie bijlage B - dit is het Incassant ID volgens mij ton
        $xml .= "\n\t\t\t\t\t\t\t<SchmeNm>";
        $xml .= "\n\t\t\t\t\t\t\t\t<Prtry>SEPA</Prtry>"; // SEPA - Vaste waarde
        $xml .= "\n\t\t\t\t\t\t\t</SchmeNm>";
        $xml .= "\n\t\t\t\t\t\t</Othr>";
        $xml .= "\n\t\t\t\t\t</PrvtId>";
        $xml .= "\n\t\t\t\t</Id>";
        $xml .= "\n\t\t\t</CdtrSchmeId>";

        // Transacties
        foreach($arrIncasso AS $f){
            $xml .= "\n\t\t\t<DrctDbtTxInf>";
            // Payment Identification
            $xml .= "\n\t\t\t\t<PmtId>";
            $xml .= "\n\t\t\t\t\t<EndToEndId>" . $f['factuurnummer'] . "</EndToEndId>"; // Uniek nummer, wordt niet naar klant doorgegeven
            $xml .= "\n\t\t\t\t</PmtId>";

            $xml .= "\n\t\t\t\t<InstdAmt Ccy=\"EUR\">" . $f['bedrag'] . "</InstdAmt>"; // Bedrag incl BTW

            // Direct Debit Transaction
            $xml .= "\n\t\t\t\t<DrctDbtTx>";
            $xml .= "\n\t\t\t\t\t<MndtRltdInf>";
            $xml .= "\n\t\t\t\t\t\t<MndtId>" . $f['debiteurnummer']  . "</MndtId>"; // Uniek nummer per klant, debiteurnummer
            $xml .= "\n\t\t\t\t\t\t<DtOfSgntr>" .  $f['auto_incasso_datum_akkoord'] . "</DtOfSgntr>"; // Bestande klanten 1-1-20009, bij nieuwe klanten de datum van aanmaak klant of aanvinken van autoincasso
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
            $xml .= "\n\t\t\t\t\t<Nm>" . $f['bedrijf'] . "</Nm>"; // Naam van geincasseerde
            $xml .= "\n\t\t\t\t</Dbtr>";

            // Debtor Account
            $xml .= "\n\t\t\t\t<DbtrAcct>";
            $xml .= "\n\t\t\t\t\t<Id>";
            $xml .= "\n\t\t\t\t\t\t<IBAN>" . r(" ", "", $f['rekeningnummer']) . "</IBAN>"; // IBAN nummer van geincasseerde
            $xml .= "\n\t\t\t\t\t</Id>";
            $xml .= "\n\t\t\t\t</DbtrAcct>";

            // Remittance Information
            $xml .= "\n\t\t\t\t<RmtInf>";
            $xml .= "\n\t\t\t\t\t<Ustrd>Factuurnummer " . $f['factuurnummer'] . "</Ustrd>"; // Unstructured (voorkeur in NL)
            $xml .= "\n\t\t\t\t</RmtInf>";
            $xml .= "\n\t\t\t</DrctDbtTxInf>";
        }

        $xml .= "\n\t\t</PmtInf>";
        $xml .= "\n\t</CstmrDrctDbtInitn>";
        $xml .= "\n</Document>";
        dd($xml);
        return $xml;
    }



    // Save SEPA file



}