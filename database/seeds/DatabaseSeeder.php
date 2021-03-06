<?php

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
        $this->call(PeopleSeeder::class);
        // Addresses on Contacts
        $this->call(AddressesSeeder::class);
        // PhoneNumbers on Contacts
        $this->call(PhoneNumbersSeeder::class);
        // EmailAdresses on Contacts
        $this->call(EmailAddressesSeeder::class);
        // ContactNotes on Contacts
        $this->call(ContactNotesSeeder::class);

        $this->call(CampaignsSeeder::class);

        // Intakes (en aanverwante data) toevoegen
        $this->call(IntakesSeeder::class);

        // ContactGroups
        $this->call(ContactGroupsSeeder::class);

        // Tasks
        $this->call(TasksSeeder::class);
    }
}
