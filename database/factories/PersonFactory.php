<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Person\Person::class, function (Faker\Generator $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'last_name_prefix_id' => function () {
            if (random_int(0, 10) < 8) return null;
            return \App\Eco\LastNamePrefix\LastNamePrefix::inRandomOrder()->first()->id;
        },
        'title_id' => function () {
            return \App\Eco\Title\Title::inRandomOrder()->first()->id;
        },
        'contact_id' => function () {
            return factory('App\Eco\Contact\Contact')->create()->id;
        },
        'type_id' => function () {
            if (random_int(0, 10) < 5) return null;
            return \App\Eco\PersonType\PersonType::inRandomOrder()->first()->id;
        },
        'date_of_birth' => function () use ($faker) {
            if (random_int(0, 10) < 5) return null;
            return $faker->date();
        },
        'first_name_partner' => $faker->firstName,
        'last_name_partner' => $faker->lastName,
        'date_of_birth_partner' => function () use ($faker) {
            if (random_int(0, 10) < 5) return null;
            return $faker->date();
        },
    ];
});
