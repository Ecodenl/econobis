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
                $query->whereRaw('(' . $raw . ') LIKE %' . DB::connection()->getPdo()->quote($data) . '%');
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
                $query->whereRaw('(' . $raw . ') LIKE' . DB::connection()->getPdo()->quote($data) . '%');
                break;
            case 'nbw':
                $query->whereRaw('(' . $raw . ') NOT LIKE' . DB::connection()->getPdo()->quote($data) . '%');
                break;
            case 'ew':
                $query->whereRaw('(' . $raw . ') LIKE %' . DB::connection()->getPdo()->quote($data));
                break;
            case 'new':
                $query->whereRaw('(' . $raw . ') NOT LIKE %' . DB::connection()->getPdo()->quote($data));
                break;
        }
    }
}