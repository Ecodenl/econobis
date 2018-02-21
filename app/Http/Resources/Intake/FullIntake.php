<?php

namespace App\Http\Resources\Intake;

use App\Http\Resources\Address\FullAddress;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;
use App\Eco\Contact\Contact;
use App\Eco\Address\Address;
use App\Eco\Measure\Measure;

class FullIntake extends Resource
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
                'contact' => FullContact::make($this->whenLoaded('contact')),
                'address' => FullAddress::make($this->whenLoaded('address')),
                'name' => 'Intake: ' . $this->id . ' voor ' . $this->contact->full_name,
                'fullAddress' => $this->address->present()->streetAndNumber(),
                'campaign' => FullCampaign::make($this->whenLoaded('campaign')),
                'status' => GenericResource::make($this->whenLoaded('status')),
                'sources' => GenericResource::collection($this->whenLoaded('sources')),
                'reasons' => GenericResource::collection($this->whenLoaded('reasons')),
                'note' => $this->note,
                'measuresRequested' => FullMeasure::collection($this->whenLoaded('measuresRequested')),
                'opportunities' => FullOpportunity::collection($this->whenLoaded('opportunities')),
                'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
                'updatedBy' => FullUser::make($this->whenLoaded('updatedBy')),
                'createdAt' => $this->created_at,
                'updatedAt' => $this->updated_at,
                'taskCount' => $this->tasks()->count(),
                'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
                'noteCount' => $this->notes()->count(),
                'relatedNotes' => GridTask::collection($this->whenLoaded('notes')),
                'documentCount' => $this->documents()->count(),
                'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
                'emailSentCount' => $this->relatedEmailsSent ? $this->relatedEmailsSent->count() : 0,
                'relatedEmailsSent' => $this->relatedEmailsSent,
                'measureRequestedWithOpportunityIds' => $this->measureRequestedWithOpportunityIds,
            ];
    }
}
