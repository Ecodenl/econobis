<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\ContactToImport\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'initials',
        'firstName',
        'lastName',
        'street',
        'postalCode',
        'city',
        'emailContact',
    ];

    protected $mapping = [
        'initials' => 'contact_to_imports.initials',
        'firstName' => 'contact_to_imports.first_name',
        'lastName' => 'contact_to_imports.last_name',
        'street' => 'contact_to_imports.street',
        'postalCode' => 'contact_to_imports.postal_code',
        'city' => 'contact_to_imports.city',
        'emailContact' => 'contact_to_imports.email_contact',
    ];

    protected $joins = [];
}