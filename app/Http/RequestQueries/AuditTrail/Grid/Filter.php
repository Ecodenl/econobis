<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\AuditTrail\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
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

    protected $defaultTypes = [
        '*' => 'ct',
        'changedById' => 'eq',
        'model' => 'eq',
    ];

}
