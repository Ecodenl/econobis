<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Address\Address::class, function (Faker\Generator $faker) {
    return [
        'street' => $faker->streetName,
        'number' => $faker->buildingNumber,
        'city' => $faker->city,
        'postal_code' => $faker->postcode,
        'contact_id' => function(){
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function(){
            if(random_int(0,10) < 2) return null;
            return \App\Eco\Address\AddressType::random()->id;
        },
        'building_type_id' => function() use ($faker){
            if($faker->boolean(50)) return \App\Eco\BuildingType\BuildingType::inRandomOrder()->first()->id;
        },
        'build_year' => function() use ($faker){
            if($faker->boolean(50)) return $faker->year();
        },
        'owner' => function() use ($faker){
            if($faker->boolean(50)) return $faker->boolean();
        }
    ];
});
