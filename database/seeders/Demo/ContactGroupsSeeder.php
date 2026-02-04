<?php

namespace Database\Seeders\Demo;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Database\Seeder;

class ContactGroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContactGroup::factory()->count(10)
            ->create()
            ->each(function ($contactGroup) {
                $contactGroup->contacts()->sync(
                    Contact::orderByRaw('RAND()')
                        ->limit(random_int(0, 50))
                        ->get()
                );
            });
    }
}
