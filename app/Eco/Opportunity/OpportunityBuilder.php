<?php

namespace App\Eco\Opportunity;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class OpportunityBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->join('intakes as intakesAuth', 'opportunities.intake_id', '=', 'intakesAuth.id');
            $this->whereIn('intakesAuth.contact_id', $user->getTeamContactIds());
        }
        return $this;
    }
}