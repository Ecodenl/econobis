<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\Document;


use App\Http\Resources\Administration\AdministrationPeek;
use App\Http\Resources\Campaign\FullCampaign;
use App\Http\Resources\Contact\FullContact;
use App\Http\Resources\ContactGroup\FullContactGroup;
use App\Http\Resources\DocumentTemplate\FullDocumentTemplate;
use App\Http\Resources\EnumWithIdAndName\FullEnumWithIdAndName;
use App\Http\Resources\HousingFile\FullHousingFile;
use App\Http\Resources\Measure\FullMeasure;
use App\Http\Resources\Opportunity\FullOpportunity;
use App\Http\Resources\Intake\FullIntake;
use App\Http\Resources\Order\OrderPeek;
use App\Http\Resources\ParticipantProject\ParticipantProjectPeek;
use App\Http\Resources\Project\ProjectPeek;
use App\Http\Resources\QuotationRequest\FullQuotationRequest;
use App\Http\Resources\Task\FullTask;
use App\Http\Resources\User\FullUser;
use Illuminate\Http\Resources\Json\JsonResource;

class FullDocument extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'number' => $this->number,
            'name' => $this->name,
            'description' => $this->description ? $this->description : $this->filename,
            'documentCreatedFromId' => $this->document_created_from_id,
            'documentCreatedFrom' => FullDocumentCreatedFrom::make($this->whenLoaded('documentCreatedFrom')),
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
            'task' => FullTask::make($this->whenLoaded('task')),
            'projectId' => $this->project_id,
            'project' => ProjectPeek::make($this->whenLoaded('project')),
            'participantId' => $this->participation_project_id,
            'participant' => ParticipantProjectPeek::make($this->whenLoaded('participant')),
            'orderId' => $this->order_id,
            'order' => OrderPeek::make($this->whenLoaded('order')),
            'administrationId' => $this->administration_id,
            'administration' => AdministrationPeek::make($this->whenLoaded('administration')),
            'sentBy' => FullUser::make($this->whenLoaded('sentBy')),
            'createdBy' => FullUser::make($this->whenLoaded('createdBy')),
            'template' => FullDocumentTemplate::make($this->whenLoaded('template')),
            'htmlBody' => $this->html_body,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'showOnPortal' => $this->show_on_portal,
        ];
    }
}