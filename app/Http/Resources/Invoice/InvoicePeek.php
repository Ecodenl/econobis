<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Invoice;


use Illuminate\Http\Resources\Json\JsonResource;

class InvoicePeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->number,
        ];
    }
}