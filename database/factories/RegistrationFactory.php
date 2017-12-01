<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\Eco\Registration\Registration::class, function (Faker\Generator $faker) {
    return [
        'address_id' => function(){
            return \App\Eco\Address\Address::random()->id;
        },
        'campaign_id' => function() use ($faker){
            if($faker->boolean(50)) return \App\Eco\Campaign\Campaign::inRandomOrder()->first()->id;
        },
        'registration_status_id' => function() use ($faker){
            if($faker->boolean(50)) return \App\Eco\Registration\RegistrationStatus::inRandomOrder()->first()->id;
        },
    ];
});
