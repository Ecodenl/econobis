<?php

namespace Database\Factories\Eco\Campaign;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignResponseFactory extends Factory
{
    protected $model = CampaignResponse::class;

    public function definition()
    {
        $faker =  $this->faker;

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
    }
}

