<?php

namespace Database\Seeders\Demo;

use Illuminate\Database\Seeder;

/**
 * Demo seeder – alleen voor local/testing
 */

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Users
        $this->call(UsersSeeder::class);

        // Organisations (includes Contacts)
        $this->call(OrganisationsSeeder::class);
        // People (includes Contacts)
        $this->call(PersonSeeder::class);
        // Addresses on Contacts
        $this->call(AddressSeeder::class);
        // PhoneNumbers on Contacts
        $this->call(PhoneNumbersSeeder::class);
        // EmailAdresses on Contacts
        $this->call(EmailAddressSeeder::class);
        // ContactNotes on Contacts
        $this->call(ContactNoteSeeder::class);

        $this->call(CampaignSeeder::class);

        // Intakes (en aanverwante data) toevoegen
        $this->call(IntakesSeeder::class);

        // ContactGroups
        $this->call(ContactGroupsSeeder::class);

        // Tasks
        $this->call(TasksSeeder::class);
    }
}
