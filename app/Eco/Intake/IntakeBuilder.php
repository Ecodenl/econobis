<?php

namespace App\Eco\Intake;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class IntakeBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->whereIn('contact_id', $user->getTeamContactIds());
        }
        return $this;
    }
}