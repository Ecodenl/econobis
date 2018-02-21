<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Intake\Intake::class, function (Faker\Generator $faker) {
    return [
        'address_id' => function(){
            return \App\Eco\Address\Address::random()->id;
        },
        'campaign_id' => function() use ($faker){
            if($faker->boolean(50)) return \App\Eco\Campaign\Campaign::inRandomOrder()->first()->id;
        },
        'intake_status_id' => function() use ($faker){
            if($faker->boolean(50)) return \App\Eco\Intake\IntakeStatus::inRandomOrder()->first()->id;
        },
    ];
});
