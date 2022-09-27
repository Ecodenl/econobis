<?php

namespace Database\Factories\Eco\PersonType;

use App\Eco\PersonType\PersonType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PersonTypeFactory extends Factory
{
    protected $model = PersonType::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => $faker->jobTitle,
        ];
    }
}
