<?php

namespace App\Eco\ContactGroup;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class ContactGroupBuilder extends Builder
{
    public function whereTeamContactGroupIds(User $user)
    {
        if($user->getTeamContactGroupIds()){
            $this->whereIn('contact_groups.id', $user->getTeamContactGroupIds());
        }
        return $this;
    }
}