<?php

namespace Tests\Feature;

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Intake\Intake;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\Order\OrderProduct;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Product\PriceHistory;
use App\Eco\Product\Product;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\ProductionProject\ProductionProjectRevenue;
use App\Eco\ProductionProject\ProductionProjectRevenueDistribution;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\User\User;
use App\Helpers\Template\TemplateVariableHelper;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class TemplateMergeFieldsTest extends TestCase
{
    public function setUp(){

        parent::setUp();
        $this->artisan('migrate:fresh');
        $this->be(User::find(1));
        $this->insertData();
    }

    /**
     * Main test calling mergable models.
     *
     * @return void
     */
    public function testMergeFields()
    {
        $this->assertContactMergeFields();
        $this->assertUserMergeFields();
        $this->assertProductionProjectMergeFields();
        $this->assertParticipantProductionProjectMergeFields();
        $this->assertProductionProjectRevenueMergeFields();
        $this->assertProductionProjectRevenueDistributionMergeFields();
        $this->assertQuotationRequestMergeFields();
        $this->assertOrderMergeFields();
    }

    public function assertContactMergeFields()
    {
        $html ='{contact_titel}{contact_naam}{testjes}{contact_voornaam}{contact_achternaam}{onzin}{contact_adres}{contact_postcode}{contact_plaats}{contact_telefoonnummer}{contact_energieleverancier}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', Contact::find(1));
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        $expectedHtml = 'MevrKlaas de VaakKlaasde VaakDorpstraat 81693KWWervershoof0612345678=om';

        $this->assertEquals($expectedHtml, $html);
    }

    public function assertUserMergeFields()
    {
        $html ='{user_voornaam}{user_achternaam}{user_telefoon}{user_email}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'user', User::find(2));

        $expectedHtml = 'Pietde Rood0687654321piet.rood@email.com';

        $this->assertEquals($expectedHtml, $html);
    }

    public function assertProductionProjectMergeFields()
    {
        $html = '{pp_naam}{pp_omschrijving}{pp_start_project}{pp_start_productie}{pp_start_inschrijving}';
        $html .= '{pp_eind_inschrijving}{pp_postcode}{pp_adres}{pp_plaats}{pp_ean}{pp_ean_netbeheer}';
        $html .= '{pp_garantie_oorsprong}{pp_ean_levering}{pp_participatie_waarde}{pp_opgesteld_vermogen}{pp_max_participaties}';
        $html .= '{pp_aanwijzing_belastingsdienst}{pp_max_participaties_jeugd}{pp_min_participaties}{pp_uitgegeven_participaties}';
        $html .= '{pp_participaties_in_optie}{pp_uit_te_geven_participaties}{pp_aantal_participanten}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'pp', ProductionProject::find(1));

        $expectedHtml = 'Project 1Omschrijving03/03/201804/03/201805/03/2018';
        $expectedHtml .= '06/03/20181693KWDorpstraat 10Andijk12341235';
        $expectedHtml .= 'Garantie nummer 12312360101102';
        $expectedHtml .= 'Belasting1103104';
        $expectedHtml .= '10-11';

        $this->assertEquals($expectedHtml, $html);
    }

    public function assertParticipantProductionProjectMergeFields()
    {
        $html = '{ppp_contact_naam}{ppp_status}{ppp_productie_project}{ppp_inschrijf_datum}{ppp_aangevraagd}{ppp_toegekend}';
        $html .= '{ppp_verkocht}{ppp_huidig}{ppp_waarde_totaal}{ppp_restverkoop}{ppp_contract_verstuurd}{ppp_contract_retour}';
        $html .= '{ppp_betaald_op}{ppp_iban_betaald}{ppp_akkoord_reglement}{ppp_iban_tnv}{ppp_geschonken_door}';
        $html .= '{ppp_wettelijke_vertegenwoordiger}{ppp_iban_uitkeren}{ppp_iban_uitkeren_tnv}{ppp_einddatum}{ppp_uitkeren_op}';


        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'ppp', ParticipantProductionProject::find(1));

        $expectedHtml = 'Vaak, Klaas deDefinitiefProject 107/03/2018109';
        $expectedHtml .= '810706/03/201805/03/2018';
        $expectedHtml .= '04/03/2018iban123Neeiban1234Vaak, Klaas deVaak, Klaas de';
        $expectedHtml .= 'iban12345Pietje03/03/2018Bijschrijven';

        $this->assertEquals($expectedHtml, $html);
    }

    public function assertProductionProjectRevenueMergeFields(){

        $html = '{r_kwh_start}{r_kwh_eind}{r_datum_uitgekeerd}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'r', ProductionProjectRevenue::find(1));

        $expectedHtml = '1000200016/03/2018';

        $this->assertEquals($expectedHtml, $html);

    }

    public function assertProductionProjectRevenueDistributionMergeFields(){

        $html = '{d_adres}{d_postcode}{d_woonplaats}{d_status}{d_participaties}{d_bedrag}{d_uitkeren_op}';
        $html .= '{d_datum_uitkeren}{d_energieleverancier}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'd', ProductionProjectRevenueDistribution::find(1));

        $expectedHtml = 'talud 91239 LMOnderdijkdbstatus151523Rekening';
        $expectedHtml .= '17/03/2018Eneco';

        $this->assertEquals($expectedHtml, $html);
    }

    public function assertQuotationRequestMergeFields()
    {
        $html ='{offerteverzoek_organisatie_naam} {offerteverzoek_organisatie_adres} {offerteverzoek_organisatie_plaats} {offerteverzoek_organisatie_email}';
        $html .='{offerteverzoek_organisatie_telefoonnummer} {offerteverzoek_organisatie_primair_contact} {offerteverzoek_organisatie_primair_contact_voornaam} {offerteverzoek_organisatie_primair_contact_achternaam} {offerteverzoek_contact_naam}';
        $html .='{offerteverzoek_contact_email} {offerteverzoek_contact_woonplaats} {offerteverzoek_contact_adres} {offerteverzoek_contact_postcode}';
        $html .='{offerteverzoek_contact_telefoonnummer} {offerteverzoek_maatregel} {offerteverzoek_tekst} {offerteverzoek_gemaakt_op} {offerteverzoek_gemaakt_door}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'offerteverzoek', QuotationRequest::find(1));
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        $expectedHtml = 'OrgaNisatie Laantje 10 Wognum OrgaNisatie@xaris.nl';
        $expectedHtml .= '0650233678 Vaak, Klaas de Klaas de Vaak Vaak, Klaas de';
        $expectedHtml .= 'klaasV@xaris.nl Wervershoof Dorpstraat 8 1693KW';
        $expectedHtml .= '0612345678 Gevelisolatie OfferteText 22/03/2018 Xaris, Admin';

        $this->assertEquals($expectedHtml, $html);
    }

    public function assertOrderMergeFields()
    {
        $html ='{order_nummer}{order_onderwerp}{order_iban}{order_prijs}{order_prijs_per_jaar}{order_datum_aangevraagd}{order_datum_start}{order_datum_eind}';
        $html .='{order_gemaakt_op}{order_status}{order_betaalwijze}{order_incasso_frequentie}{order_contact_naam}{order_contact_voornaam}{order_contact_achternaam}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'order', Order::find(1));
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        $expectedHtml = 'O2018-1Leuke order super!IBN1235.724942.8802/05/201803/05/201804/05/2018';
        $expectedHtml .= Carbon::parse(Carbon::today())->format('d/m/Y') . 'ConceptIncassoJaarlijksKlaas de VaakKlaasde Vaak';

        $this->assertEquals($expectedHtml, $html);
    }

    public function insertData(){
        $this->insertContact();
        $this->insertUser();
        $this->insertProductionProject();
        $this->insertParticipantProductionProject();
        $this->insertProductionProjectRevenue();
        $this->insertProductionProjectRevenueDistribution();
        $this->insertQuotationRequest();
        $this->insertOrder();
    }

    public function insertContact(){

        $contact = new Contact();
        $contact->type_id = 'person';
        $contact->save();

        $person = new Person();
        $person->contact_id = 1;
        $person->title_id = 2;
        $person->last_name_prefix_id = 2;
        $person->first_name = 'Klaas';
        $person->last_name = 'Vaak';
        $person->save();

        $address = new Address();
        $address->contact_id = 1;
        $address->primary = true;
        $address->street = 'Dorpstraat';
        $address->number = 8;
        $address->postal_code = '1693KW';
        $address->city = 'Wervershoof';
        $address->save();

        $phoneNumber = new PhoneNumber();
        $phoneNumber->contact_id = 1;
        $phoneNumber->primary = true;
        $phoneNumber->number = '0612345678';
        $phoneNumber->save();

        $email = new EmailAddress();
        $email->contact_id = 1;
        $email->primary = true;
        $email->email = 'klaasV@xaris.nl';
        $email->save();

        $contactEnergySupplier = new ContactEnergySupplier();
        $contactEnergySupplier->contact_id = 1;
        $contactEnergySupplier->energy_supplier_id = 1;
        $contactEnergySupplier->created_by_id = 1;
        $contactEnergySupplier->is_current_supplier = true;
        $contactEnergySupplier->contact_energy_supply_type_id = 1;
        $contactEnergySupplier->save();
    }

    public function insertUser(){
        $user = new User();
        $user->first_name = 'Piet';
        $user->title_id = 2;
        $user->last_name_prefix_id = 2;
        $user->last_name = 'Rood';
        $user->phone_number = '0687654321';
        $user->email = 'piet.rood@email.com';
        $user->password = 'NVT';
        $user->alfresco_password = 'NVT';
        $user->save();
    }


    public function insertProductionProject(){
        $productionProject = new ProductionProject();
        $productionProject->name = 'Project 1';
        $productionProject->code = 'PJT 1';
        $productionProject->description = 'Omschrijving';
        $productionProject->date_start = '2018-03-03';
        $productionProject->date_production = '2018-03-04';
        $productionProject->date_start_registrations = '2018-03-05';
        $productionProject->date_end_registrations = '2018-03-06';
        $productionProject->postal_code = '1693KW';
        $productionProject->address = 'Dorpstraat 10';
        $productionProject->city = 'Andijk';
        $productionProject->ean = '1234';
        $productionProject->ean_manager = '1235';
        $productionProject->warranty_origin = 'Garantie nummer 123';
        $productionProject->ean_supply = '1236';
        $productionProject->participation_worth = '100';
        $productionProject->power_kw_available = '101';
        $productionProject->max_participations = '102';
        $productionProject->tax_referral = 'Belasting1';
        $productionProject->max_participations_youth = '103';
        $productionProject->min_participations = '104';
        $productionProject->owned_by_id = 1;
        $productionProject->participation_worth = 0;
        $productionProject->save();
    }

    public function insertParticipantProductionProject(){
        $participant = new ParticipantProductionProject();
        $participant->contact_id = 1;
        $participant->status_id = 2;
        $participant->production_project_id = 1;
        $participant->date_register = '2018-03-07';
        $participant->participations_requested = 10;
        $participant->participations_granted = 9;
        $participant->participations_sold = 8;
        $participant->participations_rest_sale = 7;
        $participant->date_contract_send = '2018-03-06';
        $participant->date_contract_retour = '2018-03-05';
        $participant->date_payed = '2018-03-04';
        $participant->iban_payed = 'iban123';
        $participant->iban_attn = 'iban1234';
        $participant->gifted_by_contact_id = 1;
        $participant->legal_rep_contact_id = 1;
        $participant->iban_payout = 'iban12345';
        $participant->iban_payout_attn = 'Pietje';
        $participant->date_end = '2018-03-03';
        $participant->type_id = 2;
        $participant->save();
    }

    public function insertProductionProjectRevenue(){
        $revenue = new ProductionProjectRevenue();
        $revenue->category_id = 1;
        $revenue->production_project_id = 1;
        $revenue->confirmed = true;
        $revenue->date_begin = '2018-03-13';
        $revenue->date_end = '2018-03-14';
        $revenue->date_entry = '2018-03-15';
        $revenue->kwh_start = 1000;
        $revenue->kwh_end = 2000;
        $revenue->date_payed = '2018-03-16';
        $revenue->created_by_id = 1;
        $revenue->save();
    }

    public function insertProductionProjectRevenueDistribution()
    {
        $distribution = new ProductionProjectRevenueDistribution();
        $distribution->revenue_id = 1;
        $distribution->contact_id = 1;
        $distribution->address = 'talud 9';
        $distribution->postal_code = '1239 LM';
        $distribution->city = 'Onderdijk';
        $distribution->status = 'dbstatus';
        $distribution->participations_amount = 15;
        $distribution->payout = 1523;
        $distribution->payout_type = 'Rekening';
        $distribution->date_payout = '2018-03-17';
        $distribution->energy_supplier_name = 'Eneco';
        $distribution->save();
    }

    public function insertQuotationRequest(){

        $contact = new Contact();
        $contact->type_id = 'organisation';
        $contact->save();

        $organisation = new Organisation();
        $organisation->contact_id = 2;
        $organisation->name = 'OrgaNisatie';
        $organisation->website = 'organisatie.nl';
        $organisation->chamber_of_commerce_number = 312321;
        $organisation->vat_number = 312423423321;
        $organisation->square_meters = 312;
        $organisation->save();

        $address = new Address();
        $address->contact_id = 2;
        $address->primary = true;
        $address->street = 'Laantje';
        $address->number = 10;
        $address->postal_code = '1643KW';
        $address->city = 'Wognum';
        $address->save();

        $phoneNumber = new PhoneNumber();
        $phoneNumber->contact_id = 2;
        $phoneNumber->primary = true;
        $phoneNumber->number = '0650233678';
        $phoneNumber->save();

        $email = new EmailAddress();
        $email->contact_id = 2;
        $email->primary = true;
        $email->email = 'OrgaNisatie@xaris.nl';
        $email->save();

        $int = new Intake();
        $int->contact_id = 1;
        $int->note = 'Intake 1';
        $int->created_by_id = 1;
        $int->updated_by_id = 1;
        $int->save();

        $opp = new Opportunity();
        $opp->measure_category_id = 2;
        $opp->intake_id = 1;
        $opp->number = 'O2018-1';
        $opp->status_id = 1;
        $opp->save();

        $op = new OccupationContact();
        $op->occupation_id = 1;
        $op->primary_contact_id = 2;
        $op->contact_id = 1;
        $op->primary = 1;
        $op->save();

        $qr = new QuotationRequest();
        $qr->organisation_id = 1;
        $qr->opportunity_id = 1;
        $qr->status_id = 1;
        $qr->quotation_text = 'OfferteText';
        $qr->created_by_id = 1;
        $qr->updated_by_id = 1;
        $qr->created_at = '2018-03-22';
        $qr->save();
    }

    public function insertOrder(){

        $ad = new Administration();
        $ad->name = 'test administratie';
        $ad->administration_number = 1445;
        $ad->btw_number = '1233123123';
        $ad->IBAN = 'CH3608387000001080173';
        $ad->created_by_id = 1;
        $ad->save();

        $pr = new Product();
        $pr->code = "TST";
        $pr->name = "Testje productje";
        $pr->administration_id = $ad->id;
        $pr->invoice_frequency_id = 'quarterly';
        $pr->created_by_id = 1;
        $pr->save();

        $ph = new PriceHistory();
        $ph->product_id = $pr->id;
        $ph->date_start = '2018-05-01';
        $ph->price = 100;
        $ph->vat_percentage = 21;
        $ph->save();

        $or = new Order();
        $or->contact_id = 1;
        $or->administration_id = $ad->id;
        $or->status_id = 'concept';
        $or->subject = 'Leuke order super!';
        $or->payment_type_id = 'collection';
        $or->IBAN = 'IBN';
        $or->date_requested = '2018-05-02';
        $or->date_start = '2018-05-03';
        $or->date_end = '2018-05-04';
        $or->created_by_id = 1;
        $or->collection_frequency_id = 'yearly';
        $or->save();

        $op = new OrderProduct();
        $op->product_id = $pr->id;
        $op->order_id = $or->id;
        $op->amount = 12;
        $op->amount_reduction = 13;
        $op->percentage_reduction = 14;
        $op->date_start = '2018-01-01';
        $op->date_end = '2020-01-01';
        $op->description = 'Niet gratis';
        $op->save();
    }
}
