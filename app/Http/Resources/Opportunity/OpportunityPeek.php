<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Opportunity;


use Illuminate\Http\Resources\Json\Resource;

class OpportunityPeek extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->measure->name . ' ' . $this->status->name,
        ];
    }
}