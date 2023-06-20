<?php

namespace App\Eco\ContactGroup;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class ContactGroupBuilder extends Builder
{
    public function whereTeamContactGroupIds(User $user)
    {
        $userHasTeams = $user->teams()->whereHas('contactGroups')->exists();
        if($userHasTeams){
            $this->whereHas('teams.users', function($query) use($user) {
                $query->where('users.id', $user->id);
            });
        }
        return $this;
    }
}