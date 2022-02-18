<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\ProjectRevenueDistributionType;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class RevenuesKwh extends Model
{
    use RevisionableTrait;

    protected $table = 'revenues_kwh';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    //relations

    public function project(){
        return $this->belongsTo(Project::class);
    }
    public function category(){
        return $this->belongsTo(ProjectRevenueCategory::class, 'category_id');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function partsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id');
    }
    public function distributionKwh(){
        return $this->hasMany(RevenueDistributionKwh::class, 'revenue_id');
    }
    public function distributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'revenue_id');
    }
    public function distributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'revenue_id');
    }
    public function valuesKwh(){
        return $this->hasMany(RevenueValuesKwh::class, 'revenue_id');
    }

    public function conceptPartsKwh(){
        return $this->hasMany(RevenuePartsKwh::class, 'revenue_id')->whereIn('status', ['new', 'concept']);
    }
    public function conceptDistributionKwh(){
        return $this->hasMany(RevenueDistributionKwh::class, 'revenue_id')->where('status', 'concept');
    }
    public function conceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'revenue_id')->where('status', 'concept');
    }
    public function conceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'revenue_id')->where('status', 'çoncept');
    }
    public function newOrConceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'revenue_id')->whereIn('status', ['new', 'concept']);
    }
    public function newOrConceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'revenue_id')->whereIn('status', ['new', 'çoncept']);
    }
    public function conceptValuesKwh(){
        return $this->hasMany(RevenueValuesKwh::class, 'revenue_id')->where('status', 'çoncept');
    }
//    public function simulatedValuesKwh(){
//        return $this->hasMany(RevenueValuesKwh::class, 'revenue_id')->where('is_simulated', true);
//    }

    //Appended fields

    public function getDistributionType()
    {
        if(!$this->distribution_type_id) return null;

        return ProjectRevenueDistributionType::get($this->distribution_type_id);
    }

    public function getDeliveredTotalConceptStringAttribute()
    {
        return number_format( $this->delivered_total_concept, '2',',', '.' );
    }
    public function getDeliveredTotalConfirmedStringAttribute()
    {
        return number_format( $this->delivered_total_confirmed, '2',',', '.' );
    }
    public function getDeliveredTotalProcessedStringAttribute()
    {
        return number_format( $this->delivered_total_processed, '2',',', '.' );
    }
    public function getDeliveredTotalStringAttribute()
    {
        return number_format( ($this->delivered_total_concept + $this->delivered_total_confirmed + $this->delivered_total_processed), '2',',', '.' );
    }

}
