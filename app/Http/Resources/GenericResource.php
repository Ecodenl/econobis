<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 29-11-2017
 * Time: 16:27
 */

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\Resource;

class GenericResource extends Resource
{
    public function toArray($request)
    {
        $attributes = $this->resource->toArray();

        return $this->arrayKeysToCamelCase($attributes);
    }

    protected function arrayKeysToCamelCase($array)
    {
        $result = [];

        foreach ($array as $key => $value) {
            if($key === 'pivot') continue;

            if (is_array($value)) $value = $this->arrayKeysToCamelCase($value);

            $result[camel_case($key)] = $value;
        }

        return $result;
    }
}