<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FinancialOverviewContact extends Model
{
    use SoftDeletes;

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

    public function getStatusAttribute()
    {
        if(!$this->status_id) return null;

        return FinancialOverviewContactStatus::get($this->status_id)->name;
    }


}
