<?php

namespace App\Eco\Email;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmailPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_email', 'api');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('view_email', 'api');
    }

    public function manage(User $user, Email $email)
    {
        if(!$user->hasPermissionTo('view_email', 'api')){
            return false;
        }

        return $user->mailboxes()->where('mailboxes.id', $email->mailbox_id)->exists();
    }
}
