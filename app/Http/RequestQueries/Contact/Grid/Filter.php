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
        'chamberOfCommerceNumber',
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
        'chamberOfCommerceNumber' => 'organisations.chamber_of_commerce_number',
    ];

    protected $joins = [
        'emailAddress' => 'emailAddress',
        'phoneNumber' => 'phoneNumber',
        'streetAndNumber' => 'address',
        'postalCode' => 'address',
        'city' => 'address',
        'vatNumber' => 'organisation',
        'chamberOfCommerceNumber' => 'organisation'
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'id' => 'eq',
        'typeId' => 'eq',
        'statusId' => 'eq',
    ];

    protected function applyStreetAndNumberFilter($query, $type, $data)
    {
        // Elke zoekterm moet voorkomen in de straat, het huisnummer of de toevoeging.
        $terms = array_filter(explode(' ', $data));

        foreach ($terms as $term) {
            $query->where(function ($query) use ($term) {
                $query->where('addresses.street', 'LIKE', '%' . $term . '%');
                $query->orWhere('addresses.number', 'LIKE', '%' . $term . '%');
                $query->orWhere('addresses.addition', 'LIKE', '%' . $term . '%');
            });
        }

        return false;
    }
}
