<?php

namespace App\Helpers\Project;


use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Http\Controllers\Api\Project\RevenuePartsKwhController;
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
        if($revenuePartsKwh->status == 'confirmed') {
            // todo WM: nog doen!!!
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
        //    begindatum = splitsdatum, einddatum = oude einddatum originele revenuePartsKwh, delivered totalen op 0.
        //    overige gegevens overnemen originele revenuePartsKwh.
        if($newRevenuePartsKwh->status == 'concept'){
            $newRevenuePartsKwh->status = 'new';
        }
        $newRevenuePartsKwh->date_begin = $splitDateString;
        $newRevenuePartsKwh->date_end = $oldEndDateOriginalPartsKwh;
        $newRevenuePartsKwh->delivered_total_concept = 0;
        $newRevenuePartsKwh->delivered_total_confirmed = 0;
        $newRevenuePartsKwh->delivered_total_processed = 0;
        $newRevenuePartsKwh->save();

        //  Stappen 4, 4b en 5 hoeven alleen indien originele revenuePartsKwh status confirmed heeft.
        if($revenuePartsKwh->status == 'confirmed') {

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

                //  4b Bij originelee distributionPartsKwh records participations_quantity opnieuw bepalen uit revenue_distribution_values_kwh
                //    voor split datum.
                //    delivered_kwh op 0.
                if ($revenueValuesKwhOnSplitDate) {
                    $revenueDistributionValuesKwhOnSplitDate = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)
                        ->where('date_registration', $splitDateString)
                        ->where('parts_id', $distributionPartsKwh->parts_id)
                        ->where('distribution_id', $distributionPartsKwh->distribution_id)
                        ->first();
                    if ($revenueValuesKwhOnSplitDate) {
                        $distributionPartsKwh->participations_quantity = $revenueDistributionValuesKwhOnSplitDate->participations_quantity;
                        $distributionPartsKwh->delivered_kwh = 0;
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
                    ->where('parts_id', $revenuePartsKwh->parts_id)
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
            return $newRevenuePartsKwh;
        }
        if($revenuePartsKwh->status == 'concept'){
            $revenuePartsKwh->calculator()->runRevenueKwh(null);

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
            $newRevenuePartsKwh->calculator()->runRevenueKwh($valuesKwhData);
        }
        if($revenuePartsKwh->status == 'confirmed') {
            // todo WM: nog doen!!!
        }

    }

}
