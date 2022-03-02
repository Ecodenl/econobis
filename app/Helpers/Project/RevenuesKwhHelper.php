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
// todo WM: cleanup
//
//        $partDateBegin =  Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
//        $partDateEnd =  Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
//        $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

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
// todo WM: cleanup
//
//                    $revenueValuesKwh->kwh_end = $kwhEnd;
//                    $revenueValuesKwh->kwh_end_high = $kwhEndHigh;
//                    $revenueValuesKwh->kwh_end_low = $kwhEndLow;
                    $revenueValuesKwh->delivered_kwh = $deliveredTotalPerDay;
                    $revenueValuesKwh->save();
                }
            } else {
                // Als we einddatum bereikt hebben, dan afrondingsverschil op laatste simulatie verwerken.
                if($dateRegistration == $partDateEnd){
// todo WM: cleanup
//
//                    $kwhEnd = $endRevenueValuesKwh->kwh_start;
//                    $kwhEndHigh = $endRevenueValuesKwh->kwh_start_high;
//                    $kwhEndLow = $endRevenueValuesKwh->kwh_start_low;
                    $deliveredTotal = $kwhEnd - $kwhStart;
                } else {
                    $deliveredTotal = $deliveredTotalPerDay;
                }

                $revenueValuesKwh = RevenueValuesKwh::create([
                    'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
// todo WM: cleanup
//
//                    'kwh_end' => $kwhEnd,
                    'kwh_start_high' => $kwhStartHigh,
//                    'kwh_end_high' => $kwhEndHigh,
                    'kwh_start_low' => $kwhStartLow,
//                    'kwh_end_low' => $kwhEndLow,
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

// todo WM: cleanup
//
//            $this->saveDistributionValues($revenuePartsKwh, $revenueValuesKwh);
        }
    }

// todo WM: cleanup
//
//    protected function saveDistributionValues(RevenuePartsKwh $revenuePartsKwh, RevenueValuesKwh $revenueValuesKwh): void
//    {
//        $distributionsKwh = $revenuePartsKwh->revenuesKwh->distributionKwh->where('status', 'concept');
//        foreach ($distributionsKwh as $distributionKwh) {
//            $participationsQuantity = $this->xxx_determineParticipationsQuantity($distributionKwh, $revenueValuesKwh->date_registration);
//            RevenueDistributionValuesKwh::create([
//                'revenue_values_id' => $revenueValuesKwh->id,
//                'date_registration' => $revenueValuesKwh->date_registration,
//                'distribution_id' => $distributionKwh->id,
//                'revenue_id' => $revenuePartsKwh->revenuesKwh->id,
//                'parts_id' => $revenuePartsKwh->id,
//                'status' => 'concept',
//                'participations_quantity' => $participationsQuantity,
//                'delivered_kwh' => 0,
//            ]);
//        }
//    }

    public function saveParticipantsOfDistributionParts(RevenuePartsKwh $revenuePartsKwh)
    {
        set_time_limit(300);

        $revenuesKwh = $revenuePartsKwh->revenuesKwh;
        foreach ($revenuesKwh->distributionKwh as $distributionKwh) {
            $this->saveDistributionPartsKwh($revenuePartsKwh, $distributionKwh);
// todo WM: cleanup
//
//            $this->saveDistributionValuesKwh($revenuePartsKwh, $distributionKwh);
        }
    }

    protected function saveDistributionPartsKwh(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh):void
    {
        $distributionKwh->newOrConceptDistributionValuesKwh()->where('parts_id', $revenuePartsKwh->id)->delete();

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

// todo WM: cleanup
//
//        Log::info('Debug determineParticipationsQuantityPart');
//        Log::info('participation id: ' . $distributionPartsKwh->distributionKwh->participation_id);
//        Log::info('dateBeginRevenues: ' . $dateBeginRevenues);
//        Log::info('partDateBegin: ' . $partDateBegin);
//        Log::info('Vooraf quantityOfParticipationsAtStart: ' . $quantityOfParticipationsAtStart);
//        Log::info('Vooraf quantityOfParticipations: ' . $quantityOfParticipations);


        $mutations = $distributionPartsKwh->distributionKwh->participation->mutationsDefinitiveForKwhPeriod->whereBetween('date_entry', [$dateBeginRevenues, $partDateEnd]);

        foreach ($mutations as $mutation) {
// todo WM: cleanup
//
//            Log::info('Mutatie datum: ' . $mutation->date_entry );
//            Log::info('Mutatie aantal: ' . $mutation->quantity);

            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry <= $partDateBegin) {
                $quantityOfParticipationsAtStart += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry <= $partDateEnd) {
                $quantityOfParticipations += $mutation->quantity;
            }
// todo WM: cleanup
//
//            Log::info('Opgeteld bij quantityOfParticipationsAtStart: ' . $quantityOfParticipationsAtStart);
//            Log::info('Opgeteld bij quantityOfParticipations: ' . $quantityOfParticipations);
        }

// todo WM: cleanup
//
//        Log::info('Na quantityOfParticipationsAtStart: ' . $quantityOfParticipationsAtStart);
//        Log::info('Na quantityOfParticipations: ' . $quantityOfParticipations);

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
// todo WM: cleanup
//
//            Log::info('dateBegin mutatie: ' . $dateBegin);
//            Log::info('dateEnd   mutatie: ' . $dateEndMutation);

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
// todo WM: cleanup
//
//        Log::info('dateBegin laatste: ' . $dateBegin);
//        Log::info('dateEnd   laatste: ' . $dateEnd);

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

// todo WM: nog aanpassen aan wijzigingen revenueDistributionValuesKwh tabel !
//
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

        //  2 Values op splitDate van simulated afhalen.
        //  Bij status new (origineel concept) standen op 0 zetten.
        $revenueValuesKwhOnSplitDate = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
            ->where('date_registration', $splitDateString)
            ->first();
        if ($revenueValuesKwhOnSplitDate) {
            $revenueValuesKwhOnSplitDate->is_simulated = false;
//            if($revenuePartsKwh->status == 'new'){
//                $revenueValuesKwhOnSplitDate->kwh_start = 0;
//                $revenueValuesKwhOnSplitDate->kwh_end = 0;
//                $revenueValuesKwhOnSplitDate->kwh_start_high = 0;
//                $revenueValuesKwhOnSplitDate->kwh_end_high = 0;
//                $revenueValuesKwhOnSplitDate->kwh_start_low = 0;
//                $revenueValuesKwhOnSplitDate->kwh_end_low = 0;
//            }
            $revenueValuesKwhOnSplitDate->save();
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

                //  4b Bij originele distributionPartsKwh records participations_quantity opnieuw bepalen uit revenue_distribution_values_kwh
                //    voor split datum.
                if ($revenueValuesKwhOnSplitDate) {
                    $revenueDistributionValuesKwhOnSplitDate = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
                        ->where('date_registration', $splitDateString)
                        ->where('parts_id', $distributionPartsKwh->parts_id)
                        ->where('distribution_id', $distributionPartsKwh->distribution_id)
                        ->first();
                    if ($revenueValuesKwhOnSplitDate) {
                        $distributionPartsKwh->participations_quantity = $revenueDistributionValuesKwhOnSplitDate->participations_quantity;
                        $distributionPartsKwh->save();
                    }
                }
            }

            //  5 Doorlezen distributionValuesKwh voor van originele revenuePartsKwh voor datums nieuwe aanpassen:
            //    parts_id = (id_new).
            //    overige gegevens overnemen originele distributionValuesKwh.
            //
            $period = CarbonPeriod::create($splitDateString, Carbon::parse($oldEndDateOriginalPartsKwh)->format('Y-m-d'));
            foreach ($period as $date) {
                $revenueDistributionValuesKwhOnDate = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
                    ->where('date_registration', Carbon::parse($date)->format('Y-m-d'))
                    ->where('parts_id', $revenuePartsKwh->id)
                    ->get();
                foreach ($revenueDistributionValuesKwhOnDate as $distributionValuesKwh) {
                    $distributionValuesKwh->parts_id = $newRevenuePartsKwh->id;
                    $distributionValuesKwh->save();
                }
            }
        }

        //  6 Indien status revenuePartsKwh = new, dan legen distributionParts en Values.
        //    Indien status revenuePartsKwh = concept, dan legen distributionParts en Values / verwerken / recalculate conform update revenuePartsKwh
        //    voor zowel oorspronkelike revenuePartsKwh als nieuwe.
        //    Indien Indien status revenuePartsKwh = confirmed, dan alleen doortellingen opnieuw in distributionPartsKwh en revenuePartsKwh
        //    voor zowel oorspronkelike revenuePartsKwh als nieuwe.
        if($revenuePartsKwh->status == 'new'){
            $revenuePartsKwh->newOrConceptDistributionPartsKwh()->delete();
            $revenuePartsKwh->newOrConceptDistributionValuesKwh()->delete();
            return;
        }
        if($revenuePartsKwh->status == 'concept'){
// todo WM: check
//            $revenuePartsKwh->calculator()->runRevenuePartsKwh(null, null);
            $revenuePartsKwh->status = 'concept-to-update';
            $revenuePartsKwh->save();

            $revenueValuesKwhOnEndDateOriginal = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
                ->where('date_registration', $oldEndDateOriginalPartsKwh)
                ->first();
            $valuesKwhData = [
                'kwhEnd' =>  $revenueValuesKwhOnEndDateOriginal->kwhStart,
                'kwhEndHigh' => $revenueValuesKwhOnEndDateOriginal->kwhStartHigh,
                'kwhEndLow' => $revenueValuesKwhOnEndDateOriginal->kwhStartLow,
                'kwhEnd' =>  $revenueValuesKwhOnEndDateOriginal->kwhEnd,
                'kwhEndHigh' => $revenueValuesKwhOnEndDateOriginal->kwhEndHigh,
                'kwhEndLow' => $revenueValuesKwhOnEndDateOriginal->kwhEndLow,
            ];
// todo WM: check
//
//            $newRevenuePartsKwh->calculator()->runRevenuePartsKwh($valuesKwhData, null);
            $newRevenuePartsKwh->status = 'concept-to-update';
            $newRevenuePartsKwh->save();
        }
// todo WM: check
//
        if($revenuePartsKwh->status == 'confirmed') {
            foreach ($newRevenuePartsKwh->revenuesKwh->partsKwh as $revenuePartsKwhForUpdateDeliveredKwh) {
                foreach ($revenuePartsKwhForUpdateDeliveredKwh->distributionPartsKwh as $distributionPartsKwh) {
                    $distributionPartsDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
                        ->where('distribution_id', $distributionPartsKwh->distribution_id)
                        ->where('parts_id', $distributionPartsKwh->parts_id)->sum('delivered_kwh');
                    $distributionPartsKwh->delivered_kwh = $distributionPartsDeliveredKwh;
                    $distributionPartsKwh->save();
                }
                $revenuePartsKwhForUpdateDeliveredKwh->delivered_total_concept = $revenuePartsKwhForUpdateDeliveredKwh->distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
                $revenuePartsKwhForUpdateDeliveredKwh->delivered_total_confirmed = $revenuePartsKwhForUpdateDeliveredKwh->distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
                $revenuePartsKwhForUpdateDeliveredKwh->delivered_total_processed = $revenuePartsKwhForUpdateDeliveredKwh->distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
                $revenuePartsKwhForUpdateDeliveredKwh->save();

                $newRevenuePartsKwh->revenuesKwh->delivered_total_concept = $revenuePartsKwhForUpdateDeliveredKwh->revenuesKwh->distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
                $newRevenuePartsKwh->revenuesKwh->delivered_total_confirmed = $revenuePartsKwhForUpdateDeliveredKwh->revenuesKwh->distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
                $newRevenuePartsKwh->revenuesKwh->delivered_total_processed = $revenuePartsKwhForUpdateDeliveredKwh->revenuesKwh->distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
                $newRevenuePartsKwh->revenuesKwh->save();
            }
        }
    }


}
