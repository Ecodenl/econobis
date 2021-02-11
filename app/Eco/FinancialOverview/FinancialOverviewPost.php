<?php

namespace App\Eco\FinancialOverview;

use Illuminate\Database\Eloquent\Model;

class FinancialOverviewPost extends Model
{
    protected $table = 'financial_overview_post';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function financialOverview()
    {
        return $this->belongsTo(FinancialOverview::class);
    }

}
