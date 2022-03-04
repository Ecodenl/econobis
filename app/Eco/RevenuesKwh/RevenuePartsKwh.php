<?php

namespace App\Eco\RevenuesKwh;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class RevenuePartsKwh extends Model
{
    use RevisionableTrait;

    protected $table = 'revenue_parts_kwh';

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

    public function distributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id');
    }
    public function distributionPartsKwhVisible(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id')->where('is_visible', true);
    }
    public function distributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'parts_id');
    }
    public function conceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id')->where('status', 'concept');
    }
    public function conceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'parts_id')->where('status', 'concept');
    }
    public function newOrConceptDistributionPartsKwh(){
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'parts_id')->whereIn('status', ['new', 'concept']);
    }
    public function newOrConceptDistributionValuesKwh(){
        return $this->hasMany(RevenueDistributionValuesKwh::class, 'parts_id')->whereIn('status', ['new', 'concept']);
    }
    //Appended fields

    public function conceptSimulatedValuesKwh($oldDateEnd){
        $partDateBegin =  Carbon::parse($this->date_begin)->format('Y-m-d');
        if($oldDateEnd != null){
            $partDateEnd =  Carbon::parse($oldDateEnd)->format('Y-m-d');
        } else {
            $partDateEnd =  Carbon::parse($this->date_end)->format('Y-m-d');
        }

        return RevenueValuesKwh::where('revenue_id', $this->revenue_id)->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('is_simulated', true)->where('status', 'concept');
    }
    public function conceptValuesKwh(){
        $partDateBegin =  Carbon::parse($this->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($this->date_end)->format('Y-m-d');

        return RevenueValuesKwh::where('revenue_id', $this->revenue_id)->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('status', 'concept')->get();
    }
    public function confirmedValuesKwh(){
        $partDateBegin =  Carbon::parse($this->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($this->date_end)->format('Y-m-d');

        return RevenueValuesKwh::where('revenue_id', $this->revenue_id)->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('status', 'confirmed');
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
    public function getValuesKwhStartAttribute()
    {
        $valuesKwhStart = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $this->date_begin)->first();
        // voorlopig nooit edit start toestaan. Beginstanden 1e part wordt vastgelegd bij 1e keer aanmaak. Bij volgende parts zijn Beginstanden altijd gelijk aan Eindstanden voorgaande peridoe,
        // als die gewijzigd worden (als allowEditEnd mag dus), dan wijzigen deze beginstanden ook meteen mee (is 1 en dezelfde value !)
        if(!$valuesKwhStart){
            return ['allowEditStart' => false, 'kwhStart' => 0, 'kwhStartHigh' => 0, 'kwhStartLow' => 0, ];
        } else {
            return ['allowEditStart' => false, 'kwhStart' => $valuesKwhStart->kwh_start, 'kwhStartHigh' => $valuesKwhStart->kwh_start_high, 'kwhStartLow' => $valuesKwhStart->kwh_start_low ];
        }
    }
    public function getValuesKwhEndAttribute()
    {
        $dayAfterEnd = Carbon::parse($this->date_end)->addDay()->format('Y-m-d');
        $valuesKwhEnd = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $dayAfterEnd)->first();

        $kwhEnd = 0;
        $kwhEndHigh = 0;
        $kwhEndLow = 0;
        $isSimulated = null;

        $allowEditEnd = false;

        // voor edit moet status in ieder geval new of concept zijn.
        if (in_array($this->status, ['new', 'concept'])) {
            $checkDateForPreviousPart = Carbon::parse($this->date_begin)->format('Y-m-d');
            $previousRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_end', '<', $checkDateForPreviousPart)->orderBy('date_end', 'desc')->first();
            if ($previousRevenuePartsKwh) {
                $statusPreviousPart = $previousRevenuePartsKwh->status;
            } else {
                $statusPreviousPart = 'notfound';
            }
            // geen voorgaande part meer, dan edit toegestaan (bij 1e part)
            if ($statusPreviousPart == 'notfound') {
                $allowEditEnd = true;
                // Anders edit toestaan als voorgaand niet ook nog new is.
            } elseif ($statusPreviousPart != 'new') {
                $allowEditEnd = true;
            }
        }

        if($valuesKwhEnd){
            $kwhEnd = $valuesKwhEnd->kwh_start;
            $kwhEndHigh = $valuesKwhEnd->kwh_start_high;
            $kwhEndLow = $valuesKwhEnd->kwh_start_low;
            $isSimulated = $valuesKwhEnd->is_simulated;
        }

        return ['allowEditEnd' => $allowEditEnd, 'kwhEnd' =>  $kwhEnd, 'kwhEndHigh' => $kwhEndHigh, 'kwhEndLow' => $kwhEndLow,
            'isSimulated' => $isSimulated];
    }

    public function getIsFirstRevenuePartsKwhAttribute()
    {
        return $this->date_begin == $this->revenuesKwh->date_begin;

    }
    public function getIsLastRevenuePartsKwhAttribute()
    {
        return $this->date_end == $this->revenuesKwh->date_end;

    }

    public function getNextRevenuePartsKwhAttribute()
    {
        $dateRegistrationDayAfterEnd = Carbon::parse($this->date_end)->addDay()->format('Y-m-d');
        return RevenuePartsKwh::where('revenue_id', $this->revenue_id)->where('date_begin', $dateRegistrationDayAfterEnd)->first();

    }

    public function calculator()
    {
        return new RevenuePartsKwhCalculator($this);
    }

}
