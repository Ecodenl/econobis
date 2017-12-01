<?php

use Illuminate\Database\Seeder;

class RegistrationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Eerst wat campgnes toevoegen
        factory(\App\Eco\Campaign\Campaign::class, 10)->create();

        // Per adres registrations aanmaken
        foreach (\App\Eco\Address\Address::all() as $address) {
            factory(\App\Eco\Registration\Registration::class, random_int(0, 2))
                ->create(['address_id' => $address->id])
                ->each(function ($registration) {
                    // Per registration sources koppelen
                    $registration->sources()->sync(
                        \App\Eco\Registration\RegistrationSource::inRandomOrder()
                            ->limit(random_int(0, 3))
                            ->get()
                    );

                    // Per registration reasons koppelen
                    $registration->reasons()->sync(
                        \App\Eco\Registration\RegistrationReason::inRandomOrder()
                            ->limit(random_int(0, 3))
                            ->get()
                    );

                    // Per registration notes aanmaken
                    factory(\App\Eco\Registration\RegistrationNote::class, random_int(0, 4))
                        ->create(['registration_id' => $registration->id]);
                });
        }
    }
}
