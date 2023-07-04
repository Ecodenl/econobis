<?php

namespace App\Eco\ContactGroup;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class ContactGroupBuilder extends Builder
{
    public function whereTeamContactGroupIds($user)
    {
        if($user instanceof User) {
            $userHasTeams = $user->teams()->whereHas('contactGroups')->exists();
            if ($userHasTeams) {
                $this->whereHas('teams.users', function ($query) use ($user) {
                    $query->where('users.id', $user->id);
                });
            }
        }
        return $this;
    }
}