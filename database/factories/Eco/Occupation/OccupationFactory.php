<?php

namespace Database\Factories\Eco\Occupation;

use App\Eco\Occupation\Occupation;
use Illuminate\Database\Eloquent\Factories\Factory;

class OccupationFactory extends Factory
{
    protected $model = Occupation::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => $faker->jobTitle,
        ];
    }
}
