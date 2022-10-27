<?php

namespace App\Eco\Mailbox;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MailgunDomainPolicy
{
    use HandlesAuthorization;

    public function view(User $user)
    {
        return $user->hasPermissionTo('view_mailbox', 'api');
    }

    public function create(User $user)
    {
        return $user->hasPermissionTo('manage_mailgun_domain', 'api');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('manage_mailgun_domain', 'api');
    }

}
