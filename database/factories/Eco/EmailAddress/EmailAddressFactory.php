<?php

namespace Database\Factories\Eco\EmailAddress;

use App\Eco\Contact\Contact;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\EmailAddress\EmailAddressType;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmailAddressFactory extends Factory
{
    protected $model = EmailAddress::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'email' => $faker->email,
            'contact_id' => function(){
                return Contact::factory()->create()->id;
            },
            'type_id' => function(){
                return EmailAddressType::random()->id;
            },
        ];
    }
}
