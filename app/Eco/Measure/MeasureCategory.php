<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Organisation\Organisation;
use Illuminate\Database\Eloquent\Model;

class MeasureCategory extends Model
{
    protected $table = 'measure_categories';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function measureWorkflowCreateOpportunity()
    {
        return $this->belongsTo(Measure::class, 'measure_id_wf_create_opportunity');
    }
    public function opportunityStatusWorkflowCreateOpportunity()
    {
        return $this->belongsTo(OpportunityStatus::class, 'opportunity_status_id_wf_create_opportunity');
    }
    public function organisationWorkflowCreateQuotationRequest()
    {
        return $this->belongsTo(Organisation::class, 'organisation_id_wf_create_quotation_request');
    }
    public function emailTemplateWorkflowCreateQuotationRequest()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf_create_quotation_request');
    }

    public function measure()
    {
        return $this->hasMany(Measure::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function intakes()
    {
        return $this->belongsToMany(Intake::class, 'intake_measure_requested');
    }

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class);
    }
}
