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

    /**
     * @param string $request
     * @param $revenuePartsKwh
     */
    public function createOrUpdateRevenueValuesKwh($valuesKwhData = null, RevenuePartsKwh $revenuePartsKwh): void
    {
        if($valuesKwhData != null) {
            $dateRegistrationStart = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
            $revenueValuesKwhStart = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationStart)->first();
            if ($revenueValuesKwhStart) {
                if (in_array($revenueValuesKwhStart->status, ['confirmed', 'processed'])) {
                    return;
                }
                $revenueValuesKwhStart->kwh_start = $valuesKwhData['kwhStart'];
                $revenueValuesKwhStart->kwh_start_high = $valuesKwhData['kwhStartHigh'];
                $revenueValuesKwhStart->kwh_start_low = $valuesKwhData['kwhStartLow'];
                $revenueValuesKwhStart->save();
            } else {
                RevenueValuesKwh::create([
                    'revenue_id' => $revenuePartsKwh->revenue_id,
                    'date_registration' => $dateRegistrationStart,
                    'is_simulated' => false,
                    'kwh_start' => $valuesKwhData['kwhStart'],
                    'kwh_start_high' => $valuesKwhData['kwhStartHigh'],
                    'kwh_start_low' => $valuesKwhData['kwhStartLow'],
                    'kwh_end' => 0,
                    'kwh_end_high' => 0,
                    'kwh_end_low' => 0,
                    'status' => 'concept',
                    'delivered_kwh' => 0,
                ]);
            }
            $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

            $revenueValuesKwhEnd = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
            if ($revenueValuesKwhEnd) {
                if (in_array($revenueValuesKwhEnd->status, ['confirmed', 'processed'])) {
                    return;
                }
                $revenueValuesKwhEnd->kwh_start = $valuesKwhData['kwhEnd'];
                $revenueValuesKwhEnd->kwh_start_high = $valuesKwhData['kwhEndHigh'];
                $revenueValuesKwhEnd->kwh_start_low = $valuesKwhData['kwhEndLow'];
                $revenueValuesKwhEnd->save();
            } else {
                RevenueValuesKwh::create([
                    'revenue_id' => $revenuePartsKwh->revenue_id,
                    'date_registration' => $dateRegistrationDayAfterEnd,
                    'is_simulated' => false,
                    'kwh_start' => $valuesKwhData['kwhEnd'],
                    'kwh_start_high' => $valuesKwhData['kwhEndHigh'],
                    'kwh_start_low' => $valuesKwhData['kwhEndLow'],
                    'kwh_end' => 0,
                    'kwh_end_high' => 0,
                    'kwh_end_low' => 0,
                    'status' => 'concept',
                    'delivered_kwh' => 0,
                ]);
            }
        }
    }

    /**
     * @param $revenueDistributionPartsKwh
     */
    public function createOrUpdateRevenueValuesKwhSimulate(RevenuePartsKwh $revenuePartsKwh): void
    {
        Log::info($revenuePartsKwh);
        $partDateBegin =  Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd =  Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

        $daysOfPeriod = Carbon::parse($dateRegistrationDayAfterEnd)->diffInDays(Carbon::parse($partDateBegin));
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $partDateBegin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();
        $deliveredHighPerDay = round((($endRevenueValuesKwh->kwh_start_high - $beginRevenueValuesKwh->kwh_start_high) / $daysOfPeriod), 6);
        $deliveredLowPerDay = round((($endRevenueValuesKwh->kwh_start_low - $beginRevenueValuesKwh->kwh_start_low) / $daysOfPeriod), 6);
        $deliveredTotalPerDay = round((($endRevenueValuesKwh->kwh_start - $beginRevenueValuesKwh->kwh_start) / $daysOfPeriod), 6);

        RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('status', 'concept')->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('is_simulated', true)->delete();

        $kwhStart = $beginRevenueValuesKwh->kwh_start;
        $kwhEnd = $beginRevenueValuesKwh->kwh_start + $deliveredTotalPerDay;
        $kwhStartHigh = $beginRevenueValuesKwh->kwh_start_high;
        $kwhEndHigh = $beginRevenueValuesKwh->kwh_start_high + $deliveredHighPerDay;
        $kwhStartLow = $beginRevenueValuesKwh->kwh_start_low;
        $kwhEndLow = $beginRevenueValuesKwh->kwh_start_low + $deliveredLowPerDay;
        // Iterate over the period
        $period = CarbonPeriod::create(Carbon::parse($partDateBegin)->format('Y-m-d'), Carbon::parse($partDateEnd)->format('Y-m-d'));
//        $deliveredTotalPartConcept = 0;
//        $deliveredTotalPartConfirmed = 0;
//        $deliveredTotalPartProcessed = 0;
        foreach ($period as $date) {
            $dateRegistration = $date->format('Y-m-d');
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistration)->first();
            if($revenueValuesKwh) {
                if($revenueValuesKwh->date_registration == $partDateBegin){
                    $revenueValuesKwh->kwh_end = $kwhEnd;
                    $revenueValuesKwh->kwh_end_high = $kwhEndHigh;
                    $revenueValuesKwh->kwh_end_low = $kwhEndLow;
                    $revenueValuesKwh->delivered_kwh = $deliveredTotalPerDay;
                    $revenueValuesKwh->save();

                    $deliveredTotal = $deliveredTotalPerDay;
                } else {
                    // bestaande anders dan begindatum?
                    Log::error('Bestaande revenue value kwh (' . $revenueValuesKwh->id . '), niet begindatum? date_registration: ' . $revenueValuesKwh->date_registration );
                }
            } else {
                // Als we einddatum bereikt hebben, dan afrondingsverschil op laatste simulatie verwerken.
                if($dateRegistration == $partDateEnd){
                    $kwhEnd = $endRevenueValuesKwh->kwh_start;
                    $kwhEndHigh = $endRevenueValuesKwh->kwh_start_high;
                    $kwhEndLow = $endRevenueValuesKwh->kwh_start_low;
                    $deliveredTotal = $kwhEnd - $kwhStart;
                } else {
                    $deliveredTotal = $deliveredTotalPerDay;
                }

                $revenueValuesKwh = RevenueValuesKwh::create([
                    'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_end' => $kwhEnd,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_end_high' => $kwhEndHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'kwh_end_low' => $kwhEndLow,
                    'status' => $revenuePartsKwh->status,
                    'delivered_kwh' => $deliveredTotal,
                ]);
            }
            $kwhStart = $kwhEnd;
            $kwhEnd = $kwhStart + $deliveredTotalPerDay;
            $kwhStartHigh = $kwhEndHigh;
            $kwhEndHigh = $kwhStartHigh + $deliveredHighPerDay;
            $kwhStartLow = $kwhEndLow;
            $kwhEndLow = $kwhStartLow + $deliveredLowPerDay;

            $this->saveDistributionValues($revenuePartsKwh, $revenueValuesKwh);

//            if ($revenueValuesKwh->status == 'concept') {
//                $deliveredTotalPartConcept += $deliveredTotal;
//            } elseif ($revenueValuesKwh->status == 'confirmed') {
//                $deliveredTotalPartConfirmed += $deliveredTotal;
//            } elseif ($revenueValuesKwh->status == 'processed') {
//                $deliveredTotalPartProcessed += $deliveredTotal;
//            }
        }
    }

    public function saveDistributionValues(RevenuePartsKwh $revenuePartsKwh, RevenueValuesKwh $revenueValuesKwh): void
    {
        $distributionsKwh = $revenuePartsKwh->revenuesKwh->distributionKwh;
        //todo WM: opschonen
//        if($revenueValuesKwh->date_registration == '2020-02-01') {
//            Log::info('Debug test ');
//            Log::info('Date registration 1: ' . $revenueValuesKwh->date_registration);

        foreach ($distributionsKwh as $distributionKwh) {
            $participationsQuantity = $this->determineParticipationsQuantity($distributionKwh, $revenueValuesKwh->date_registration);
            RevenueDistributionValuesKwh::create([
                'revenue_values_id' => $revenueValuesKwh->id,
                'date_registration' => $revenueValuesKwh->date_registration,
                'distribution_id' => $distributionKwh->id,
                'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
                'parts_id' => $revenuePartsKwh->id,
                'status' => $revenuePartsKwh->status,
                'participations_quantity' => $participationsQuantity,
                'delivered_kwh' => 0,
            ]);
        }

//        }
    }

    public function saveParticipantsOfDistributionParts(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(300);

        $revenuesKwh = $revenuePartsKwh->revenuesKwh;
        foreach ($revenuesKwh->distributionKwh as $distributionKwh) {
            $this->saveDistributionPartsKwh($revenuePartsKwh, $distributionKwh);
        }
    }


    public function saveDistributionPartsKwh(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh):void
    {
        // Bepalen energiesupplier
        $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $distributionKwh->participation->address_id)
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $partDateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($partDateEnd) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateEnd) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $partDateEnd);
                    })
                    ->orWhereNull('end_date');
            })->first();

        // If RevenueDistributionPartsKwh already is added to project revenue distribution then update
        if(RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->exists()) {
            $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->first();
        } else {
            $distributionPartsKwh = new RevenueDistributionPartsKwh();
            $distributionPartsKwh->revenue_id = $revenuePartsKwh->revenue_id;
            $distributionPartsKwh->parts_id = $revenuePartsKwh->id;
            $distributionPartsKwh->distribution_id = $distributionKwh->id;
            $distributionPartsKwh->status = 'concept';
        }

        Log::info('Test determineParticipationsQuantity part');
        Log::info('End date part: ' . $partDateEnd);
        $revenueDistributionValuesKwhOnDateEnd = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
            ->where('parts_id', $revenuePartsKwh->id)
            ->where('distribution_id', $distributionKwh->id)
            ->where('date_registration', $partDateEnd)
            ->first();
        if($revenueDistributionValuesKwhOnDateEnd) {
            $distributionPartsKwh->participations_quantity = $revenueDistributionValuesKwhOnDateEnd->participations_quantity;
        }else{
            $distributionPartsKwh->participations_quantity = 0;
        }

//        $distributionPartsKwh->delivered_kwh = 0;
        $distributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
        $distributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
        $distributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number: null;

        $distributionPartsKwh->save();
    }

    public function determineParticipationsQuantity(RevenueDistributionKwh $distributionKwh, $dateRegistration)
    {
        $quantityOfParticipations = 0;
        $dateBeginInitial = Carbon::parse($distributionKwh->participation->date_register);
        $dateEndInitial = Carbon::parse($dateRegistration);
        Log::info('Debug determineParticipationsQuantity ');
        Log::info('dateBeginInitial: ' . $dateBeginInitial);
        Log::info('dateEndInitial: ' . $dateEndInitial);

        $mutations = $distributionKwh->participation->mutationsDefinitiveForKwhPeriod;
        foreach ($mutations as $index => $mutation) {
            $dateEntry = Carbon::parse($mutation->date_entry);
            Log::info('dateEntry: ' . $dateEntry);
            Log::info('quantity: ' . $mutation->quantity);
            if($dateEntry >= $dateBeginInitial && $dateEntry <= $dateEndInitial){
                $quantityOfParticipations += $mutation->quantity;
            }
            Log::info('quantity sum: ' . $quantityOfParticipations);
        }
        return $quantityOfParticipations;
    }

    public function calculator()
    {
        return new RevenuePartsKwhCalculator($this);
    }

}
