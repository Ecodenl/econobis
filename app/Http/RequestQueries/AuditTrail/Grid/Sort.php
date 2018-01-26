<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:30
 */

namespace App\Http\RequestQueries\AuditTrail\Grid;


use App\Helpers\RequestQuery\RequestSort;

class Sort extends RequestSort
{
    protected $fields = [
        'model',
        'field',
        'oldValue',
        'newValue',
        'changedById',
        'updatedAt',
    ];

    protected $mapping = [
        'model' => 'revisions.revisionable_type',
        'field' => 'revisions.key',
        'oldValue' => 'revisions.old_value',
        'newValue' => 'revisions.new_value',
        'changedById'  => 'users.id',
        'updatedAt'  => 'revisions.updated_at',
    ];

    protected $joins = [
        'changedById' => 'users',
    ];
}
