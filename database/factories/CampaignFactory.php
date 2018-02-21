<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Campaign\Campaign::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->text(20),
        'number' => $faker->text(6),
        'description' => $faker->text(20),
        'status_id' => function() use ($faker){
            if($faker->boolean()) return \App\Eco\Campaign\CampaignStatus::inRandomOrder()->first()->id;
        },
        'start_date' => function() use($faker){
            if($faker->boolean()) return $faker->date();
        },
        'end_date' => function() use($faker){
            if($faker->boolean()) return $faker->date();
        },
        'type_id' => function() use($faker){
            return \App\Eco\Campaign\CampaignType::inRandomOrder()->first()->id;
        },
        'created_by_id' => function() use($faker){
            if($faker->boolean()) return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
        'owned_by_id' => function() use($faker){
            if($faker->boolean()) return \App\Eco\User\User::inRandomOrder()->first()->id;
        },
    ];
});
