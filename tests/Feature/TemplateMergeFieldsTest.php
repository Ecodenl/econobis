<?php

namespace Tests\Feature;

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\User\User;
use Tests\TestCase;

class TemplateMergeFieldsTest extends TestCase
{
    public function setUp(){

        parent::setUp();
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
        //$html = TemplateVariableHelper::replaceTemplateVariables($html, 'contact', $document->contact);
        $this->assertTrue(true);
    }

    public function assertUserMergeFields()
    {
        $this->assertTrue(true);
    }

    public function assertProductionProjectMergeFields()
    {
        $this->assertTrue(true);
    }

    public function assertParticipantProductionProjectMergeFields()
    {
        $this->assertTrue(true);
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
        $address->postal_code = '1693kw';
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
