<?php

namespace App\Eco\District;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class DistrictBuilder extends Builder
{
    public function whereTeamDistrictIds($user)
    {
        if($user instanceof User) {
            $userHasTeams = $user->teams()->whereHas('districts')->exists();
            if ($userHasTeams) {
                $this->whereHas('teams.users', function ($query) use ($user) {
                    $query->where('users.id', $user->id);
                });
            }
        }
        return $this;
    }
}