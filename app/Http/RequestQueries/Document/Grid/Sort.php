<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\Document\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{

    protected $fields = [
        'id',
        'number',
        'date',
        'filename',
        'contact',
        'documentType',
        'documentGroup',
    ];

    protected $mapping = [
        'id' => 'documents.id',
        'date' => 'documents.created_at',
        'filename' => 'documents.filename',
        'contact' => 'contacts.full_name',
        'documentType'  => 'documents.document_type',
        'documentGroup'  => 'documents.document_group',
    ];

    protected $joins = [
        'contact' => 'contacts',
    ];
}
