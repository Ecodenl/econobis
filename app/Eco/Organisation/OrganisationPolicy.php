<?php

namespace App\Eco\Organisation;

use App\Eco\User\User;
use App\Eco\Organisation\Organisation;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrganisationPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the organisation.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Organisation\Organisation $organisation
     * @return mixed
     */
    public function view(User $user, Organisation $organisation)
    {
        return $user->hasPermissionTo('view_organisation', 'api');
    }

    /**
     * Determine whether the user can create organisations.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, Organisation $organisation = null)
    {
        return $user->hasPermissionTo('create_organisation', 'api');
    }

    /**
     * Determine whether the user can update the organisation.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Organisation\Organisation  $organisation
     * @return mixed
     */
    public function update(User $user, Organisation $organisation)
    {
        return $user->hasPermissionTo('update_organisation', 'api');
    }

    /**
     * Determine whether the user can delete the organisation.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Organisation\Organisation  $organisation
     * @return mixed
     */
    public function delete(User $user, Organisation $organisation)
    {
        return $user->hasPermissionTo('delete_organisation', 'api');
    }
}
