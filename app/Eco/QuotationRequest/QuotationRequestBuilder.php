<?php

namespace App\Eco\QuotationRequest;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class QuotationRequestBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->join('opportunities as opportunitiesAuth', 'quotation_requests.opportunity_id', '=', 'opportunitiesAuth.id');
            $this->join('intakes as intakesAuth', 'opportunitiesAuth.intake_id', '=', 'intakesAuth.id');
            $this->whereIn('intakesAuth.contact_id', $user->getTeamContactIds());
        }
        return $this;
    }
}