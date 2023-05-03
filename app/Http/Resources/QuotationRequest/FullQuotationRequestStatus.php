<?php

namespace App\Http\Resources\QuotationRequest;

use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullQuotationRequestStatus extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function toArray($request)
    {
        return
            [
                'id' => $this->id,
                'name' => $this->name,
                'codeRef' => $this->code_ref,
                'opportunityActionName' => $this->opportunityAction->name,
            ];
    }
}
