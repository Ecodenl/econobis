<?php

use Illuminate\Database\Seeder;

class MeasuresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        foreach (\App\Eco\Address\Address::all() as $address) {

            \App\Eco\Measure\Measure::inRandomOrder()
                ->limit(random_int(0, 3))
                ->get()
                ->each(function ($measure) use ($address, $faker) {
                    $address->measures_taken()->save($measure, [
                            'measure_date' => $faker->date(),
                        ]
                    );
                });

            \App\Eco\Measure\Measure::inRandomOrder()
                ->limit(random_int(0, 3))
                ->get()
                ->each(function ($measure) use ($address, $faker) {
                    $address->measures_requested()->save($measure, [
                            'desired_date' => $faker->date(),
                            'degree_interest' => $faker->numberBetween(0, 10),
                        ]
                    );
                });
        }
    }
}
