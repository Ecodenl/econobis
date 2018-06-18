<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\PaymentInvoice;


use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\ProductionProject\FullProductionProjectRevenueDistribution;
use Illuminate\Http\Resources\Json\Resource;

class GridPaymentInvoice extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,

            'revenueDistribution' => FullProductionProjectRevenueDistribution::make($this->whenLoaded('revenueDistribution')),

            'statusId' => $this->status_id,
            'status' =>  FullEnumWithIdAndName::make($this->getStatus()),
        ];
    }
}