<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Administration\Administration;
use App\Eco\DocumentTemplate\DocumentTemplate;
use Illuminate\Database\Eloquent\Model;

class FinancialOverview extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'date_processed' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }
    public function financialOverviewProjects()
    {
        return $this->hasMany(FinancialOverviewProject::class);
    }
    public function financialOverviewContacts()
    {
        return $this->hasMany(FinancialOverviewContact::class);
    }

    public function documentTemplateFinancialOverview()
    {
        return $this->belongsTo(DocumentTemplate::class, 'document_template_financial_overview_id');
    }

    public function financialOverviewPosts()
    {
        return $this->hasMany(FinancialOverviewPost::class)->orderBy('created_at', 'desc');
    }
    public function getTotalFinancialOverviewProjectsAttribute()
    {
        return $this->financialOverviewProjects()->count();
    }

    public function getTotalFinancialOverviewProjectsInProgressAttribute()
    {
        return $this->financialOverviewProjects()->where('status_id', 'in-progress')->count();
    }

    public function getTotalFinancialOverviewProjectsConceptAttribute()
    {
        return $this->financialOverviewProjects()->where('status_id', 'concept')->count();
    }

    public function getTotalFinancialOverviewProjectsDefinitiveAttribute()
    {
        return $this->financialOverviewProjects()->where('status_id', 'definitive')->count();
    }

    public function getTotalFinancialOverviewContactsAttribute()
    {
        return $this->financialOverviewContacts()->count();
    }

    public function getTotalFinancialOverviewContactsConceptAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'concept')->count();
    }

    public function getTotalFinancialOverviewContactsToSendAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'to-send')->count();
    }

    public function getTotalFinancialOverviewContactsInProgressAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'in-progress')->count();
    }

    public function getTotalFinancialOverviewContactsErrorMakingAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'error-making')->count();
    }

    public function getTotalFinancialOverviewContactsIsSendingAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'is-sending')->count();
    }

    public function getTotalFinancialOverviewContactsErrorSendingAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'error-sending')->count();
    }

    public function getTotalFinancialOverviewContactsisResendingAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'is-resending')->count();
    }

    public function getTotalFinancialOverviewContactsSentAttribute()
    {
        return $this->financialOverviewContacts()->where('status_id', 'sent')->count();
    }

//    public function getTotalFinancialOverviewPostsAttribute()
//    {
//        return $this->financialOverviewPosts()->count();
//    }

}
