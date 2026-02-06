<?php

namespace App\Eco\FinancialOverview;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FinancialOverviewPost extends Model
{
    use SoftDeletes;

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
