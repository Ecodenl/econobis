<?php

namespace Tests\Feature;


use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EnergySupplier\ContactEnergySupplier;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeReason;
use App\Eco\Occupation\OccupationContact;
use App\Eco\Order\Order;
use App\Eco\Order\OrderProduct;
use App\Eco\Organisation\Organisation;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Product\Product;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\Task\Task;
use App\Eco\Webform\Webform;
use Carbon\Carbon;
use Tests\TestCase;

class WebformTest extends TestCase
{

    public function setUp()
    {
        parent::setUp();
        $this->artisan('migrate:fresh');
        $this->insertData();
    }

    /** @test */
    public function it_refuses_a_request_when_no_valid_api_key_is_given()
    {
        $response = $this->json('POST', '/api/webform/external/wrong_key');
        $response->assertStatus(404);
    }

    /** @test */
    public function it_refuses_a_request_when_a_webform_is_not_active_yet()
    {
        Webform::create([
            'name' => 'Test',
            'api_key' => 'it_refuses_a_request_when_a_webform_is_not_active_yet',
            'max_requests_per_minute' => 10,
            'date_start' => Carbon::today()->addDays(1),
            'date_end' => Carbon::today()->addDays(1),
            'api_key_date' => Carbon::today(),
            'responsible_user_id' => null,
            'responsible_team_id' => null,
            'last_requests' => [],
        ]);

        $response = $this->json('POST', '/api/webform/external/it_refuses_a_request_when_a_webform_is_not_active_yet');
        $response->assertStatus(404);
    }

    /** @test */
    public function it_refuses_a_request_when_a_webform_is_not_active_anymore()
    {
        Webform::create([
            'name' => 'Test',
            'api_key' => 'it_refuses_a_request_when_a_webform_is_not_active_yet',
            'max_requests_per_minute' => 10,
            'date_start' => Carbon::today()->subDays(1),
            'date_end' => Carbon::today()->subDays(1),
            'api_key_date' => Carbon::today(),
            'responsible_user_id' => null,
            'responsible_team_id' => null,
            'last_requests' => [],
        ]);

        $response = $this->json('POST', '/api/webform/external/it_refuses_a_request_when_a_webform_is_not_active_yet');
        $response->assertStatus(404);
    }

    /** @test */
    public function it_refuses_a_request_when_to_much_requests_have_been_done()
    {
        Webform::create([
            'name' => 'Test',
            'api_key' => 'it_refuses_a_request_when_to_much_requests_have_been_done',
            'max_requests_per_minute' => 2,
            'date_start' => Carbon::today(),
            'date_end' => Carbon::today(),
            'api_key_date' => Carbon::today(),
            'responsible_user_id' => null,
            'responsible_team_id' => null,
            'last_requests' => [],
        ]);

        $response = $this->json('POST', '/api/webform/external/it_refuses_a_request_when_to_much_requests_have_been_done');
        $response->assertStatus(200);

        $response = $this->json('POST', '/api/webform/external/it_refuses_a_request_when_to_much_requests_have_been_done');
        $response->assertStatus(200);

        $response = $this->json('POST', '/api/webform/external/it_refuses_a_request_when_to_much_requests_have_been_done');
        $response->assertStatus(422);
    }

    /** @test */
    public function it_can_handle_a_request_with_all_new_data()
    {
        $response = $this->json('POST', '/api/webform/external/default', [
            'titel_id' => 1,
            'voorletters' => 'Xrs',
            'voornaam' => 'Xa',
            'tussenvoegsel' => 'van',
            'achternaam' => 'Xaris',
            'geboortedatum' => '1993-01-01',
            'organisatienaam' => 'Xaris',
            'kvk' => '37136193',
            'website' => 'https://www.xaris.nl',
            'adres_straat' => 'Westerspoor',
            'adres_huisnummer' => '1',
            'adres_toevoeging' => '',
            'adres_postcode' => '1687 AZ',
            'adres_plaats' => 'Wognum',
            'adres_land_id' => 'NL',
            'telefoonnummer' => '088 0234567',
            'emailadres' => 'info@xaris.nl',
            'iban' => 'NL96 RABO 0317 3716 57',
            'akkoord_privacybeleid' => 1,
            'contact_groep' => 'Testgroup',

            'energieleverancier_id' => 11,
            'energieleverancier_klantnummer' => 'klant_123',
            'energieleverancier_type_id' => 3,
            'energieleverancier_klant_sinds' => '2005-06-07',

            'intake_campagne_id' => 1,
            'intake_motivatie_ids' => '2,4,5',
            'intake_interesse_ids' => '5,2,11,19',
            'intake_status_id' => 1,
            'intake_opmerkingen_bewoner' => 'Opmerking van bewoner',

            'participatie_productieproject_id' => 1,
            'participatie_aantal_participaties_aangevraagd' => 12,
            'participatie_iban_uitkering' => 'NL96 RABO 0317 3716 57',
            'participatie_iban_uitkering_tnv' => 'Xaris BV',
            'participatie_inschrijfdatum' => '2018-01-02',
            'participatie_jaarlijks_verbruik' => '500',
            'participatie_status_id' => 2,
            'participatie_uitkeren_op_id' => 3,

            'order_product_id' => 1,
            'order_aantal' => 234,
            'order_iban' => 'NL96 RABO 0317 3716 57',
            'order_iban_tnv' => 'Xaris BV',
            'order_betaalwijze_id' => 'collection',
            'order_status_id' => 'active',
            'order_begindatum' => '2018-09-01',
            'order_aanvraagdatum' => '2018-08-01',
        ]);
        $response->assertStatus(200);

        $contactOrganisation = Contact::find(1);
        $this->assertEquals([
            'type_id' => 'organisation',
            'full_name' => 'Xaris',
            //kan worden ingesteld in .env
            //'number' => 'C2018-1',
            'status_id' => 'none',
            'iban' => 'NL96 RABO 0317 3716 57',
            'did_agree_avg' => 1,
        ], array_intersect_key($contactOrganisation->toArray(), array_flip(['type_id', 'full_name', 'status_id', 'iban', 'did_agree_avg'])));

        $this->assertEquals([1], $contactOrganisation->groups()->pluck('id')->toArray());

        $organisation = Organisation::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'name' => 'Xaris',
            'website' => 'https://www.xaris.nl',
            'chamber_of_commerce_number' => '37136193',
        ], array_intersect_key($organisation->toArray(), array_flip(['contact_id', 'name', 'website', 'chamber_of_commerce_number'])));

        $contactPerson = Contact::find(2);
        $this->assertEquals([
            'type_id' => 'person',
            'full_name' => 'Xaris, Xa van',
            //kan worden ingesteld in .env
            //'number' => 'C2018-2',
            'status_id' => 'none',
        ], array_intersect_key($contactPerson->toArray(), array_flip(['type_id', 'full_name', 'status_id'])));

        $person = Person::find(1);
        $this->assertEquals([
            'contact_id' => '2',
            'initials' => 'Xrs',
            'first_name' => 'Xa',
            'last_name' => 'Xaris',
            'last_name_prefix' => 'van',
            'title_id' => '1',
            'organisation_id' => '1',
            'date_of_birth' => '1993-01-01 00:00:00',
            'primary' => false,
        ], array_intersect_key($person->toArray(), array_flip(['contact_id', 'initials', 'first_name', 'last_name', 'last_name_prefix', 'title_id', 'organisation_id', 'date_of_birth', 'primary'])));

        $occupationContact = OccupationContact::find(1);
        $this->assertEquals([
            'occupation_id' => 14,
            'primary_contact_id' => 1,
            'contact_id' => 2,
            'primary' => 1,
        ], array_intersect_key($occupationContact->toArray(), array_flip(['occupation_id', 'primary_contact_id', 'contact_id', 'primary'])));

        $address = Address::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'type_id' => 'postal',
            'street' => 'Westerspoor',
            'number' => 1,
            'city' => 'Wognum',
            'postal_code' => '1687 AZ',
            'primary' => true,
            'country_id' => 'NL',
        ], array_intersect_key($address->toArray(), array_flip(['contact_id', 'type_id', 'street', 'number', 'city', 'postal_code', 'primary', 'country_id'])));

        $emailAddress = EmailAddress::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'type_id' => 'home',
            'email' => 'info@xaris.nl',
            'primary' => true,
        ], array_intersect_key($emailAddress->toArray(), array_flip(['contact_id', 'type_id', 'email', 'primary'])));

        $phoneNumber = PhoneNumber::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'type_id' => 'home',
            'number' => '088 0234567',
            'primary' => true,
        ], array_intersect_key($phoneNumber->toArray(), array_flip(['contact_id', 'type_id', 'number', 'primary'])));

        $contactEnergySupplier = ContactEnergySupplier::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'energy_supplier_id' => 11,
            'contact_energy_supply_type_id' => '3',
            'member_since' => '2005-06-07',
            'es_number' => 'klant_123',
        ], array_intersect_key($contactEnergySupplier->toArray(), array_flip(['contact_id', 'energy_supplier_id', 'contact_energy_supply_type_id', 'member_since', 'es_number'])));

        $intake = Intake::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'address_id' => 1,
            'intake_status_id' => 1,
            'campaign_id' => 1,
            'note' => 'Opmerking van bewoner',
        ], array_intersect_key($intake->toArray(), array_flip(['contact_id', 'address_id', 'intake_status_id', 'campaign_id', 'note'])));

        $this->assertEquals([2, 4, 5], $intake->reasons()->pluck('id')->toArray());
        $this->assertEquals([2, 5, 11, 19], $intake->measuresRequested()->pluck('measure_categories.id')->toArray());

        $participationProductionProject = ParticipantProductionProject::find(1);
        $this->assertEquals([
            'contact_id' => 1,
            'status_id' => 2,
            'production_project_id' => 1,
            'date_register' => '2018-01-02',
            'iban_payout' => 'NL96 RABO 0317 3716 57',
            'iban_payout_attn' => 'Xaris BV',
            'type_id' => 3,
            'power_kwh_consumption' => 500,
        ], array_intersect_key($participationProductionProject->toArray(), array_flip(['contact_id', 'status_id', 'production_project_id', 'date_register', 'iban_payout', 'iban_payout_attn', 'type_id', 'power_kwh_consumption'])));

        $order = Order::find(1);
        $this->assertEquals([
            'number' => 'O' . Carbon::now()->year . '-1',
            'contact_id' => 1,
            'administration_id' => 1,
            'status_id' => 'active',
            'subject' => 'Testproduct',
            'payment_type_id' => 'collection',
            'IBAN' => 'NL96 RABO 0317 3716 57',
            'iban_attn' => 'Xaris BV',
            'date_requested' => '2018-08-01',
        ], array_intersect_key($order->toArray(), array_flip(['number', 'contact_id', 'administration_id', 'status_id', 'subject', 'payment_type_id', 'IBAN', 'iban_attn', 'date_requested'])));

        $orderProduct = OrderProduct::find(1);
        $this->assertEquals([
            'product_id' => 1,
            'order_id' => 1,
            'description' => 'Testproduct',
            'amount' => '234',
            'date_start' => '2018-09-01',
        ], array_intersect_key($orderProduct->toArray(), array_flip(['product_id', 'order_id', 'description', 'amount', 'date_start'])));

        $task = Task::find(1);
        $this->assertEquals([
            'note' => "Webformulier Test.\n\n",
            'type_id' => 6,
            'contact_id' => 1,
            'intake_id' => 1,
            'contact_group_id' => 1,
            'finished' => 0,
            'date_planned_start' => Carbon::today()->format('Y-m-d H:i:s'),
            'responsible_user_id' => 1,
            'responsible_team_id' => null,
            'production_project_id' => 1,
            'participation_production_project_id' => 1,
            'order_id' => 1,
        ], array_intersect_key($task->toArray(), array_flip(['note', 'type_id', 'contact_id', 'intake_id', 'contact_group_id', 'finished', 'date_planned_start', 'responsible_user_id', 'responsible_team_id', 'production_project_id', 'participation_production_project_id', 'order_id'])));
    }

    protected function insertData()
    {
        Webform::create([
            'name' => 'Test',
            'api_key' => 'default',
            'max_requests_per_minute' => 10,
            'date_start' => Carbon::today(),
            'date_end' => Carbon::today(),
            'api_key_date' => Carbon::today(),
            'responsible_user_id' => 1,
            'responsible_team_id' => null,
            'last_requests' => [],
        ]);

        ContactGroup::create([
            'name' => 'Testgroup',
            'description' => 'Group for testing',
            'closed' => false,
            'created_by_id' => 1,
            'type_id' => 'static',
            'composed_group_type' => 'one',
            'dynamic_filter_type' => 'and',
            'composed_of' => 'contacts',
        ]);

        Campaign::create([
            'name' => 'TestCampaign',
            'description' => 'Campaign to test with',
            'status_id' => 2,
            'start_date' => Carbon::today()->subWeek(),
            'end_date' => Carbon::today()->addWeek(),
            'type_id' => 2,
        ]);

        foreach ([
                     'Reason 1',
                     'Reason 2',
                     'Reason 3',
                     'Reason 4',
                     'Reason 5',
                 ] as $name) {
            $reason = new IntakeReason();
            $reason->name = $name;
            $reason->save();
        }

        ProductionProject::create([
            'name' => 'Testproject',
            'code' => 'P001',
            'description' => 'Project for testing',
            'owned_by_id' => 1,
            'production_project_status_id' => 2,
            'date_start' => Carbon::today()->subWeek(),
            'date_production' => Carbon::today()->subWeek(),
            'date_start_registrations' => Carbon::today()->subWeek(),
            'date_end_registrations' => Carbon::today()->addWeek(),
            'production_project_type_id' => 3,
            'postal_code' => '1234 AB',
            'address' => 'Teststreet',
            'city' => 'Testcity',
        ]);

        Administration::create([
            'name' => 'test administratie',
            'administration_number' => 1445,
            'btw_number' => '1233123123',
            'IBAN' => 'CH3608387000001080173',
            'created_by_id' => 1,
        ]);

        Product::create([
            'code' => 'P001',
            'name' => 'Testproduct',
            'invoice_frequency_id' => 'quarterly',
            'administration_id' => 1,
            'created_by_id' => 1,
            'duration_id' => 'none'
        ]);
    }
}