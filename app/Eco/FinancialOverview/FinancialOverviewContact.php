<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;

class FinancialOverviewContact extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'date_sent',
        'created_at',
        'updated_at',
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

}
