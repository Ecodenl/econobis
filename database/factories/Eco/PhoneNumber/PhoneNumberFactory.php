<?php

namespace Database\Factories\Eco\PhoneNumber;

use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\PhoneNumber\PhoneNumberType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PhoneNumberFactory extends Factory
{
    protected $model = PhoneNumber::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'number' => $faker->phoneNumber,
            'contact_id' => function(){
                return factory('App\Eco\Contact\Contact')->create()->id;
            },
            'type_id' => function(){
                return PhoneNumberType::random()->id;
            },
        ];
    }
}
