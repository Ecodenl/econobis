<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 26-10-2017
 * Time: 12:08
 */

namespace App\Http\Resources\Campaign;


use Illuminate\Http\Resources\Json\JsonResource;

class CampaignWorkflowStatusPeek extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->opportunityAction ? $this->opportunityAction->name . ' - ' . $this->name : $this->name,
        ];
    }
}