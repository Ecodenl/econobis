<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 24-10-2017
 * Time: 10:29
 */

namespace App\Helpers\RequestQuery;


use Illuminate\Support\Facades\DB;

abstract class RequestExtraFilter extends RequestFilter
{
    protected $parameterName = 'extraFilters';

    public static function applyWhereRaw($query, $raw, $type, $data){
        switch ($type) {
            case 'eq':
                $query->whereRaw('(' . $raw . ') =' . DB::connection()->getPdo()->quote($data));
                break;
            case 'neq':
                $query->whereRaw('(' . $raw . ') !=' . DB::connection()->getPdo()->quote($data));
                break;
            case 'ct':
                $query->whereRaw('(' . $raw . ') LIKE ' . DB::connection()->getPdo()->quote('%' . $data  . '%'));
                break;
            case 'lt':
                $query->whereRaw('(' . $raw . ') < ' . DB::connection()->getPdo()->quote($data));
                break;
            case 'lte':
                $query->whereRaw('(' . $raw . ') <= ' . DB::connection()->getPdo()->quote($data));
                break;
            case 'gt':
                $query->whereRaw('(' . $raw . ') > ' . DB::connection()->getPdo()->quote($data));
                break;
            case 'gte':
                $query->whereRaw('(' . $raw . ') >=' . DB::connection()->getPdo()->quote($data));
                break;
            case 'bw':
                $query->whereRaw('(' . $raw . ') LIKE ' . DB::connection()->getPdo()->quote($data . '%'));
                break;
            case 'nbw':
                $query->whereRaw('(' . $raw . ') NOT LIKE ' . DB::connection()->getPdo()->quote($data . '%'));
                break;
            case 'ew':
                $query->whereRaw('(' . $raw . ') LIKE ' . DB::connection()->getPdo()->quote('%' . $data));
                break;
            case 'new':
                $query->whereRaw('(' . $raw . ') NOT LIKE ' . DB::connection()->getPdo()->quote('%' . $data));
                break;
        }
    }

    public static function applyHavingFilter($query, $mappedField, $type, $data)
    {
        switch ($type) {
            case 'eq':
                $query->having($mappedField, '=', $data);
                break;
            case 'neq':
                $query->having($mappedField, '!=', $data);
                break;
            case 'ct':
                $query->having($mappedField, 'LIKE', '%' . $data . '%');
                break;
            case 'lt':
                $query->having($mappedField, '<', $data);
                break;
            case 'lte':
                $query->having($mappedField, '<=', $data);
                break;
            case 'gt':
                $query->having($mappedField, '>', $data);
                break;
            case 'gte':
                $query->having($mappedField, '>=', $data);
                break;
            case 'bw':
                $query->having($mappedField, 'LIKE', $data . '%');
                break;
            case 'nbw':
                $query->having($mappedField, 'NOT LIKE', $data . '%');
                break;
            case 'ew':
                $query->having($mappedField, 'LIKE', '%' . $data);
                break;
            case 'new':
                $query->having($mappedField, 'NOT LIKE', '%' . $data);
                break;
            case 'nl':
                $query->having($mappedField);
                break;
            case 'nnl':
                $query->having($mappedField);
                break;
        }
    }
}