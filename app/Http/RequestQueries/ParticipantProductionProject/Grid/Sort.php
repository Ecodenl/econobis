<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ParticipantProductionProject\Grid;


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
        'participationStatusId',
        'dateRegister',
        'energySupplier'
    ];

    protected $mapping = [
        'id' => 'participation_production_project.id',
        'contactType' => 'contacts.type_id',
        'name' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'statusId' => 'contacts.status_id',
        'participationStatusId' => 'participation_production_project.status_id',
        'dateRegister' => 'participation_production_project.date_register',
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
    ];
}