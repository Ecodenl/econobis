<?php

namespace App\Eco\QuotationRequest;

use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Eloquent\Model;

class QuotationRequestStatus extends Model
{

    const STATUS_VISIT_CANCELLED_ID = 14;

    protected $table = 'quotation_request_status';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function quotationRequests()
    {
        return $this->hasMany(QuotationRequest::class);
    }

    public function emailTemplateWorkflow()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf');
    }

    public function opportunityAction()
    {
        return $this->belongsTo(OpportunityAction::class, 'opportunity_action_id');
    }

    public function getOpportunityActionNameAttribute()
    {
        return $this->opportunityAction->name;
    }
}
