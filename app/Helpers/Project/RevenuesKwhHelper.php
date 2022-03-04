<?php

namespace App\Helpers\Project;


use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Log;

class RevenuesKwhHelper
{

    /**
     * @param string $request
     * @param $revenuesKwh
     */
    public function createStartRevenueValuesKwh(array $valuesKwhData, RevenuesKwh $revenuesKwh): void
    {
        RevenueValuesKwh::create([
            'revenue_id' => $revenuesKwh->id,
            'date_registration' => $valuesKwhData['valuesDateBegin'],
            'is_simulated' => false,
            'kwh_start' => $valuesKwhData['kwhStart'],
            'kwh_end' => 0,
            'kwh_start_high' => $valuesKwhData['kwhStartHigh'],
            'kwh_end_high' => 0,
            'kwh_start_low' => $valuesKwhData['kwhStartLow'],
            'kwh_end_low' => 0,
            'status' => 'concept',
        ]);

    }

    /**
     * @param string $request
     * @param $revenuesKwh
     */
    public function createStartRevenuePartsKwh(RevenuesKwh $revenuesKwh): void
    {
        $splitDates = [];
        $dateBeginFromRevenue = Carbon::parse($revenuesKwh->date_begin)->format('Y-m-d');
        $splitDates[] = $dateBeginFromRevenue;

        $dateEndFromRevenue = Carbon::parse($revenuesKwh->date_end)->format('Y-m-d');

        $participations = $revenuesKwh->project->participantsProject;
        $dateStartNextCalendarYear = Carbon::parse($revenuesKwh->date_end)->startOfYear()->format('Y-m-d');
        if($dateBeginFromRevenue < $dateStartNextCalendarYear) {
            $splitDates[] = $dateStartNextCalendarYear;
        }

        foreach ($participations as $participation){
            if($participation->date_terminated){
                $participationDateTerminated = Carbon::parse($participation->date_terminated)->format('Y-m-d');
                if($participationDateTerminated >= $dateBeginFromRevenue && $participationDateTerminated <= $dateEndFromRevenue) {
                    $splitDates[] = Carbon::parse($participationDateTerminated)->addDay()->format('Y-m-d');
                }
            }
            $addressEnergySuppliers = AddressEnergySupplier::where('address_id', '=', $participation->address_id)
                ->whereIn('energy_supply_type_id', [2, 3] )
                ->where(function ($addressEnergySupplier) use ($dateBeginFromRevenue) {
                    $addressEnergySupplier
                        ->where(function ($addressEnergySupplier) use ($dateBeginFromRevenue) {
                            $addressEnergySupplier->whereNotNull('member_since')
                                ->where('member_since', '>=', $dateBeginFromRevenue);
                        })
                        ->orWhereNull('member_since');
                })
                ->where(function ($addressEnergySupplier) use ($dateEndFromRevenue) {
                    $addressEnergySupplier
                        ->where(function ($addressEnergySupplier) use ($dateEndFromRevenue) {
                            $addressEnergySupplier->whereNotNull('member_since')
                                ->where('member_since', '<=', $dateEndFromRevenue);
                        })
                        ->orWhereNull('member_since');
                })->get();

            foreach ($addressEnergySuppliers as $addressEnergySupplier) {
                $splitDates[] = $addressEnergySupplier->member_since;
            }
        }

        $uniqueSplitDates = array_unique($splitDates);
        rsort($uniqueSplitDates);

        $periodParts = [];
        $saveDate = null;
        foreach ($uniqueSplitDates as $splitDate){
            if($saveDate == null){
                $periodParts[] = ['startDate' => $splitDate, 'endDate' => $dateEndFromRevenue];
            }else{
                $endDate = Carbon::parse($saveDate)->subDay()->format('Y-m-d');;
                $periodParts[] = ['startDate' => $splitDate, 'endDate' => $endDate];
            }
            $saveDate = $splitDate;
        }

        sort($periodParts);
        foreach ($periodParts as $periodPart){
            RevenuePartsKwh::create([
                'revenue_id' => $revenuesKwh->id,
                'date_begin' => $periodPart['startDate'],
                'date_end' => $periodPart['endDate'],
                'confirmed' => false,
                'status' => $revenuesKwh->status,
                'dateConfirmed' => null,
                'payout_kwh' => $revenuesKwh->payout_kwh,
                'delivered_total_concept' => 0,
                'delivered_total_confirmed' => 0,
                'delivered_total_processed' => 0,
                'created_at' => $revenuesKwh->created_at,
                'updated_at' => $revenuesKwh->updated_at,
            ]);
        }
    }

    /**
     * @param string $request
     * @param $revenuePartsKwh
     */
    public function createOrUpdateRevenueValuesKwh($valuesKwhData = null, RevenuePartsKwh $revenuePartsKwh, $oldDateEnd): void
    {
        if($valuesKwhData != null) {

            $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
            $partDateEnd =  Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
            $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

            $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $partDateBegin)->first();
            $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();

            if($oldDateEnd != $revenuePartsKwh->date_end
                || $beginRevenueValuesKwh->kwh_start_high != $valuesKwhData['kwhStartHigh']
                || $beginRevenueValuesKwh->kwh_start_low != $valuesKwhData['kwhStartLow']
                || !$endRevenueValuesKwh
                || $endRevenueValuesKwh->kwh_start_high != $valuesKwhData['kwhEndHigh']
                || $endRevenueValuesKwh->kwh_start_low != $valuesKwhData['kwhEndLow']
            ){
                // Delete bestaande gesimuleerde values kwh
                $revenuePartsKwh->conceptSimulatedValuesKwh($oldDateEnd)->delete();

                // einddatum gewijzigd, dan bij oude datum values verwijderen en einddatum bij revenuesKwh ook bijwerken.
                if($oldDateEnd != $revenuePartsKwh->date_end) {
                    $dateRegistrationDayAfterOldEnd = Carbon::parse($oldDateEnd)->addDay()->format('Y-m-d');
                    $oldEndRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterOldEnd)->first();
                    if ($oldEndRevenueValuesKwh) {
                        $oldEndRevenueValuesKwh->delete();
                    }
                    $revenuePartsKwh->revenuesKwh->date_end = $revenuePartsKwh->date_end;
                    $revenuePartsKwh->revenuesKwh->save();
                }

                // Bijwerken of aanmaken start values kwh.
                if ($beginRevenueValuesKwh) {
                    if (in_array($beginRevenueValuesKwh->status, ['confirmed', 'processed'])) {
                        return;
                    }
                    $beginRevenueValuesKwh->kwh_start = $valuesKwhData['kwhStart'];
                    $beginRevenueValuesKwh->kwh_start_high = $valuesKwhData['kwhStartHigh'];
                    $beginRevenueValuesKwh->kwh_start_low = $valuesKwhData['kwhStartLow'];
                    $beginRevenueValuesKwh->save();
                } else {
                    RevenueValuesKwh::create([
                        'revenue_id' => $revenuePartsKwh->revenue_id,
                        'date_registration' => $beginRevenueValuesKwh,
                        'is_simulated' => false,
                        'kwh_start' => $valuesKwhData['kwhStart'],
                        'kwh_start_high' => $valuesKwhData['kwhStartHigh'],
                        'kwh_start_low' => $valuesKwhData['kwhStartLow'],
                        'kwh_end' => 0,
                        'kwh_end_high' => 0,
                        'kwh_end_low' => 0,
                        'status' => 'concept',
                        'delivered_kwh' => 0
                    ]);
                }

                // Bijwerken of aanmaken end values kwh (deze plaatsen we in start values kwh 1 dag na einddatum.
                if ($endRevenueValuesKwh) {
                    if (in_array($endRevenueValuesKwh->status, ['confirmed', 'processed'])) {
                        return;
                    }
                    $endRevenueValuesKwh->kwh_start = $valuesKwhData['kwhEnd'];
                    $endRevenueValuesKwh->kwh_start_high = $valuesKwhData['kwhEndHigh'];
                    $endRevenueValuesKwh->kwh_start_low = $valuesKwhData['kwhEndLow'];
                    $endRevenueValuesKwh->save();
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
                        'delivered_kwh' => 0
                    ]);
                }

                // Opnieuw aanmaken simulated values kwh tussen begin en eind datum.
                $this->createOrUpdateRevenueValuesKwhSimulate($revenuePartsKwh, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd);

            }
        }
    }

    /**
     * @param $revenueDistributionPartsKwh
     */
    public function createOrUpdateRevenueValuesKwhSimulate(RevenuePartsKwh $revenuePartsKwh, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd): void
    {
        $daysOfPeriod = Carbon::parse($dateRegistrationDayAfterEnd)->diffInDays(Carbon::parse($partDateBegin));
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $partDateBegin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();

        $deliveredHighPerDay = round((($endRevenueValuesKwh->kwh_start_high - $beginRevenueValuesKwh->kwh_start_high) / $daysOfPeriod), 6);
        $deliveredLowPerDay = round((($endRevenueValuesKwh->kwh_start_low - $beginRevenueValuesKwh->kwh_start_low) / $daysOfPeriod), 6);
        $deliveredTotalPerDay = round((($endRevenueValuesKwh->kwh_start - $beginRevenueValuesKwh->kwh_start) / $daysOfPeriod), 6);

        $kwhStart = $beginRevenueValuesKwh->kwh_start;
        $kwhEnd = $beginRevenueValuesKwh->kwh_start + $deliveredTotalPerDay;
        $kwhStartHigh = $beginRevenueValuesKwh->kwh_start_high;
        $kwhEndHigh = $beginRevenueValuesKwh->kwh_start_high + $deliveredHighPerDay;
        $kwhStartLow = $beginRevenueValuesKwh->kwh_start_low;
        $kwhEndLow = $beginRevenueValuesKwh->kwh_start_low + $deliveredLowPerDay;
        // Iterate over the period

        $period = CarbonPeriod::create($partDateBegin, $partDateEnd);
        foreach ($period as $date) {
            $dateRegistration = $date->format('Y-m-d');
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistration)->first();
            if($revenueValuesKwh) {
                if($revenueValuesKwh->date_registration == $partDateBegin){
                    $revenueValuesKwh->delivered_kwh = $deliveredTotalPerDay;
                    $revenueValuesKwh->save();
                }
            } else {
                // Als we einddatum bereikt hebben, dan afrondingsverschil op laatste simulatie verwerken.
                if($dateRegistration == $partDateEnd){
                    $deliveredTotal = $kwhEnd - $kwhStart;
                } else {
                    $deliveredTotal = $deliveredTotalPerDay;
                }

                $revenueValuesKwh = RevenueValuesKwh::create([
                    'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'status' => 'concept',
                    'delivered_kwh' => $deliveredTotal,
                ]);
            }
            $kwhStart = $kwhEnd;
            $kwhEnd = $kwhStart + $deliveredTotalPerDay;
            $kwhStartHigh = $kwhEndHigh;
            $kwhEndHigh = $kwhStartHigh + $deliveredHighPerDay;
            $kwhStartLow = $kwhEndLow;
            $kwhEndLow = $kwhStartLow + $deliveredLowPerDay;
        }
    }

    public function saveParticipantsOfDistributionParts(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(300);

        $revenuesKwh = $revenuePartsKwh->revenuesKwh;
        foreach ($revenuesKwh->distributionKwh as $distributionKwh) {
            $this->saveDistributionPartsKwh($revenuePartsKwh, $distributionKwh);
        }
    }

    protected function saveDistributionPartsKwh(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh):void
    {
        // Bepalen energiesupplier
        $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $partDateEnd = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $distributionKwh->participation->address_id)
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('member_since')
                            ->where('member_since', '<=', $partDateBegin);
                    })
                    ->orWhereNull('member_since');
            })
            ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                $addressEnergySupplier
                    ->where(function ($addressEnergySupplier) use ($partDateBegin) {
                        $addressEnergySupplier->whereNotNull('end_date')
                            ->where('end_date', '>=', $partDateBegin);
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
        $distributionPartsKwh->save();

        $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
        list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, $partDateBegin, $partDateEnd, $distributionPartsKwh);
        $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
        $distributionPartsKwh->participations_quantity = $quantityOfParticipations;

        $distributionPartsKwh->distributionKwh->newOrConceptDistributionValuesKwh()->where('parts_id', $revenuePartsKwh->id)->delete();
        $this->saveDistributionValuesKwh($partDateBegin, $partDateEnd, $distributionPartsKwh);

        $distributionPartsKwh->delivered_kwh = 0;
        $distributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
        $distributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
        $distributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number: null;

        $distributionPartsKwh->save();
    }

    /**
     * @param RevenueDistributionKwh $distributionKwh
     * @return int[]
     */
    protected function determineParticipationsQuantityPart($dateBeginRevenues, $partDateBegin, $partDateEnd, RevenueDistributionPartsKwh $distributionPartsKwh): array
    {
        // startwaardes uit distributionKwh halen (die zijn al bepaald en dan hoeven we niet weer helemaal bij date_register datum van participation te beginnen.)
        $quantityOfParticipationsAtStart = $distributionPartsKwh->distributionKwh->participations_quantity_at_start;
        $quantityOfParticipations = $distributionPartsKwh->distributionKwh->participations_quantity_at_start;

        $mutations = $distributionPartsKwh->distributionKwh->participation->mutationsDefinitiveForKwhPeriod->whereBetween('date_entry', [$dateBeginRevenues, $partDateEnd]);

        foreach ($mutations as $mutation) {
            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry <= $partDateBegin) {
                $quantityOfParticipationsAtStart += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry <= $partDateEnd) {
                $quantityOfParticipations += $mutation->quantity;
            }
        }

        return array($quantityOfParticipationsAtStart, $quantityOfParticipations);
    }

    protected function saveDistributionValuesKwh($partDateBegin, $partDateEnd, RevenueDistributionPartsKwh $distributionPartsKwh): void
    {
        // startwaardes uit distributionKwh halen (die zijn al bepaald en dan hoeven we niet weer helemaal bij date_register datum van participation te beginnen.)
        $participationsQuantity = $distributionPartsKwh->participations_quantity_at_start;          // 2

        $mutations = $distributionPartsKwh->distributionKwh->participation->mutationsDefinitiveForKwhPeriod->whereBetween('date_entry', [$partDateBegin, $partDateEnd]);
        $dateBegin = Carbon::parse($partDateBegin);  // dateBegin = 01-06-2024
        $dateEnd = Carbon::parse($partDateEnd);      // dateEnd   = 10-06-2024
        foreach ($mutations as $mutation) {
            $dateEndMutation = Carbon::parse($mutation->date_entry)->subDay(); // dateEnd   = 05-06-2024

            $dateEndForPeriod = clone $dateEndMutation;
            $dateEndForPeriod->endOfDay();
            $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);
            RevenueDistributionValuesKwh::updateOrCreate(
                [
                    'date_begin' => $dateBegin->format('Y-m-d'),
                    'date_end' => $dateEndMutation->format('Y-m-d'),
                    'distribution_id' => $distributionPartsKwh->distribution_id,
                    'revenue_id' => $distributionPartsKwh->revenue_id,
                    'parts_id' => $distributionPartsKwh->parts_id,
                    'status' => 'concept',
                    'days_of_period' => $daysOfPeriod,
                    'participations_quantity' => $participationsQuantity,
                    'quantity_multiply_by_days' => $participationsQuantity * $daysOfPeriod,
                    'delivered_kwh' => 0
                ]);

            $participationsQuantity += $mutation->quantity;
            $dateBegin = Carbon::parse($mutation->date_entry); // dateBegin = 06-06-2024
        }

        $dateEndForPeriod = clone $dateEnd;
        $dateEndForPeriod->endOfDay();
        $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);

        RevenueDistributionValuesKwh::create(
            [
                'date_begin' => $dateBegin->format('Y-m-d'),
                'date_end' => $dateEnd->format('Y-m-d'),
                'distribution_id' => $distributionPartsKwh->distribution_id,
                'revenue_id' => $distributionPartsKwh->revenue_id,
                'parts_id' => $distributionPartsKwh->parts_id,
                'status' => 'concept',
                'days_of_period' => $daysOfPeriod,
                'participations_quantity' => $participationsQuantity,
                'quantity_multiply_by_days' => $participationsQuantity * $daysOfPeriod,
                'delivered_kwh' => 0
        ]);

}

public function splitRevenuePartsKwh(ParticipantProject $participant, $splitDate, AddressEnergySupplier $addressEnergySupplier = null)
    {
        $splitDateString = Carbon::parse($splitDate)->format('Y-m-d');

        // Zoek revenue part waar splitdatum in valt. Indien splitdatum is bestaande begindatum van een part,
        // dan hoeft er niet gesplitst te worden. We splitsen ook niet meer als distribution van deelname
        // al verwerkt is.
        // Perioden: A: 01-01-2020 t/m 31-12-2020
        //           B: 01-01-2021 t/m 31-12-2021
        // Split datum: 01-07-2020 => splitsing A: 01-01-2020 t/m 30-06-2020 en 01-07-2020 t/m 31-12-2020
        // Split datum: 31-12-2020 => splitsing A: 01-01-2020 t/m 30-12-2020 en 31-12-2020 t/m 31-12-2020
        // Split datum: 01-01-2021 => geen splitsing nodig
        // Split datum: 02-01-2021 => splitsing B: 01-01-2021 t/m 01-01-2021 en 02-01-2021 t/m 31-12-2021
        // Split datum: 01-07-2021 => splitsing B: 01-01-2021 t/m 30-06-2021 en 01-07-2021 t/m 31-12-2021
        //
        //                                         01-07-2020  31-12-2020  01-01-2021  02-01-2021  01-07-2021
        // Perioden: A: 01-01-2020 t/m 31-12-2020  true/true*  true/true*  true/false  true/false  true/false
        //           B: 01-01-2021 t/m 31-12-2021  false/false false/true  false/true  true/true*  true/true*
        $revenuePartsKwh = RevenuePartsKwh::where('date_begin', '<', $splitDateString)
            ->where('date_end', '>=', $splitDateString)
            ->whereHas('revenuesKwh', function ($query) use($participant) {
                $query->whereHas('distributionKwh', function ($query) use($participant) {
                    $query->where('participation_id', $participant->id)
                        ->where('status', '!=', 'processed');
                });
            })->first();

        // indien niet gevonden, klaar.
        if(!$revenuePartsKwh){
            return;
        }
        // indien gevonden part helemaal verwerkt, dan geen splitsing meer.
        if($revenuePartsKwh->status == 'processed'){
            return;
        }

        //  1 oude einddatum originele revenuePartsKwh bewaren
        //    nieuwe einddatum originele revenuePartsKwh:: Splitsdatum - 1 dag.
        //    indien status concept, dan originele revenuePartsKwh op new zetten (ze moeten eindstanden nog toevoegen)
        $oldEndDateOriginalPartsKwh = Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
        $newRevenuePartsKwh = $revenuePartsKwh->replicate();
        $newEndDateOriginalPartsKwh = Carbon::parse($splitDate)->subDay()->format('Y-m-d');
        $revenuePartsKwh->date_end = $newEndDateOriginalPartsKwh;
        if($revenuePartsKwh->status == 'concept'){
            $revenuePartsKwh->status = 'new';
            $revenuePartsKwh->delivered_total_concept = 0;
            $revenuePartsKwh->delivered_total_confirmed = 0;
            $revenuePartsKwh->delivered_total_processed = 0;
        }
        $revenuePartsKwh->save();

        //  2 Values op splitDate van simulated afhalen (indien nog niet definitief).
        $revenueValuesKwhOnSplitDate = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
            ->where('date_registration', $splitDateString)
            ->first();
        if ($revenueValuesKwhOnSplitDate) {
            if($revenueValuesKwhOnSplitDate->status == 'concept'){
                $revenueValuesKwhOnSplitDate->is_simulated = false;
                $revenueValuesKwhOnSplitDate->save();
            }
        }

        //  3 Nieuw revenuePartsKwh:
        //    begindatum = splitsdatum, einddatum = oude einddatum originele revenuePartsKwh, delivered totalen op 0 (alleen bij concept).
        //    overige gegevens overnemen originele revenuePartsKwh.
        $newRevenuePartsKwh->date_begin = $splitDateString;
        $newRevenuePartsKwh->date_end = $oldEndDateOriginalPartsKwh;
        if($newRevenuePartsKwh->status == 'concept'){
            $newRevenuePartsKwh->status = 'new';
            $newRevenuePartsKwh->delivered_total_concept = 0;
            $newRevenuePartsKwh->delivered_total_confirmed = 0;
            $newRevenuePartsKwh->delivered_total_processed = 0;
        }
        $newRevenuePartsKwh->save();

        //  Stappen 4, 4b en 5 hoeven niet als revenuePartsKwh status new heeft.
        if($revenuePartsKwh->status != 'new') {

            //  4 Doorlezen distributionPartsKwh van originele distributionPartsKwh en nieuwe aanmaken met:
            //    parts_id = (id_new).
            //    delivered_kwh op 0.
            //    address energy supplier data uit binnenkomende parm mits meegegeven.
            //    overige gegevens overnemen originele distributionPartsKwh.
            //
            $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
            foreach ($revenuePartsKwh->distributionPartsKwh as $distributionPartsKwh) {
                $newDistributionPartsKwh = $distributionPartsKwh->replicate();
                $newDistributionPartsKwh->parts_id = $newRevenuePartsKwh->id;
                $newDistributionPartsKwh->delivered_kwh = 0;
                if ($addressEnergySupplier) {
                    $newDistributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
                    $newDistributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
                    $newDistributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number : null;
                }
                $newDistributionPartsKwh->save();
                list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, Carbon::parse($newRevenuePartsKwh->date_begin)->format('Y-m-d'), Carbon::parse($newRevenuePartsKwh->date_end)->format('Y-m-d'), $newDistributionPartsKwh);
                $newDistributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
                $newDistributionPartsKwh->participations_quantity = $quantityOfParticipations;
                $newDistributionPartsKwh->save();

                //  4b Bij originele distributionPartsKwh records participations_quantity opnieuw bepalen voor split datum.
                $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
                list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d'), Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d'), $distributionPartsKwh);
                $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
                $distributionPartsKwh->participations_quantity = $quantityOfParticipations;
                $distributionPartsKwh->save();

                //  5a Concept -> delete distributions bij orignele part en maak ze opnieuw bij originele en nieuwe.
                //
                if($revenuePartsKwh->status == 'concept') {
                    $distributionPartsKwh->newOrConceptDistributionValuesKwh()->where('parts_id', $revenuePartsKwh->id)->delete();
                    $this->saveDistributionValuesKwh($revenuePartsKwh->date_begin, $revenuePartsKwh->date_end, $distributionPartsKwh);
                }else{
                    //  5b Doorlezen distributionValuesKwh voor van originele revenuePartsKwh voor datums nieuwe aanpassen:
                    //    parts_id = (id_new).
                    //    overige gegevens overnemen originele distributionValuesKwh.
                    //
                    foreach ($revenuePartsKwh->distributionValuesKwh->sortBy('date_begin') as $distributionValuesKwh) {
                        // Splitdatum na einddatum, dan geen splitsing en behouden bij originele.
                        if($splitDateString > Carbon::parse($distributionValuesKwh->date_end)->format('Y-m-d') ){
                        }
                        // Splitdatum gelijk aan of na begindatum maar voor einddatum, dan splitsen.
                        if($splitDateString >= Carbon::parse($distributionValuesKwh->date_begin)->format('Y-m-d') && $splitDateString < Carbon::parse($distributionValuesKwh->date_end)){
                            $newDistributionValuesKwh = $distributionValuesKwh->replicate();
                            $newDistributionValuesKwh->date_begin = $splitDateString;
                            $newDistributionValuesKwh->date_end = $oldEndDateOriginalPartsKwh;
                            $newDistributionValuesKwh->parts_id = $newRevenuePartsKwh->id;
                            $dateEndForPeriodNew = clone Carbon::parse($oldEndDateOriginalPartsKwh);
                            $dateEndForPeriodNew->endOfDay();
                            $newDistributionValuesKwh->days_of_period = $dateEndForPeriodNew->addDay()->diffInDays(Carbon::parse($splitDateString));
                            $newDistributionValuesKwh->quantity_multiply_by_days = $newDistributionValuesKwh->participations_quantity * $newDistributionValuesKwh->days_of_period;
                            $newDistributionValuesKwh->delivered_kwh = round($newDistributionValuesKwh->delivered_kwh / $distributionValuesKwh->days_of_period * $newDistributionValuesKwh->days_of_period, 6);
                            $newDistributionValuesKwh->save();

                            //  Bij originele distributionValuesKwh
                            $dateEndForPeriodOriginal = clone Carbon::parse($newEndDateOriginalPartsKwh);
                            $dateEndForPeriodOriginal->endOfDay();
                            $distributionValuesKwh->date_end = $newEndDateOriginalPartsKwh;
                            $distributionValuesKwh->days_of_period = $dateEndForPeriodOriginal->addDay()->diffInDays(Carbon::parse($revenuePartsKwh->date_begin));
                            $distributionValuesKwh->quantity_multiply_by_days =$distributionValuesKwh->participations_quantity * $distributionValuesKwh->days_of_period;
                            $distributionValuesKwh->delivered_kwh = $distributionValuesKwh->delivered_kwh - $newDistributionValuesKwh->delivered_kwh;
                            $distributionValuesKwh->save();

                        }
                        // Splitdatum voor begin, dan overzetten naar nieuwe part.
                        if($splitDateString < Carbon::parse($distributionValuesKwh->date_begin)->format('Y-m-d')){
                            // overzetten naar nieuwe part.
                            $distributionValuesKwh->parts_id = $newRevenuePartsKwh->id;
                            $distributionValuesKwh->save();
                        }
                    }

                }
                $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('distribution_id', $distributionPartsKwh->distribution_id)->where('parts_id', $revenuePartsKwh->id)->sum('delivered_kwh');
                $distributionPartsKwh->delivered_kwh = $totalDeliveredKwh;
                $distributionPartsKwh->save();

                $newTotalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $newRevenuePartsKwh->revenue_id)->where('distribution_id', $newDistributionPartsKwh->distribution_id)->where('parts_id', $newRevenuePartsKwh->id)->sum('delivered_kwh');
                $newDistributionPartsKwh->delivered_kwh = $newTotalDeliveredKwh;
                $newDistributionPartsKwh->save();
            }
            $revenuePartsKwhForRecalculate = RevenuePartsKwh::find($revenuePartsKwh->id);
            $revenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();
            $newRevenuePartsKwhForRecalculate = RevenuePartsKwh::find($newRevenuePartsKwh->id);
            $newRevenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();

        }

    }


}
