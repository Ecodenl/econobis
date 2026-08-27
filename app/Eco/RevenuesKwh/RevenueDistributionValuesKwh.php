<?php

namespace App\Eco\RevenuesKwh;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RevenueDistributionValuesKwh extends Model
{
    use SoftDeletes;

    protected $table = 'revenue_distribution_values_kwh';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    //relations

    public function revenuesKwh()
    {
        return $this->belongsTo(RevenuesKwh::class, 'revenue_id');
    }
    public function partsKwh()
    {
        return $this->belongsTo(RevenuePartsKwh::class, 'parts_id');
    }
    public function distributionKwh()
    {
        return $this->belongsTo(RevenueDistributionKwh::class,'distribution_id');
    }
}
