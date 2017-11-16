<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Account\Account::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->company,
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function(){
            if(random_int(0,10) < 5) return null;
            return \App\Eco\AccountType\AccountType::inRandomOrder()->first()->id;
        },
        'website' => $faker->url,
        'vat_number' => $faker->vat,
        'chamber_of_commerce_number' => $faker->randomNumber(),
        'industry_id' =>  function(){
            if(random_int(0,10) < 5) return null;
            return \App\Eco\Industry\Industry::inRandomOrder()->first()->id;
        },
        'square_meters' => $faker->numberBetween(0, 20000),
    ];
});
