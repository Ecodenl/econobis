<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 19-12-2017
 * Time: 15:27
 */

namespace App\Http\Resources\Campaign;

use App\Http\Resources\Contact\FullContact;
use Illuminate\Http\Resources\Json\JsonResource;

class FullCampaignResponse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'address' => $this->contact ? $this->contact->primaryAddress : null,
            'dateResponded' => $this->date_responded,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}