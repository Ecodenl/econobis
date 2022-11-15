<?php

namespace Database\Factories\Eco\Organisation;

use App\Eco\Industry\Industry;
use App\Eco\Organisation\Organisation;
use App\Eco\OrganisationType\OrganisationType;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganisationFactory extends Factory
{
    protected $model = Organisation::class;

    public function definition()
    {
        $faker =  $this->faker;

        return [
            'name' => $faker->company,
            'contact_id' => function(){
                return factory('App\Eco\Contact\Contact')->create()->id;
            },
            'type_id' => function(){
                if(random_int(0,10) < 5) return null;
                return OrganisationType::inRandomOrder()->first()->id;
            },
            'website' => $faker->url,
            'vat_number' => $faker->vat,
            'chamber_of_commerce_number' => $faker->randomNumber(),
            'industry_id' =>  function(){
                if(random_int(0,10) < 5) return null;
                return Industry::inRandomOrder()->first()->id;
            },
            'square_meters' => $faker->numberBetween(0, 20000),
        ];
    }
}
