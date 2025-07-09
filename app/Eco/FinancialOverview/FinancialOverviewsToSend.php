<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;

class FinancialOverviewsToSend extends Model
{
    protected $table = 'financial_overviews_to_send';

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function financialOverviewContact()
    {
        return $this->belongsTo(FinancialOverviewContact::class);
    }

}
