<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\ParticipantProject\Grid;


use App\Helpers\RequestQuery\RequestJoiner;

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
        $query->join('addresses', 'participation_project.contact_id', '=', 'addresses.contact_id')->where('primary', true);
    }

    protected function applyEnergySuppliersJoin($query)
    {
        $query->join('contact_energy_supplier', 'participation_project.contact_id', '=', 'contact_energy_supplier.contact_id')->where('is_current_supplier', true);
        $query->join('energy_suppliers', 'contact_energy_supplier.energy_supplier_id', '=', 'energy_suppliers.id');
    }

    protected function applyParticipantMutationsJoin($query)
    {
        $query->join('participant_mutations', 'participation_project.id', '=', 'participant_mutations.participation_id');
    }
}