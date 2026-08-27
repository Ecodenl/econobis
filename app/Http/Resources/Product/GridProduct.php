<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\Product;


use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GridProduct extends JsonResource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'code' => $this->code,
                'name' => $this->name,
                'currentPrice' => GenericResource::make($this->currentPrice),
                'administration' => AdministrationPeek::make($this->whenLoaded('administration')),
               'active' => $this->active,
            ];
    }
}