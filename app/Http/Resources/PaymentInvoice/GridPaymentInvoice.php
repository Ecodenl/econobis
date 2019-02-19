<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\PaymentInvoice;


use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\Project\FullProjectRevenueDistribution;
use Illuminate\Http\Resources\Json\Resource;

class GridPaymentInvoice extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,

            'revenueDistribution' => FullProjectRevenueDistribution::make($this->whenLoaded('revenueDistribution')),

            'statusId' => $this->status_id,
            'status' =>  FullEnumWithIdAndName::make($this->getStatus()),
        ];
    }
}