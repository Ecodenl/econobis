<?php

use Illuminate\Database\Seeder;

class IntakesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        // Per adres intakes aanmaken
        foreach (\App\Eco\Address\Address::all() as $address) {
            factory(\App\Eco\Intake\Intake::class, random_int(0, 1)) // Is optionele one to one relatie
                ->create(['address_id' => $address->id])
                ->each(function ($intake) use ($faker, $address) {
                    // Per intake sources koppelen
                    $intake->sources()->sync(
                        \App\Eco\Intake\IntakeSource::inRandomOrder()
                            ->limit(random_int(0, 3))
                            ->get()
                    );

                    // Per intake reasons koppelen
                    $intake->reasons()->sync(
                        \App\Eco\Intake\IntakeReason::inRandomOrder()
                            ->limit(random_int(0, 3))
                            ->get()
                    );


                    // Als er een intake is kunnen er ook measuresRequested aan het adres zijn gekoppeld
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
