<?php

namespace App\Http\JoryResources;

use JosKolenberg\LaravelJory\JoryResource;
use App\Eco\ParticipantMutation\ParticipantMutation;

class ParticipantMutationJoryResource extends JoryResource
{
    protected $modelClass = ParticipantMutation::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configure(): void
    {
        // Custom attributes
        $this->field('econobis_payment_link')->hideByDefault();
        $this->field('is_paid_by_mollie')->hideByDefault();
    }
}
