<?php

namespace Database\Factories;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\Contact\Contact;
use Faker\Generator;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(CampaignResponse::class, function (Generator $faker) {
    return [
        'campaign_id' => function() use ($faker){
            return Campaign::inRandomOrder()->first()->id;
        },
        'contact_id' => function() use ($faker){
            return Contact::inRandomOrder()->first()->id;
        },
        'date_responded' => function() use($faker){
            return $faker->date();
        },
    ];
});
