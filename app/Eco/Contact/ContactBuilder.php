<?php

namespace App\Eco\Contact;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Builder;

class ContactBuilder extends Builder
{
    public function whereTeamContactIds(User $user)
    {
        if($user->getTeamContactIds()){
            $this->whereIn('contacts.id', $user->getTeamContactIds());
        }
        return $this;
    }
}