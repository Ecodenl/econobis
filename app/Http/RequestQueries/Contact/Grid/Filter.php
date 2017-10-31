<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'id',
        'number',
        'typeId',
        'fullName',
        'streetAndNumber',
        'postalCode',
        'city',
        'emailAddress',
        'phoneNumber',
        'statusId',
        'createdAt',
    ];

    protected $mapping = [
        'id' => 'contacts.id',
        'number' => 'contacts.number',
        'typeId' => 'contacts.type_id',
        'fullName' => 'contacts.full_name',
        'postalCode' => 'addresses.postal_code',
        'city' => 'addresses.city',
        'emailAddress' => 'email_addresses.email',
        'phoneNumber' => 'phone_numbers.number',
        'statusId' => 'contacts.status',
        'createdAt' => 'contacts.created_at',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
        'phoneNumber' => 'phoneNumber',
        'streetAndNumber' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'id' => 'eq',
        'typeId' => 'eq',
        'statusId' => 'eq',
    ];


    protected function applyStreetAndNumberFilter($query, $type, $data)
    {
        $query->where(function($query) use ($type, $data) {
            $this->applyFilter($query, 'addresses.street', $type, $data);
            $query->orWhere(function($query) use ($data, $type) {
                $this->applyFilter($query, 'addresses.number', $type, $data);
            });
        });

        return false;
    }
}