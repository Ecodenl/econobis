<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\FreeFields;

use Illuminate\Http\Resources\Json\JsonResource;

class PeekFreeFieldsFieldFormat extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->format_name,
        ];
    }
}