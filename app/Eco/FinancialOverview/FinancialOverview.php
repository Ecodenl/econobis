<?php

namespace App\Eco\FinancialOverview;

use App\Eco\Administration\Administration;
use Illuminate\Database\Eloquent\Model;

class FinancialOverview extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

//    protected $casts = [
//        'year' => 'integer',
//        'administration_id' => 'integer',
//    ];

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }
    public function financialOverviewProjects()
    {
        return $this->hasMany(FinancialOverviewProject::class);
    }

}
