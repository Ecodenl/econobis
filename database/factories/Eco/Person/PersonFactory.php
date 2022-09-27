<?php

namespace Database\Factories\Eco\Person;

use App\Eco\Person\Person;
use App\Eco\PersonType\PersonType;
use App\Eco\Title\Title;
use Illuminate\Database\Eloquent\Factories\Factory;

class PersonFactory extends Factory
{
    protected $model = Person::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'first_name' => $faker->firstName,
            'last_name' => $faker->lastName,
            'last_name_prefix' => 'de',
            'title_id' => function () {
                return Title::inRandomOrder()->first()->id;
            },
            'contact_id' => function () {
                return factory('App\Eco\Contact\Contact')->create()->id;
            },
            'type_id' => function () {
                if (random_int(0, 10) < 5) return null;
                return PersonType::inRandomOrder()->first()->id;
            },
            'date_of_birth' => function () use ($faker) {
                if (random_int(0, 10) < 5) return null;
                return $faker->date();
            },
            'first_name_partner' => $faker->firstName,
            'last_name_partner' => $faker->lastName,
            'date_of_birth_partner' => function () use ($faker) {
                if (random_int(0, 10) < 5) return null;
                return $faker->date();
            },
        ];
    }
}
