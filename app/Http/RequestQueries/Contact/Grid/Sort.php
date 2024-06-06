<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'id',
        'number',
        'typeName',
        'fullName',
        'streetAndNumber',
        'postalCode',
        'city',
        'emailAddress',
        'phoneNumber',
        'statusName',
        'createdAt',
        'iban',
        'vatNumber',
        'chamberOfCommerceNumber'
    ];

    protected $mapping = [
        'id' => 'contacts.id',
        'number' => 'contacts.number',
        'typeName' => 'contacts.type_id',
        'fullName' => 'contacts.full_name',
        'streetAndNumber' => 'addresses.street',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'emailAddress' => 'email_addresses.email',
        'phoneNumber' => 'phone_numbers.number',
        'statusName' => 'contacts.status_id',
        'createdAt' => 'contacts.created_at',
        'iban' => 'contacts.iban',
        'vatNumber' => 'organisations.vat_number',
        'chamberOfCommerceNumber' => 'organisations.chamber_of_commerce_number',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
        'phoneNumber' => 'phoneNumber',
        'streetAndNumber' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'vatNumber' => 'organisation',
        'chamberOfCommerceNumber' => 'organisation',
    ];
}
