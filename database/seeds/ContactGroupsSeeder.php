<?php

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
        factory(\App\Eco\ContactGroup\ContactGroup::class, 10)
            ->create()
            ->each(function ($contactGroup) {
                $contactGroup->contacts()->sync(
                    \App\Eco\Contact\Contact::orderByRaw('RAND()')
                        ->limit(random_int(0, 50))
                        ->get()
                );
            });
    }
}
