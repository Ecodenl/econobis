<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(\App\Eco\Campaign\CampaignResponse::class, function (Faker\Generator $faker) {
    return [
        'campaign_id' => function() use ($faker){
            return \App\Eco\Campaign\Campaign::inRandomOrder()->first()->id;
        },
        'contact_id' => function() use ($faker){
            return \App\Eco\Contact\Contact::inRandomOrder()->first()->id;
        },
        'date_responded' => function() use($faker){
            return $faker->date();
        },
    ];
});
