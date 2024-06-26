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
        'firstName',
        'lastName',
        'street',
        'postalCode',
        'city',
        'emailContact',
        'emailInvoices',
    ];

    protected $mapping = [
        'firstName' => 'contacts_to_import.first_name',
        'lastName' => 'contacts_to_import.last_name',
        'street' => 'contacts_to_import.street',
        'postalCode' => 'contacts_to_import.postal_code',
        'city' => 'contacts_to_import.city',
        'emailContact' => 'contacts_to_import.email_contact',
        'emailInvoices' => 'contacts_to_import.email_invoices',
    ];

    protected $joins = [];
}
