<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Contact\Contact::class, function (Faker\Generator $faker) {
    return [
        'type_id' => null,
        'number' => null,
        'status_id' => \App\Eco\Contact\ContactStatus::random()->id,
        'member_since' => function() use ($faker) {
            if(random_int(0,10) < 5) return null;
            return $faker->date();
        },
        'member_until' => function() use ($faker) {
            if(random_int(0,10) < 5) return null;
            return $faker->date();
        },
        'newsletter' => $faker->boolean(),
        'iban' => $faker->bankAccountNumber,
        'liable' => $faker->boolean(),
        'liability_amount' => $faker->numberBetween(0, 50000),
        'owner_id' => App\Eco\User\User::inRandomOrder()->first()->id,
        'created_by_id' => App\Eco\User\User::inRandomOrder()->first()->id,
        'updated_by_id' => App\Eco\User\User::inRandomOrder()->first()->id,
    ];
});
