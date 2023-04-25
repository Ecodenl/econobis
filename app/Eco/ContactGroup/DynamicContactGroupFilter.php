<?php

namespace App\Eco\ContactGroup;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Intake\IntakeStatus;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Occupation\Occupation;
use App\Eco\Opportunity\OpportunityEvaluationStatus;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Order\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
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

    public function getDataNameAttribute()
    {
        if (!$this->model_name) {
            //Datums  omzetten
            if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/", $this->data))  return Carbon::parse($this->data)->format('d-m-Y');

            // Booleans omzetten
            $yesNoFields = ['didAcceptAgreement', 'didAgreeAvg', 'portalUser', 'housingFileExists'];
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

            // orderStatus omzetten
            if ($this->field == 'orderStatus'){
                if($this->data){
                    return OrderStatus::get($this->data)->name;
                }
                return '';
            }
            // housingFileFieldName omzetten
            if ($this->field == 'housingFileFieldName'){
                Log::info('hier housingFileFieldName extrafilter omzetten');
//                if($this->data){
//                    $measureCategory = MeasureCategory::find($this->data);
//                    return $measureCategory ? $measureCategory->name : ''   ;
//                }
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
