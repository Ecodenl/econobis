<?php

namespace App\Eco\QuotationRequest;

use App\Eco\EmailTemplate\EmailTemplate;
use Illuminate\Database\Eloquent\Model;

class QuotationRequestStatus extends Model
{

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

}
