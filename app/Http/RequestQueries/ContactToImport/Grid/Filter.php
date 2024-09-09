<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\ContactToImport\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'status',
        'firstName',
        'lastName',
        'street',
        'postalCode',
        'city',
        'emailContact',
    ];

    protected $mapping = [
        'status' => 'contact_to_imports.status',
        'firstName' => 'contact_to_imports.first_name',
        'lastName' => 'contact_to_imports.last_name',
        'street' => 'contact_to_imports.street',
        'postalCode' => 'contact_to_imports.postal_code',
        'city' => 'contact_to_imports.city',
        'emailContact' => 'contact_to_imports.email_contact',
    ];

    protected $joins = [];

    protected $defaultTypes = [
        '*' => 'ct',
        'createdById' => 'eq',
    ];
}
