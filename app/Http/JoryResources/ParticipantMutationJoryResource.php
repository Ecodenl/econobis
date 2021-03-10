<?php

namespace App\Http\JoryResources;

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\Portal\PortalUser;
use App\Http\JoryResources\Base\JoryResource;

class ParticipantMutationJoryResource extends JoryResource
{
    protected $modelClass = ParticipantMutation::class;

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
        // Custom attributes // Todo; user check
        $this->field('econobis_payment_link')->hideByDefault();
        $this->field('is_paid_by_mollie')->hideByDefault();

        $this->filter('code');

        $this->relation('participation');
    }

    public function authorize($builder, $user = null): void
    {
        if($user instanceof PortalUser){
            $builder->whereHas('participation.contact', function($query){
                $query->whereAuthorizedForPortalUser();
            });
        }
    }
}
