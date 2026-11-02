<?php

namespace App\Eco\EmailTemplate;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmailTemplatePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function view(User $user)
    {
        return $user->hasPermissionTo('view_email_template', 'api');
    }

    /**
     * Determine whether the user can create the model.
     *
     * Beheer van e-mail templates (aanmaken, dupliceren, wijzigen en verwijderen)
     * is voorbehouden aan de rol "Beheerder e-mail templates" en aan "Beheerder".
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermissionTo('manage_email_template', 'api');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function update(User $user)
    {
        return $user->hasPermissionTo('manage_email_template', 'api');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function delete(User $user)
    {
        return $user->hasPermissionTo('manage_email_template', 'api');
    }

}
