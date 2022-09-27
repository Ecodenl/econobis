<?php

namespace Database\Factories\Eco\OrganisationType;

use App\Eco\OrganisationType\OrganisationType;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganisationTypeFactory extends Factory
{
    protected $model = OrganisationType::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => $faker->jobTitle,
        ];
    }
}
