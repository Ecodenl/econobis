<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
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
    public function conceptSimulatedValuesKwh(){
        return $this->hasMany(RevenueValuesKwh::class, 'revenue_id')->where('is_simulated', true)->where('status', 'concept');
    }

    //Appended fields

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
        $valuesKwhStart = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $this->date_begin)->where('is_simulated', false)->first();
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
        $valuesKwhEnd = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $dayAfterEnd)->where('is_simulated', false)->first();

        $kwhEnd = 0;
        $kwhEndHigh = 0;
        $kwhEndLow = 0;
        $valuesKwhEndEstimated = null;
        $valuesKwhEndHighEstimated = null;
        $valuesKwhEndLowEstimated = null;

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
                // Anders als status part is new, dan mag voorgaand niet nog new zijn.
            } elseif ($this->status == 'new' && $statusPreviousPart != 'new') {
                $allowEditEnd = true;
            }
        }

        // Nog geen eindstand bekend check of er wel een simulate value is, die als estimated meegeven.
        if(!$valuesKwhEnd){
            $valuesKwhEndSimulated = RevenueValuesKwh::where('revenue_id', $this->revenue_id)->where('date_registration', $dayAfterEnd)->where('is_simulated', true)->first();
            if($valuesKwhEndSimulated){
                $valuesKwhEndEstimated = $valuesKwhEndSimulated->kwh_start;
                $valuesKwhEndHighEstimated = $valuesKwhEndSimulated->kwh_start_high;
                $valuesKwhEndLowEstimated = $valuesKwhEndSimulated->kwh_start_low;
            }
        // Anders huidige standen meesturen.
        } else {
            $kwhEnd = $valuesKwhEnd->kwh_start;
            $kwhEndHigh = $valuesKwhEnd->kwh_start_high;
            $kwhEndLow = $valuesKwhEnd->kwh_start_low;
        }

        return ['allowEditEnd' => $allowEditEnd, 'kwhEnd' =>  $kwhEnd, 'kwhEndHigh' => $kwhEndHigh, 'kwhEndLow' => $kwhEndLow,
            'kwhEndHighEstimated' => $valuesKwhEndEstimated, 'kwhEndHighEstimated' => $valuesKwhEndHighEstimated, 'kwhEndLowEstimated' => $valuesKwhEndLowEstimated];
    }

    public function calculator()
    {
        return new RevenuePartsKwhCalculator($this);
    }

}
