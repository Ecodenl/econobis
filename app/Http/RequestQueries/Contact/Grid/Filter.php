<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestFilter;
use Illuminate\Support\Facades\DB;

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
        'createdAt',
        'iban',
        'vatNumber',
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
        'createdAt' => 'contacts.created_at',
        'iban' => 'contacts.iban',
        'vatNumber' => 'organisations.vat_number',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
        'phoneNumber' => 'phoneNumber',
        'streetAndNumber' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'vatNumber' => 'organisation',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'id' => 'eq',
        'typeId' => 'eq',
        'statusId' => 'eq',
    ];


    protected function applyStreetAndNumberFilter($query, $type, $data)
    {
        $data = str_replace(' ', '', $data);

        $query->whereRaw('concat(IFNULL(addresses.street,\'\'), IFNULL(addresses.number,\'\'),  IFNULL(addresses.addition,\'\')) LIKE ' . DB::connection()->getPdo()->quote('%' . $data . '%'));

        return false;
    }
}
