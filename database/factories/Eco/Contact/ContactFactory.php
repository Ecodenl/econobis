<?php

namespace Database\Factories\Eco\Contact;

use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactStatus;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'type_id' => null,
            'number' => null,
            'status_id' => ContactStatus::random()->id,
            'member_since' => function() use ($faker) {
                if(random_int(0,10) < 5) return null;
                return $faker->date();
            },
            'member_until' => function() use ($faker) {
                if(random_int(0,10) < 5) return null;
                return $faker->date();
            },
            'newsletter' => $faker->boolean(),
            'iban' => $faker->bankAccountNumber,
            'liable' => $faker->boolean(),
            'liability_amount' => $faker->numberBetween(0, 50000),
            'owner_id' => User::inRandomOrder()->first()->id,
            'created_by_id' => User::inRandomOrder()->first()->id,
            'updated_by_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
