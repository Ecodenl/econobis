<?php

namespace App\Eco\Campaign;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class CampaignWorkflow extends Model
{
    use RevisionableTrait;

    protected $table = 'campaign_workflows';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'workflow_for_type'
    ];

    public function status()
    {
        if($this->workflow_for_type === "opportunity") {
            return $this->belongsTo(OpportunityStatus::class, 'opportunity_status_id');
        } else {
            return $this->belongsTo(QuotationRequestStatus::class, 'quotation_request_status_id');
        }
    }
    public function opportunityStatus()
    {
        return $this->belongsTo(OpportunityStatus::class, 'opportunity_status_id');
    }
    public function quotationRequestStatus()
    {
        return $this->belongsTo(QuotationRequestStatus::class, 'quotation_request_status_id');
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function emailTemplateWorkflow()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf');
    }

    public function emailTemplateReminder()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_reminder');
    }
}
