<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 11:49
 */

namespace App\Http\Resources\PortalFreeFields;

use Illuminate\Http\Resources\Json\JsonResource;

class GridPortalFreeFieldsPages extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isActive' => $this->is_active,
            'description' => $this->description,
            'urPageRef' => $this->url_page_ref,
        ];
    }
}