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
        $faker = Faker\Factory::create();

        // Per adres registrations aanmaken
        foreach (\App\Eco\Address\Address::all() as $address) {
            factory(\App\Eco\Registration\Registration::class, random_int(0, 1)) // Is optionele one to one relatie
                ->create(['address_id' => $address->id])
                ->each(function ($registration) use ($faker, $address) {
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

                    // Als er een registration is kunnen er ook measuresTaken aan het adres zijn gekoppeld
                    \App\Eco\Measure\Measure::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                        ->each(function ($measure) use ($address, $faker) {
                            factory(\App\Eco\Measure\MeasureTaken::class, 1)->create([
                                    'address_id' => $address->id,
                                    'measure_id' => $measure->id,
                                ]
                            );
                        });

                    // Als er een registration is kunnen er ook measuresRequested aan het adres zijn gekoppeld
                    \App\Eco\Measure\Measure::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                        ->each(function ($measure) use ($address, $faker) {
                            factory(\App\Eco\Measure\MeasureRequested::class, 1)->create([
                                    'address_id' => $address->id,
                                    'measure_id' => $measure->id,
                                ]
                            );
                        });

                });
        }
    }
}
