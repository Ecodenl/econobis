<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\Document\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'number',
        'date',
        'filename',
        'contact',
        'documentType',
        'documentGroup',
    ];

    protected $mapping = [
        'name' => 'documents.number',
        'date' => 'documents.created_at',
        'filename' => 'documents.filename',
        'contact' => 'contacts.full_name',
        'documentType'  => 'documents.document_type',
        'documentGroup'  => 'documents.document_group',
    ];

    protected $joins = [
        'contact' => 'contacts',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'typeId' => 'eq',
        'groupId' => 'eq',
    ];

}
