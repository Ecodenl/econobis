<?php

namespace App\Eco\Account;

use App\Eco\User\User;
use App\Eco\Account\Account;
use Illuminate\Auth\Access\HandlesAuthorization;

class AccountPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the account.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Account\Account  $account
     * @return mixed
     */
    public function view(User $user, Account $account)
    {
        return $user->hasPermissionTo('view_account', 'api');
    }

    /**
     * Determine whether the user can create accounts.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, Account $account = null)
    {
        return $user->hasPermissionTo('create_account', 'api');
    }

    /**
     * Determine whether the user can update the account.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Account\Account  $account
     * @return mixed
     */
    public function update(User $user, Account $account)
    {
        return $user->hasPermissionTo('update_account', 'api');
    }

    /**
     * Determine whether the user can delete the account.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\Account\Account  $account
     * @return mixed
     */
    public function delete(User $user, Account $account)
    {
        return $user->hasPermissionTo('delete_account', 'api');
    }
}
