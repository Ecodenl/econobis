<?php

namespace App\Eco\ParticipantProject;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class ParticipantProjectBuilder extends Builder
{
    public function whereAdministrationIds(User $user)
    {
        if($user instanceof User && $user->administrations){
            $this->whereHas('project', function ($q) use($user) {
                $q->whereIn('projects.administration_id', $user->administrations()->pluck('administrations.id'));
            });
        }
        return $this;
    }
}