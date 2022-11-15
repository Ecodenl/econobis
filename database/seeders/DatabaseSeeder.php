<?php

namespace Database\Seeders;

use App\Eco\User\User;
use Illuminate\Database\Seeder;
use Laravel\Passport\Passport;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Passport::actingAs(User::find(1));

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
