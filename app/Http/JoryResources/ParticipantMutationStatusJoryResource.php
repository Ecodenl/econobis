<?php

namespace App\Http\JoryResources;

use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\Portal\PortalUser;
use App\Http\JoryResources\Base\JoryResource;

class ParticipantMutationStatusJoryResource extends JoryResource
{
    protected $modelClass = ParticipantMutationStatus::class;

    /**
     * Configure the JoryResource.
     *
     * @return void
     */
    protected function configureForApp(): void
    {
    }

    protected function configureForPortal(): void
    {
        $this->field('id');
        $this->field('name');
        $this->field('code_ref');
    }

}
