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
                    factory(\App\Eco\Measure\MeasureTaken::class, 1)->create([
                            'address_id' => $address->id,
                            'measure_id' => $measure->id,
                        ]
                    );
                });

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
        }
    }
}
