<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Campaign;


use Illuminate\Http\Resources\Json\Resource;

class CampaignPeek extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}