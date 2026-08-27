<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\EnergySupplier\EnergySupplier;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RevenueDistributionPartsKwh extends Model
{
    use SoftDeletes;

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
        // beginnen bij huidige part
        $dateBegin = $this->partsKwh->date_begin;
        // aflopend upToPartsKwhIds doorlopen opzoek naar een visible part
        foreach ($upToPartsKwhIds as $part){
            $deliveredDistributionPart = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->where('parts_id', $part->id)->first();
            $isVisibleNotEndOfYear = $deliveredDistributionPart->is_end_participation || $deliveredDistributionPart->is_energy_supplier_switch || $deliveredDistributionPart->is_end_total_period;

            if($deliveredDistributionPart && ($deliveredDistributionPart->id == $this->id || $isVisibleNotEndOfYear == false)){
                $dateBegin = $part->date_begin;
            }
            if($deliveredDistributionPart && $deliveredDistributionPart->id != $this->id && $isVisibleNotEndOfYear == true){
                break;
            }
        }
        return Carbon::parse($dateBegin)->format('Y-m-d');
    }

    public function getDeliveredKwhFromTillVisibleAttribute()
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<=', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->orderBy('date_end', 'desc')->get();
        $deliveredTotal = 0;
        foreach ($upToPartsKwhIds as $part){
            $deliveredDistributionPart = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->where('parts_id', $part->id)->first();
            $isVisibleNotEndOfYear = $deliveredDistributionPart->is_end_participation || $deliveredDistributionPart->is_energy_supplier_switch || $deliveredDistributionPart->is_end_total_period;

            if($deliveredDistributionPart && ($deliveredDistributionPart->id == $this->id || $isVisibleNotEndOfYear == false)){
                $deliveredTotal +=  $deliveredDistributionPart->delivered_kwh;
            }
            if($deliveredDistributionPart && $deliveredDistributionPart->id != $this->id && $isVisibleNotEndOfYear == true){
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
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<=', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->orderBy('date_end', 'desc')->get();
        $kwhReturnTotal = 0;
        foreach ($upToPartsKwhIds as $part){
            $kwhReturnDistributionPart = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->where('parts_id', $part->id)->first();
            $isVisibleNotEndOfYear = $kwhReturnDistributionPart->is_end_participation || $kwhReturnDistributionPart->is_energy_supplier_switch || $kwhReturnDistributionPart->is_end_total_period;

            if($kwhReturnDistributionPart && ($kwhReturnDistributionPart->id == $this->id || $isVisibleNotEndOfYear == false)){
                $payoutKwh = $part->payout_kwh ?: 0;
                $kwhReturnTotal +=  $kwhReturnDistributionPart->delivered_kwh * $payoutKwh;
            }
            if($kwhReturnDistributionPart && $kwhReturnDistributionPart->id != $this->id && $isVisibleNotEndOfYear == true){
                break;
            }
        }
        return $kwhReturnTotal;
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

    public function getPreviousVisiblePartNotReportedDateBeginAttribute()
    {
        $distributionPartsNotReported = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)
            ->where(function($query) {
                $query->where('is_end_participation', true)
                    ->orWhere('is_energy_supplier_switch', true)
                    ->orWhere('is_end_total_period', true);
            })
            ->whereIn('status', ['confirmed', 'processed'])->whereNull('date_participant_report')->get()->pluck('parts_id')->toArray();
        $previousVisiblePartNotReportedDateBegin = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->whereIn('id', $distributionPartsNotReported)->orderBy('date_begin', 'asc')->first();
        return $previousVisiblePartNotReportedDateBegin ? $previousVisiblePartNotReportedDateBegin->date_begin : null;
    }
    public function getIsPreviousVisiblePartReportedAttribute()
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->orderBy('date_end', 'desc')->get();
        // beginnen bij huidige distribution part
        $distributionPart = $this;
        // aflopend upToPartsKwhIds doorlopen opzoek naar een visible part
        foreach ($upToPartsKwhIds as $part){
            $distributionPart = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->where('parts_id', $part->id)->first();
            if($distributionPart){
                $isVisibleNotEndOfYear = $distributionPart->is_end_participation || $distributionPart->is_energy_supplier_switch || $distributionPart->is_end_total_period;
                if($distributionPart && $distributionPart->id != $this->id && $isVisibleNotEndOfYear == true){
                    return $distributionPart->date_participant_report != null;
                }
                if($part->is_first_revenue_parts_kwh){
                    return true;
                }
            }
        }
        // Geen enkele visible part gevonden en ook niet eerste periode, dan return voorlopig false.
        // Dit komt bijv. voor als er eerdere distribution part records ontbreken, ik denk als een deelnemer toegevoegd wordt als er al definitieve deelperiode zijn.
        // We moeten eerst uitzoeken hoe we hier mee omgaan ?!
        if(!$distributionPart){
            return false;
        }

        return $distributionPart->partsKwh->is_first_revenue_parts_kwh ? true : $distributionPart->date_participant_report != null;
    }

    public function getNotReportedDateBeginAttribute()
    {
        $distributionPartsNotReported = RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->whereIn('status', ['confirmed', 'processed'])->whereNull('date_participant_report')->get()->pluck('parts_id')->toArray();
        $notReportedDateBegin = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->whereIn('id', $distributionPartsNotReported)->orderBy('date_begin', 'asc')->first();
        return $notReportedDateBegin ? $notReportedDateBegin->date_begin : null;
    }
    public function getNotReportedDeliveredKwhAttribute()
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<=', Carbon::parse($this->partsKwh->date_end)->format('Y-m-d'))->get()->pluck('id')->toArray();
        return RevenueDistributionPartsKwh::where('revenue_id', $this->revenue_id)->where('distribution_id', $this->distribution_id)->whereIn('parts_id', $upToPartsKwhIds)->whereIn('status', ['confirmed', 'processed'])->whereNull('date_participant_report')->sum('delivered_kwh');
    }
    public function getNotReportedDeliveredKwhStringAttribute()
    {
        return number_format( $this->not_reported_delivered_kwh, '2',',', '.' );
    }
    public function getNotReportedKwhReturnAttribute(){
        $payoutKwh = $this->partsKwh->payout_kwh ? $this->partsKwh->payout_kwh : 0;
        return $this->not_reported_delivered_kwh * $payoutKwh;
    }
    public function getNotReportedKwhReturnStringAttribute()
    {
        return number_format( $this->not_reported_kwh_return, '2',',', '.' );
    }
}
