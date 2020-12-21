<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Administration\Administration;
use Illuminate\Database\Eloquent\Model;

class FinancialOverview extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'date_processed',
        'created_at',
        'updated_at',
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


}
