<?php

namespace Database\Factories;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\BuildingType\BuildingType;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Address::class, function (Generator $faker) {
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
            return AddressType::random()->id;
        },
        'building_type_id' => function() use ($faker){
            if($faker->boolean(50)) return BuildingType::inRandomOrder()->first()->id;
        },
        'build_year' => function() use ($faker){
            if($faker->boolean(50)) return $faker->year();
        },
        'owner' => function() use ($faker){
            if($faker->boolean(50)) return $faker->boolean();
        }
    ];
});
