<?php

namespace Tests\Feature;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\User\User;
use App\Helpers\Template\TemplateVariableHelper;
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
    }

    public function assertContactMergeFields()
    {
        $html ='{contact_titel}{contact_naam}{testjes}{contact_voornaam}{contact_achternaam}{onzin}{contact_adres}{contact_postcode}{contact_plaats}{contact_telefoonnummer}';

        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', Contact::find(1));
        $html = TemplateVariableHelper::stripRemainingVariableTags($html);

        $expectedHtml = 'MevrKlaas de VaakKlaasde VaakDorpstraat 81693KWWervershoof0612345678';

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
        $html .= '{ppp_betaald_op}{ppp_iban_betaald}{ppp_akkoord_regelement}{ppp_iban_tnv}{ppp_geschonken_door}';
        $html .= '{ppp_wettelijke_vertegenwoordiger}{ppp_iban_uitkeren}{ppp_iban_uitkeren_tnv}{ppp_einddatum}{ppp_uitkeren_op}';


        $html = TemplateVariableHelper::replaceTemplateVariables($html, 'ppp', ParticipantProductionProject::find(1));

        $expectedHtml = 'Vaak, Klaas deDefinitiefProject 107/03/2018109';
        $expectedHtml .= '810706/03/201805/03/2018';
        $expectedHtml .= '04/03/2018iban123Neeiban1234Vaak, Klaas deVaak, Klaas de';
        $expectedHtml .= 'iban12345Pietje03/03/2018Bijschrijven';

        $this->assertEquals($expectedHtml, $html);
    }

    public function insertData(){
        $this->insertContact();
        $this->insertUser();
        $this->insertProductionProject();
        $this->insertParticipantProductionProject();
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
        $productionProject->power_kwh_available = '101';
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
}
