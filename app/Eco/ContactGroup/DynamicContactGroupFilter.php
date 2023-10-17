<?php

namespace App\Eco\ContactGroup;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\HousingFile\EnergyLabelStatus;
use App\Eco\HousingFile\HousingFileHoomHousingStatus;
use App\Eco\HousingFile\HousingFileHoomLink;
use App\Eco\HousingFile\RoofType;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Occupation\Occupation;
use App\Eco\Opportunity\OpportunityEvaluationStatus;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Order\OrderStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use JosKolenberg\Enum\EnumNotFoundException;

class DynamicContactGroupFilter extends Model
{
    protected $table = 'dynamic_contact_group_filter';
    protected $guarded = ['id'];

    //Niet weghalen! Deze model heeft zelf geen resource
    protected $appends = ['dataName'];

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    public function parentHousingFileFieldFilter()
    {
        return DynamicContactGroupFilter::where('contact_group_id', $this->contact_group_id)->where('field', 'housingFileFieldName')->where('connect_name', $this->connected_to)->first();
    }

    public function parentFreeFieldsFieldFilter()
    {
        return DynamicContactGroupFilter::where('contact_group_id', $this->contact_group_id)->where('field', 'freeFieldsFieldName')->where('connect_name', $this->connected_to)->first();
    }

    public function getDataNameAttribute()
    {
        if (!$this->model_name) {
            //Datums  omzetten
            if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/", $this->data))  return Carbon::parse($this->data)->format('d-m-Y');

            // Booleans omzetten
            $yesNoFields = ['didAcceptAgreement', 'didAgreeAvg', 'portalUser', 'housingFileExists','didUnderstandInfo'];
            if (in_array($this->field, $yesNoFields)) return $this->data ? 'Ja' : 'Nee';

            // opportunityMeasureCategory omzetten
            if ($this->field == 'opportunityMeasureCategory'){
                if($this->data){
                    $measureCategory = MeasureCategory::find($this->data);
                    return $measureCategory ? $measureCategory->name : ''   ;
                }
                return '';
            }
            // opportunityStatus omzetten
            if ($this->field == 'opportunityStatus'){
                if($this->data){
                    $opportunityStatus = OpportunityStatus::find($this->data);
                    return $opportunityStatus ? $opportunityStatus->name : ''   ;
                }
                return '';
            }
            // opportunityMeasure omzetten
            if ($this->field == 'opportunityMeasure'){
                if($this->data){
                    $measure = Measure::find($this->data);
                    return $measure ? $measure->name : ''   ;
                }
                return '';
            }
            // opportunityEvaluationRealised omzetten
            if ($this->field == 'opportunityEvaluationRealised'){
                if($this->data){
                    $opportunityEvaluationStatus = OpportunityEvaluationStatus::find($this->data);
                    return $opportunityEvaluationStatus ? $opportunityEvaluationStatus->name : ''   ;
                }
                return '';
            }
            // opportunityCampaign omzetten
            if ($this->field == 'opportunityCampaign'){
                if($this->data){
                    $campaign = Campaign::find($this->data);
                    return $campaign ? $campaign->name : ''   ;
                }
                return '';
            }
            // intakeMeasureCategory omzetten
            if ($this->field == 'intakeMeasureCategory'){
                if($this->data){
                    $measureCategory = MeasureCategory::find($this->data);
                    return $measureCategory ? $measureCategory->name : ''   ;
                }
                return '';
            }
            // intakeStatus omzetten
            if ($this->field == 'intakeStatus'){
                if($this->data){
                    $intakeStatus = IntakeStatus::find($this->data);
                    return $intakeStatus ? $intakeStatus->name : ''   ;
                }
                return '';
            }
            // quotationRequestStatusOrganisationOrCoach en quotationRequestStatusOccupant omzetten
            if ($this->field == 'quotationRequestStatusOrganisationOrCoach' || $this->field == 'quotationRequestStatusOccupant'){
                if($this->data){
                    $quotationRequestStatus = QuotationRequestStatus::find($this->data);
                    return $quotationRequestStatus ? $quotationRequestStatus->name : ''   ;
                }
                return '';
            }

            // orderStatus omzetten
            if ($this->field == 'orderStatus'){
                if($this->data){
                    return OrderStatus::get($this->data)->name;
                }
                return '';
            }
            // housingFileFieldName omzetten
            if ($this->field == 'housingFileFieldName'){
                if($this->data){
                    $housingFileHoomLink = HousingFileHoomLink::find($this->data);
                    return $housingFileHoomLink ? $housingFileHoomLink->label : '';
                }
                return '';
            }
            // housingFileFieldValue omzetten
            if ($this->field == 'housingFileFieldValue'){
                if($this->data){
                    $parentDynamicContactGroupFilter = $this->parentHousingFileFieldFilter();
                    $arrayHousingFileHoomLinkSelectDropdownFieldsIds = HousingFileHoomLink::whereIn('external_hoom_short_name', HousingFileHoomLink::SELECT_DROPDOWN_FIELDS)->pluck('id')->toArray();

                    if($parentDynamicContactGroupFilter && in_array($parentDynamicContactGroupFilter->data, $arrayHousingFileHoomLinkSelectDropdownFieldsIds ) ){
                        $housingFileHoomLink = HousingFileHoomLink::find($parentDynamicContactGroupFilter->data);
                        if($housingFileHoomLink){
                            if($housingFileHoomLink->external_hoom_short_name == 'building-type-category') {
                                return BuildingType::find($this->data)->name;
                            } elseif ($housingFileHoomLink->external_hoom_short_name == 'roof-type') {
                                return RoofType::find($this->data)->name;
                            } elseif ($housingFileHoomLink->external_hoom_short_name == 'energy-label') {
                                return EnergyLabel::find($this->data)->name;
                            } elseif ($housingFileHoomLink->external_hoom_short_name == 'energy-label-status') {
                                return EnergyLabelStatus::find($this->data)->name;
                            } else {
                                $housingFileHoomHousingStatus = HousingFileHoomHousingStatus::where('external_hoom_short_name', $housingFileHoomLink->external_hoom_short_name)->where('hoom_status_value', $this->data)->first();
                                return $housingFileHoomHousingStatus ? $housingFileHoomHousingStatus->hoom_status_name : 'onbekend';
                            }
                        }
                    }
                }
            }

            // freeFieldsFieldName omzetten
            if ($this->field == 'freeFieldsFieldName'){
                if($this->data){
                    $freeFieldsField = FreeFieldsField::find($this->data);
                    return $freeFieldsField ? $freeFieldsField->freeFieldsTable->name . ' / '. $freeFieldsField->field_name : '';
                }
                return '';
            }
            // freeFieldsFieldValue omzetten
            if ($this->field == 'freeFieldsFieldValue'){
                if($this->data){
                    $parentDynamicContactGroupFilter = $this->parentFreeFieldsFieldFilter();

                    return '@@nog waarde ophalen';
                }
            }

            // participantMutationTypeId omzetten
            if ($this->field == 'participantMutationTypeId'){
                if($this->data){
                    return ParticipantMutationType::find($this->data)->name;
                }
                return '';
            }

            // participantMutationStatusId omzetten
            if ($this->field == 'participantMutationStatusId'){
                if($this->data){
                    return ParticipantMutationStatus::find($this->data)->name;
                }
                return '';
            }

            return $this->data;
        }

        try {
            $model = $this->model_name::find($this->data);

            if($model)
            {
                switch ($this->model_name) {
                    case Occupation::class:
                        $name = $model->primary_occupation;
                        break;
                    case Contact::class:
                        $name = $model->full_name;
                        break;
                    default:
                        $name = $model->name;
                }
            }else{
                $name = '';
            }
       } catch (EnumNotFoundException $e) {
            $name = $this->model_name::get($this->data)->name;
        }

        return $name ? $name : '';
    }
}
