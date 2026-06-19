<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Contact\Contact;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use Illuminate\Database\Eloquent\Model;

class FinancialOverviewContact extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'date_sent' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
    public function financialOverview()
    {
        return $this->belongsTo(FinancialOverview::class);
    }
    public function financialOverviewsToSend()
    {
        return $this->hasOne(FinancialOverviewsToSend::class);
    }
    public function documentTemplateFinancialOverview()
    {
        return $this->belongsTo(DocumentTemplate::class, 'document_template_financial_overview_id');
    }
    public function emailTemplateFinancialOverview()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_financial_overview_id');
    }

    public function getStatusAttribute()
    {
        if(!$this->status_id) return null;

        return FinancialOverviewContactStatus::get($this->status_id)->name;
    }


}
