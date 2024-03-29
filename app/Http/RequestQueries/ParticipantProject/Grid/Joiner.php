<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\ParticipantProject\Grid;


use App\Helpers\RequestQuery\RequestJoiner;
use Illuminate\Support\Facades\DB;

class Joiner extends RequestJoiner
{
    protected function applyContactsJoin($query)
    {
        $query->join('contacts', 'participation_project.contact_id', '=', 'contacts.id');
    }

    protected function applyPeopleJoin($query)
    {
        $query->join('contacts', 'participation_project.contact_id', '=', 'contacts.id');
        $query->join('people', 'people.contact_id', '=', 'contacts.id');
    }

    protected function applyAddressesJoin($query)
    {
        $query->join('addresses', 'participation_project.contact_id', '=', 'addresses.contact_id')->where('primary', true)
            ->whereNull('addresses.deleted_at');
    }

    protected function applyEnergySuppliersJoin($query)
    {
        $query->leftJoin('address_energy_suppliers', function($join)
        {
            $join->on('participation_project.address_id', '=', 'address_energy_suppliers.address_id');
            $join->on('address_energy_suppliers.is_current_supplier','=', DB::raw('1'));
        });
        $query->leftJoin('energy_suppliers', 'address_energy_suppliers.energy_supplier_id', '=', 'energy_suppliers.id');
    }

    protected function applyParticipantMutationsJoin($query)
    {
        $query->leftJoin('participant_mutations', 'participation_project.id', '=', 'participant_mutations.participation_id');
    }
}