<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-11-2017
 * Time: 12:40
 */

namespace App\Http\Resources\User;


use Illuminate\Http\Resources\Json\ResourceCollection;

class GridUserCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'data' => GridUser::collection($this->collection),
        ];
    }
}