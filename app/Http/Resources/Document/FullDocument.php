<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Document;


use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\DocumentTemplate\FullDocumentTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\ParticipantProductionProject\ParticipantProductionProjectPeek;
use App\Http\Resources\ProductionProject\ProductionProjectPeek;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\Resource;

class FullDocument extends Resource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'name' => $this->name,
            'description' => $this->description,
            'documentType' => FullEnumWithIdAndName::make($this->getDocumentType()),
            'documentGroup' => FullEnumWithIdAndName::make($this->getDocumentGroup()),
            'freeText1' => $this->free_text_1,
            'freeText2' => $this->free_text_2,
            'filename' => $this->filename,
            'contactId' => $this->contact_id,
            'contact' => FullContact::make($this->whenLoaded('contact')),
            'intakeId' => $this->intake_id,
            'intake' => FullIntake::make($this->whenLoaded('intake')),
            'contactGroupId' => $this->contact_group_id,
            'contactGroup' => FullContactGroup::make($this->whenLoaded('contactGroup')),
            'opportunityId' => $this->opportunity_id,
            'opportunity' => FullOpportunity::make($this->whenLoaded('opportunity')),
            'campaignId' => $this->campaign_id,
            'campaign' => FullCampaign::make($this->whenLoaded('campaign')),
            'housingFileId' => $this->housing_file_id,
            'housingFile' => FullHousingFile::make($this->whenLoaded('housingFile')),
            'quotationRequestId' => $this->quotation_request_id,
            'quotationRequest' => FullQuotationRequest::make($this->whenLoaded('quotationRequest')),
            'measureId' => $this->measure_id,
            'measure' => FullMeasure::make($this->whenLoaded('measure')),
            'taskId' => $this->task_id,
            'task' => FullOpportunity::make($this->whenLoaded('task')),
            'productionProjectId' => $this->production_project_id,
            'productionProject' => ProductionProjectPeek::make($this->whenLoaded('productionProject')),
            'participantId' => $this->participation_production_project_id,
            'participant' => ParticipantProductionProjectPeek::make($this->whenLoaded('participant')),
            'sentBy' => FullUser::make($this->whenLoaded('sentBy')),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'template' => FullDocumentTemplate::make($this->whenLoaded('template')),
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}