<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 01-12-2017
 * Time: 12:09
 */

namespace App\Http\Resources\InvoicePost;

use Illuminate\Http\Resources\Json\JsonResource;

class GridInvoicePost extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'administrationId' => $this->administration_id,
            'filename' => $this->filename,
            'name' => $this->name,
            'createdAt' => $this->created_at,
        ];
    }
}