<?php

namespace Database\Factories\Eco\Industry;

use App\Eco\Industry\Industry;
use Illuminate\Database\Eloquent\Factories\Factory;

class IndustryFactory extends Factory
{
    protected $model = Industry::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => '',
        ];
    }
}
