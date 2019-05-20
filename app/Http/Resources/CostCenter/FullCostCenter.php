<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\CostCenter;

use Illuminate\Http\Resources\Json\Resource;

class FullCostCenter extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'twinfieldCostCenterCode' => $this->twinfield_cost_center_code,
        ];
    }
}