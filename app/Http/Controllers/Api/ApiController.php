<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 18-10-2017
 * Time: 16:16
 */

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    protected function arrayKeysToSnakeCase($array)
    {
        $result = [];

        foreach($array as $key => $value){
            $result[snake_case($key)] = $value;
        }

        return $result;
    }

    protected function sanitizeData(array $array, array $casts)
    {
        foreach($array as $key => $value){
            if(array_key_exists($key, $casts)){
                switch ($casts[$key]){
                    case 'nullable':
                        if(empty($value)){
                            $array[$key] = null;
                        }
                        break;
                    case 'boolean':
                        if(empty($value)){
                            $array[$key] = false;
                        }
                        break;
                }
            }
        }

        return $array;
    }
}