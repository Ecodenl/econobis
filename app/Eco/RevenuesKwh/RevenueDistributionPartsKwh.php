<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class RevenueDistributionPartsKwh extends Model
{
    use RevisionableTrait;

    protected $table = 'revenue_distribution_parts_kwh';

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
        return $this->belongsTo(RevenueDistributionKwh::class, 'distribution_id');
    }
    public function energySupplier()
    {
        return $this->belongsTo(EnergySupplier::class, 'es_id');
    }

    //Appended fields

    public function getDateBeginFromTillVisibleAttribute()
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<=', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->orderBy('date_end', 'desc')->get();
        $dateBegin = $this->partsKwh->date_begin;
        foreach ($upToPartsKwhIds as $part){
            $deliveredDistributionPart = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->where('parts_id', $part->id)->first();
            if($deliveredDistributionPart && ($deliveredDistributionPart->id == $this->id || $deliveredDistributionPart->is_visible == false)){
                $dateBegin = $part->date_begin;
            }
            if($deliveredDistributionPart && $deliveredDistributionPart->id != $this->id && $deliveredDistributionPart->is_visible == true){
                break;
            }
        }
        return Carbon::parse($dateBegin)->format('Y-m-d');
        ;
    }
    public function getDeliveredKwhFromTillVisibleAttribute()
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<=', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->orderBy('date_end', 'desc')->get();
        $deliveredTotal = 0;
        foreach ($upToPartsKwhIds as $part){
            $deliveredDistributionPart = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->where('parts_id', $part->id)->first();
            if($deliveredDistributionPart && ($deliveredDistributionPart->id == $this->id || $deliveredDistributionPart->is_visible == false)){
                $deliveredTotal +=  $deliveredDistributionPart->delivered_kwh;
            }
            if($deliveredDistributionPart && $deliveredDistributionPart->id != $this->id && $deliveredDistributionPart->is_visible == true){
                break;
            }
        }
        return $deliveredTotal;
    }
    public function getDeliveredTotalStringAttribute()
    {
        return number_format( $this->delivered_kwh_from_till_visible, '2',',', '.' );
    }
    public function getDeliveredTotalThisPartStringAttribute()
    {
        return number_format( $this->delivered_kwh, '2',',', '.' );
    }
    public function getKwhReturnFromTillVisibleAttribute(){
        $payoutKwh = $this->partsKwh->payout_kwh ? $this->partsKwh->payout_kwh : 0;
        return $this->delivered_kwh_from_till_visible * $payoutKwh;
    }
    public function getKwhReturnAttribute(){
        return  $this->kwh_return_from_till_visible;
    }
    public function getKwhReturnThisPartAttribute(){
        $deliveredTotal = $this->delivered_kwh ? $this->delivered_kwh : 0;
        $payoutKwh = $this->partsKwh->payout_kwh ? $this->partsKwh->payout_kwh : 0;
        return $deliveredTotal * $payoutKwh;
    }

    public function getRemarksAttribute()
    {
        $remarks = [];
        if( $this->is_end_participation ){
            $remarks[] = "Deze deelname is beëindigd op " . Carbon::parse($this->distributionKwh->participation->date_terminated)->format('d-m-Y');
        }
        if( $this->is_energy_supplier_switch ){
            $remarks[] = "Deze energie leverancier bij deze deelname is beëindigd op " . Carbon::parse($this->partsKwh->date_end)->format('d-m-Y');
        }
//        if( $this->is_end_year_period ){
//            $remarks[] = "Einde jaar";
//        }
        if( $this->is_end_total_period ){
            $remarks[] = "Einde laatste periode ";
        }
        return implode('<br/>', $remarks);
    }

}
