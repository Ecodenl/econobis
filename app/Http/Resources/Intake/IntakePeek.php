<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Intake;


use Illuminate\Http\Resources\Json\Resource;

class IntakePeek extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->address ? $this->address->present()->streetAndNumber(): 'Intake: ' . $this->id,
        ];
    }
}