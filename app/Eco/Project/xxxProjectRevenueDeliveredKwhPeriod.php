<?php

namespace App\Eco\Project;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

// todo WM: opschonen: deliveredKwhPeriod gebruiken we niet meer
class xxxProjectRevenueDeliveredKwhPeriod extends Model
{
    use RevisionableTrait;

    protected $table = 'project_revenue_delivered_kwh_period';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function distribution()
    {
        return $this->belongsTo(ProjectRevenueDistribution::class,'distribution_id');
    }

    public function revenue()
    {
        return $this->belongsTo(ProjectRevenue::class, 'revenue_id');
    }
}
