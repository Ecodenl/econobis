<?php

namespace Database\Factories\Eco\Address;

use App\Eco\Address\Address;
use App\Eco\Address\AddressType;
use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'street' => $faker->streetName,
            'number' => $faker->randomNumber(2),
            'addition' => $faker->randomLetter,
            'city' => $faker->city,
            'postal_code' => $faker->postcode,
            'contact_id' => function(){
                return Contact::factory()->create()->id;
            },
            'type_id' => function(){
                if(random_int(0,10) < 2) return null;
                return AddressType::random()->id;
            },
        ];
    }
}
