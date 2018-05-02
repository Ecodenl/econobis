<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestExtraFilter;

class ExtraFilter extends RequestExtraFilter
{
    protected $fields = [
        'name',
        'postalCodeNumber',
    ];

    protected $mapping = [
        'name' => 'contacts.full_name',
    ];

    protected $joins = [
        'postalCodeNumber' => 'address',
    ];

    protected function applyPostalCodeNumberFilter($query, $type, $data)
    {
        $raw = 'SUBSTRING(addresses.postal_code, 1, 4)';
        RequestExtraFilter::applyWhereRaw($query, $raw, $type, $data);
        return false;
    }
}