<?php

namespace App\Eco\AddressEnergySupplier;

use App\Eco\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AddressEnergySupplierPolicy
{
    use HandlesAuthorization;


    /**
     * Determine whether the user can view the addressEnergySupplier.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\AddressEnergySupplier\AddressEnergySupplier  $addressEnergySupplier
     * @return mixed
     */
    public function view(User $user, AddressEnergySupplier $addressEnergySupplier)
    {
        return $user->can('view', $addressEnergySupplier->address>contact);
    }

    /**
     * Determine whether the user can create addressEnergySuppliers.
     *
     * @param  \App\Eco\User\User  $user
     * @return mixed
     */
    public function create(User $user, AddressEnergySupplier $addressEnergySupplier)
    {
        return $user->can('update', $addressEnergySupplier->address->contact);
    }

    /**
     * Determine whether the user can update the addressEnergySupplier.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\AddressEnergySupplier\AddressEnergySupplier  $addressEnergySupplier
     * @return mixed
     */
    public function update(User $user, AddressEnergySupplier $addressEnergySupplier)
    {
        return $user->can('update', $addressEnergySupplier->address>contact);
    }

    /**
     * Determine whether the user can delete the addressEnergySupplier.
     *
     * @param  \App\Eco\User\User  $user
     * @param  \App\Eco\AddressEnergySupplier\AddressEnergySupplier  $addressEnergySupplier
     * @return mixed
     */
    public function delete(User $user, AddressEnergySupplier $addressEnergySupplier)
    {
        return $user->can('update', $addressEnergySupplier->address>contact);
    }
}
