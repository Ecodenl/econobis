<?php

namespace App\Eco\ParticipantProject;

use App\Eco\Project\Project;
use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ParticipantProjectPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_participation', 'api');
    }
    public function manage(User $user)
    {
        return $user->hasPermissionTo('manage_participation', 'api');
    }
    public function viewByProjectType(User $user, Project $project)
    {
        if ($project->projectType?->code_ref === 'energy_community') {
            return $user->hasPermissionTo('view_energy_community', 'api');
        }

        return $user->hasPermissionTo('view_participation', 'api');
    }

    public function manageByProjectType(User $user, Project $project)
    {
        if ($project->projectType?->code_ref === 'energy_community') {
            return $user->hasPermissionTo('manage_energy_community', 'api');
        }

        return $user->hasPermissionTo('manage_participation', 'api');
    }
}
