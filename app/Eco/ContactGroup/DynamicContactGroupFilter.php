<?php

namespace App\Eco\ContactGroup;

use App\Eco\AddressDongle\AddressDongleTypeDongle;
use App\Eco\AddressDongle\AddressDongleTypeReadOut;
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
use App\EcoShared\SharedArea\SharedArea;
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
            $yesNoFields = ['didAcceptAgreement', 'didAgreeAvg', 'portalUser', 'housingFileExists','didUnderstandInfo','hoomdossierExists','hasEmailAddress','hasPhoneNumber'];
            if (in_array($this->field, $yesNoFields)) return $this->data ? 'Ja' : 'Nee';

            // Yes/No/Empty omzetten
            $yesNoWithEmptyFields = ['addressDongleHasEnergyId'];
            if (in_array($this->field, $yesNoWithEmptyFields)){
                return $this->data == '1'
                    ? 'Nee'
                    : ($this->data == '2'
                        ? 'Ja'
                        : '');
            }

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
            if ($this->field == 'contactFreeFieldsFieldName' || $this->field == 'addressFreeFieldsFieldName'){
                if($this->data){
                    $freeFieldsField = FreeFieldsField::find($this->data);
                    return $freeFieldsField ? $freeFieldsField->freeFieldsTable->name . ' / '. $freeFieldsField->field_name : '';
                }
                return '';
            }
            // freeFieldsFieldValue omzetten
            if ($this->field == 'contactFreeFieldsFieldValue' || $this->field == 'addressFreeFieldsFieldValue'){
                if($this->data){
                    $parentDynamicContactGroupFilter = $this->parentFreeFieldsFieldFilter();

                    if($parentDynamicContactGroupFilter){
                        $freeFieldsField = FreeFieldsField::find($parentDynamicContactGroupFilter->data);
                        switch ($freeFieldsField->freeFieldsFieldFormat->format_type) {
                            case 'boolean':
                                return $this->data == '1' ? 'Ja' : 'Nee';
                            case 'int':
                                return (int)$this->data;
                            case 'double_2_dec':
                                return number_format((float)$this->data, 2, ',', '.');
                            case 'amount_euro':
                                return '€ ' . number_format((float)$this->data, 2, ',', '.');
                            case 'date':
                            case 'datetime':
                                return Carbon::parse($this->data)->format('d-m-Y');
                            default:
                                return $this->data;
                        }
                    }
                    return '';
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
                    switch ($this->data) {
                        case 'isTerminated':
                            return "Beëindigd";
                        default:
                            return ParticipantMutationStatus::find($this->data)->name;
                    }
                }
                return '';
            }

            // sharedArea omzetten
            if ($this->field == 'sharedArea'){
                if($this->data){
                    $sharedArea = SharedArea::find($this->data);
                    return $sharedArea ? $sharedArea->area_name : '';
                }
                return '';
            }

            // addressDongleTypeReadOut omzetten
            if ($this->field == 'addressDongleTypeReadOut'){
                if($this->data){
                    $addressDongleTypeReadOut = AddressDongleTypeReadOut::find($this->data);
                    return $addressDongleTypeReadOut ? $addressDongleTypeReadOut->name : '';
                }
                return '';
            }
            // addressDongleTypeDongle omzetten
            if ($this->field == 'addressDongleTypeDongle'){
                if($this->data){
                    $addressDongleTypDongle = AddressDongleTypeDongle::find($this->data);
                    return $addressDongleTypDongle ? $addressDongleTypDongle->name : '';
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
