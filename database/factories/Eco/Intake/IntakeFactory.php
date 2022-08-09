<?php

namespace Database\Factories\Eco\Intake;

use App\Eco\Campaign\Campaign;
use App\Eco\Intake\IntakeStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class IntakeFactory extends Factory
{
    protected $model = Intake::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'address_id' => function(){
                return Intake::random()->id;
            },
            'campaign_id' => function() use ($faker){
                if($faker->boolean(50)) return Campaign::inRandomOrder()->first()->id;
            },
            'intake_status_id' => function() use ($faker){
                if($faker->boolean(50)) return IntakeStatus::inRandomOrder()->first()->id;
            },
        ];
    }
}
