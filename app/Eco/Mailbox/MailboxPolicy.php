<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MailboxPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\User\User  $model
     * @return mixed
     */
    public function view(User $user)
    {
        return $user->hasPermissionTo('view_mailbox', 'api');
    }

    /**
     * Determine whether the user can create the model.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\User\User  $model
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('create_mailbox', 'api');
    }

}
