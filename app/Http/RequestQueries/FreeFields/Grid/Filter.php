<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 11:48
 */

namespace App\Http\RequestQueries\FreeFields\Grid;


use App\Helpers\RequestQuery\RequestFilter;

class Filter extends RequestFilter
{
    protected $fields = [
        'tableName',
        'fieldName',
        'fieldFormatName'
    ];

    protected $mapping = [
        'tableName' => 'free_fields_tables.name',
        'fieldName' => 'field_name',
        'fieldFormatName' => 'free_fields_field_formats.format_name',
    ];

    protected $joins = [
        'freeFieldsTable' => 'free_fields_tables',
        'freeFieldsFieldFormat' => 'free_fields_field_formats',
    ];

    protected $defaultTypes = [
        '*' => 'ct',
        'tableName' => 'eq',
        'fieldName' => 'eq',
        'fieldFormatName' => 'eq',
    ];

}
