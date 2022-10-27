<?php

namespace App\Eco\Task;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class TaskBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->whereIn('contact_id', $user->getTeamContactIds());
        }
        return $this;
    }
}