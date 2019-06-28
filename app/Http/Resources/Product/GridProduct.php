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
use Illuminate\Http\Resources\Json\Resource;

class GridProduct extends Resource
{
    public function toArray($request)
    {
           return [
                'id' => $this->id,
                'code' => $this->code,
                'name' => $this->name,
                'currentPrice' => GenericResource::make($this->current_price),
                'administration' => AdministrationPeek::make($this->whenLoaded('administration')),
            ];
    }
}