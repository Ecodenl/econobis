<?php

namespace App\Http\Resources\Campaign;

use App\Eco\Contact\Contact;
use App\Http\Resources\Contact\FullCoach;
use App\Http\Resources\Document\FullDocument;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Organisation\FullOrganisation;
use App\Http\Resources\Task\GridTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullCampaign extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $organisationsOrCoaches = Contact::whereIn('id', $this->organisationsOrCoachesIds())->orderBy('full_name')->get();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'number' => $this->number,
            'description' => $this->description,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'createdAt' => $this->created_at,
            'status' => GenericResource::make($this->whenLoaded('status')),
            'type' => GenericResource::make($this->whenLoaded('type')),
            'measureCategories' => GenericResource::collection($this->whenLoaded('measureCategories')),
            'responses' => FullCampaignResponse::collection($this->whenLoaded('responses')),
            'organisations' => FullOrganisation::collection($this->whenLoaded('organisations')),
            'coaches' => FullCoach::collection($this->whenLoaded('coaches')),
            'organisationsOrCoaches' => FullCoach::collection($organisationsOrCoaches),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'ownedBy' => FullUser::make($this->whenLoaded('ownedBy')),
            'taskCount' => $this->tasks()->count(),
            'relatedTasks' => GridTask::collection($this->whenLoaded('tasks')),
            'noteCount' => $this->notes()->count(),
            'relatedNotes' => GridTask::collection($this->whenLoaded('notes')),
            'documentCount' => $this->documents()->count(),
            'relatedDocuments' => FullDocument::collection($this->whenLoaded('documents')),
            'numberOfIntakes' => $this->numberOfIntakes,
        ];
    }
}
