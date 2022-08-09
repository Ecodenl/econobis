<?php

namespace Database\Factories;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Intake\IntakeStatus;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Intake\Intake::class, function (Generator $faker) {
    return [
        'address_id' => function(){
            return Address::random()->id;
        },
        'campaign_id' => function() use ($faker){
            if($faker->boolean(50)) return Campaign::inRandomOrder()->first()->id;
        },
        'intake_status_id' => function() use ($faker){
            if($faker->boolean(50)) return IntakeStatus::inRandomOrder()->first()->id;
        },
    ];
});
