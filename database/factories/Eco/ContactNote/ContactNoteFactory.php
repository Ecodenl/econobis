<?php

namespace Database\Factories\Eco\ContactNote;

use App\Eco\Contact\Contact;
use App\Eco\ContactNote\ContactNote;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactNoteFactory extends Factory
{
    protected $model = ContactNote::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'note' => $faker->text(),
            'contact_id' => function(){
                return Contact::factory()
                    ->create()->id;
            },
            'created_by_id' => User::inRandomOrder()->first()->id,
            'updated_by_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
