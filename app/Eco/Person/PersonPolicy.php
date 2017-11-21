<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 21-11-2017
 * Time: 11:17
 */

namespace App\Eco\Person;


use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PersonPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the person.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Person\Person  $person
     * @return mixed
     */
    public function view(User $user, Person $person)
    {
        return $user->hasPermissionTo('view_person', 'api');
    }

    /**
     * Determine whether the user can create persons.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, Person $person = null)
    {
        return $user->hasPermissionTo('create_person', 'api');
    }

    /**
     * Determine whether the user can update the person.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Person\Person  $person
     * @return mixed
     */
    public function update(User $user, Person $person)
    {
        return $user->hasPermissionTo('update_person', 'api');
    }

    /**
     * Determine whether the user can delete the person.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Person\Person  $person
     * @return mixed
     */
    public function delete(User $user, Person $person)
    {
        return $user->hasPermissionTo('delete_person', 'api');
    }
}