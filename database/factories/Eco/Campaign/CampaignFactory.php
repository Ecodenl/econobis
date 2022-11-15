<?php

namespace Database\Factories\Eco\Campaign;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignStatus;
use App\Eco\Campaign\CampaignType;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => $faker->text(20),
            'number' => $faker->text(6),
            'description' => $faker->text(20),
            'status_id' => function() use ($faker){
                if($faker->boolean()) return CampaignStatus::inRandomOrder()->first()->id;
            },
            'start_date' => function() use($faker){
                if($faker->boolean()) return $faker->date();
            },
            'end_date' => function() use($faker){
                if($faker->boolean()) return $faker->date();
            },
            'type_id' => function() use($faker){
                return CampaignType::inRandomOrder()->first()->id;
            },
            'created_by_id' => function() use($faker){
                if($faker->boolean()) return User::inRandomOrder()->first()->id;
            },
            'owned_by_id' => function() use($faker){
                if($faker->boolean()) return User::inRandomOrder()->first()->id;
            },
        ];
    }
}
