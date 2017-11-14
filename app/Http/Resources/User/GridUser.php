<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 14-11-2017
 * Time: 12:40
 */

namespace App\Http\Resources\User;


use Illuminate\Http\Resources\Json\Resource;

class GridUser extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'fullLastName' => $this->present()->fullLastName(),
            'email' => $this->email,
        ];
    }
}