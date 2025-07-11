<?php

namespace App\Eco\Project;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class ProjectBuilder extends Builder
{
    public function whereAdministrationIds(User $user)
    {
        if($user instanceof User && $user->administrations){
            $this->whereIn('projects.administration_id', $user->administrations()->pluck('administrations.id'));
        }
        return $this;
    }
}