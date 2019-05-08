<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ParticipantProject\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{
    protected $fields = [
        'id',
        'contactType',
        'name',
        'address',
        'postalCode',
        'city',
        'statusId',
        'participantMutationStatusId',
        'dateRegister',
        'energySupplier'
    ];

    protected $mapping = [
        'id' => 'participation_project.id',
        'contactType' => 'contacts.type_id',
        'name' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'statusId' => 'contacts.status_id',
        'participantMutationStatusId' => 'participant_mutations.status_id',
        'dateRegister' => 'participation_project.date_register',
        'energySupplier' => 'energy_suppliers.name',
        'address' => 'addresses.street',
    ];

    protected $joins = [
        'contactType' => 'contacts',
        'name' => 'contacts',
        'address' => 'addresses',
        'postalCode' => 'addresses',
        'city' => 'addresses',
        'statusId' => 'contacts',
        'energySupplier' => 'energy_suppliers',
        'participantMutationStatusId' => 'participant_mutations',
    ];
}