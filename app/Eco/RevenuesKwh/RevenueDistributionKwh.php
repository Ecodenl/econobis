<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\Contact\Contact;
use App\Eco\ParticipantProject\ParticipantProject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RevenueDistributionKwh extends Model
{
    use SoftDeletes;

    protected $table = 'revenue_distribution_kwh';

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
    public function participation()
    {
        return $this->belongsTo(ParticipantProject::class,'participation_id');
    }
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function distributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'distribution_id');
    }
    public function distributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'distribution_id');
    }

    public function newOrConceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'distribution_id')->whereIn('status', ['new', 'concept']);
    }
    public function newOrConceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'distribution_id')->whereIn('status', ['new', 'concept']);
    }
    public function conceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'distribution_id')->where('status', 'concept');
    }
    public function conceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'distribution_id')->where('status', 'concept');
    }

    //Appended fields

    public function getEnergySupplierNamesAttribute(){
        return $this->distributionPartsKwh->unique('energy_supplier_name')->pluck('energy_supplier_name')->toArray();
    }

    public function getKwhReturnAttribute(){
        $kwhReturnTotal = 0;
        foreach ($this->distributionPartsKwh->whereIn('status', ['confirmed', 'processed']) as $distributionPartsKwh) {
            $kwhReturnTotal += $distributionPartsKwh->kwh_return_this_part;
        }
        return $kwhReturnTotal;
    }

    public function getDeliveredTotalConceptStringAttribute()
    {
        return number_format( $this->delivered_total_concept, '2',',', '.' );
    }
    public function getDeliveredTotalConfirmedStringAttribute()
    {
        return number_format( ($this->delivered_total_confirmed + $this->delivered_total_processed), '2',',', '.' );
    }
    public function getDeliveredTotalProcessedStringAttribute()
    {
        return number_format( $this->delivered_total_processed, '2',',', '.' );
    }
    public function getDeliveredTotalStringAttribute()
    {
        return number_format( ($this->delivered_total_concept + $this->delivered_total_confirmed + $this->delivered_total_processed), '2',',', '.' );
    }

    public function getDateEndLastConfirmedPartsKwhAttribute()
    {
        $lastConfirmedPartsKwh = $this->distributionPartsKwh()
            ->join('revenue_parts_kwh', 'parts_id', '=', 'revenue_parts_kwh.id')
            ->whereIn('revenue_distribution_parts_kwh.status', ['confirmed', 'processed'])->orderByDesc('revenue_parts_kwh.date_end')->first();
        return $lastConfirmedPartsKwh ? $lastConfirmedPartsKwh->date_end : null;
    }

    public function getParticipationsQuantityLastConfirmedPartsKwhAttribute()
    {
        $lastConfirmedPartsKwh = $this->distributionPartsKwh()
            ->join('revenue_parts_kwh', 'parts_id', '=', 'revenue_parts_kwh.id')
            ->whereIn('revenue_distribution_parts_kwh.status', ['confirmed', 'processed'])->orderByDesc('revenue_parts_kwh.date_end')->first();
        return $lastConfirmedPartsKwh ? $lastConfirmedPartsKwh->participations_quantity : 0;
    }

}
