<?php

namespace Database\Seeders;

use App\Eco\Address\Address;
use App\Eco\Intake\Intake;
use App\Eco\Intake\IntakeReason;
use App\Eco\Intake\IntakeSource;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureRequested;
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
        foreach (Address::all() as $address) {
            factory(Intake::class, random_int(0, 1)) // Is optionele one to one relatie
                ->create(['address_id' => $address->id])
                ->each(function ($intake) use ($faker, $address) {
                    // Per intake sources koppelen
                    $intake->sources()->sync(
                        IntakeSource::inRandomOrder()
                            ->limit(random_int(0, 3))
                            ->get()
                    );

                    // Per intake reasons koppelen
                    $intake->reasons()->sync(
                        IntakeReason::inRandomOrder()
                            ->limit(random_int(0, 3))
                            ->get()
                    );


                    // Als er een intake is kunnen er ook measuresRequested aan het adres zijn gekoppeld
                    Measure::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                        ->each(function ($measure) use ($address, $faker) {
                            factory(MeasureRequested::class, 1)->create([
                                    'address_id' => $address->id,
                                    'measure_id' => $measure->id,
                                ]
                            );
                        });

                });
        }
    }
}
