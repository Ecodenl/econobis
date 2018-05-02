<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Order;


use Illuminate\Http\Resources\Json\Resource;

class OrderPeek extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->subject,
            'number' => $this->number,
        ];
    }
}