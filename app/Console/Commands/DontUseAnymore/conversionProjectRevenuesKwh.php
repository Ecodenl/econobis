<?php

namespace App\Console\Commands\DontUseAnymore;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Contact\Contact;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\Project\xxxProjectRevenueDeliveredKwhPeriod;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Http\Controllers\Api\Project\RevenuesKwhController;
use Carbon\CarbonPeriod;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class conversionProjectRevenuesKwh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionProjectRevenuesKwh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie project revenues Kwh';

    public $projectRevenueKwhSplitCategoryId;
    public $projectRevenueKwhCategoryId;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $dispatcherProjectRevenue = ProjectRevenue::getEventDispatcher();
        $dispatcherRevenuesKwh = RevenuesKwh::getEventDispatcher();
        $dispatcherRevenuePartsKwh = RevenuePartsKwh::getEventDispatcher();
        // Remove Dispatcher
        ProjectRevenue::unsetEventDispatcher();
        RevenuesKwh::unsetEventDispatcher();
        RevenuePartsKwh::unsetEventDispatcher();

        $this->projectRevenueKwhSplitCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwhSplit')->first()->id;
        $this->projectRevenueKwhCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first()->id;

        $conversionRevenuesKwh = DB::table('xxx_conversion_revenues_kwh')->get();
        if($conversionRevenuesKwh->count() == 0) {
            DB::statement('DELETE FROM xxx_project_revenues;');
            DB::statement('INSERT xxx_project_revenues SELECT * FROM old_project_revenues;');
        }

        $conversionRevenuesKwhToDo = DB::table('xxx_conversion_revenues_kwh')->where('done', false)->get();
        foreach($conversionRevenuesKwhToDo as $conversionRevenuesKwh) {
            DB::statement('DELETE FROM xxx_project_revenue_delivered_kwh_period where revenue_id = ' . $conversionRevenuesKwh->old_revenue_id . ';');
            DB::statement('DELETE FROM revenue_values_kwh where revenue_id = ' . $conversionRevenuesKwh->new_revenue_id . ';');
            DB::statement('DELETE FROM revenue_distribution_parts_kwh where revenue_id = ' . $conversionRevenuesKwh->new_revenue_id . ';');
            DB::statement('DELETE FROM revenue_distribution_values_kwh where revenue_id = ' . $conversionRevenuesKwh->new_revenue_id . ';');
            DB::statement('DELETE FROM revenue_distribution_kwh where revenue_id = ' . $conversionRevenuesKwh->new_revenue_id . ';');
            DB::statement('DELETE FROM revenue_parts_kwh where revenue_id = ' . $conversionRevenuesKwh->new_revenue_id . ';');
            DB::statement('DELETE FROM revenues_kwh where id = ' . $conversionRevenuesKwh->new_revenue_id . ';');
        }
        DB::statement('DELETE FROM xxx_conversion_revenues_kwh where done = false;');

        // eerst de totale opbrengstverdelingen
        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('category_id', $this->projectRevenueKwhCategoryId)->get();
        foreach($oldProjectRevenuesKwh as $oldProjectRevenue) {
            // DeliveredKwhPeriod zijn niet altijd correct meer. Deze voor conversie opnieuw maken.
            // todo WM: herzien voor ozon cooperaties, check of dit voor overige nog steeds goed gaat??
            $oldProjectRevenueDistribution = DB::table('old_project_revenue_distribution')
                ->where('revenue_id', $oldProjectRevenue->id)->get();
            foreach ($oldProjectRevenueDistribution as $oldDistribution) {
                $oldDistributionEloquent = ProjectRevenueDistribution::find($oldDistribution->id);
                $this->saveDeliveredKwhPeriod($oldDistributionEloquent);
            }
            foreach ($oldProjectRevenueDistribution as $oldDistribution) {
                $oldDistributionEloquent = ProjectRevenueDistribution::find($oldDistribution->id);
                $this->calculateDeliveredKwh($oldDistributionEloquent);
            }

            $xxxConversionRevenuesKwh = DB::table('xxx_conversion_revenues_kwh')->where('old_revenue_id', $oldProjectRevenue->id)->first();
            if(!$xxxConversionRevenuesKwh || $xxxConversionRevenuesKwh->done == false){
                $this->createRevenuesKwh($oldProjectRevenue);
            }

        }

        // Nu de tussentijdse opbrengstverdelingen zonder totale opbrengstverdeling
        $oldProjectRevenuesKwhSplit = DB::table('xxx_project_revenues')
            ->where('category_id', $this->projectRevenueKwhSplitCategoryId)
            ->orderBy('date_begin')->get();

        foreach($oldProjectRevenuesKwhSplit as $oldProjectSplitRevenue) {
//            if($oldProjectSplitRevenue->id == 19){
//                Log::info('Test old split rev : ' . $oldProjectSplitRevenue->id);
//                Log::info('date_end b: ' . $oldProjectSplitRevenue->date_end);
//            }

            $xxxConversionRevenuesKwh = DB::table('xxx_conversion_revenues_kwh')->where('old_revenue_id', $oldProjectSplitRevenue->id)->first();
            if(!$xxxConversionRevenuesKwh || $xxxConversionRevenuesKwh->done == false){
                // Check of tussentijds periode reeds valt in een totale opbrengstverdeling.
                // tt 01-01-2022 t/m 30-06-2022
                //    01-01-2022 t/m 30-06-2022 01-01-2022 <= 01-01-2022 true 30-06-2022 > 01-01-2022 true
                // tt 01-07-2022 t/m 31-12-2022
                //    01-01-2022 t/m 31-12-2022 01-01-2022 <= 01-07-2022 true 31-12-2022 > 01-07-2022 true
                // tt 01-08-2020 t/m 24-01-2021
                //    01-08-2019 t/m 31-07-2020 01-08-2019 <= 01-08-2020 true 31-07-2020 > 01-08-2020 false!
                $projectRevenuesKwh = RevenuesKwh::where('project_id', $oldProjectSplitRevenue->project_id)
                    ->where('category_id', $this->projectRevenueKwhCategoryId)
                    ->where('date_begin', '<=', $oldProjectSplitRevenue->date_begin)
                    ->where('date_end', '>', $oldProjectSplitRevenue->date_begin)
                    ->orderBy('date_end', 'desc');
//                if($oldProjectSplitRevenue->id == 19){
//                    Log::info('date_begin b : ' . $oldProjectSplitRevenue->date_begin);
//                    Log::info($projectRevenuesKwh->pluck('id')->toArray());
//                }

                // Zo niet, dan controleren of er al een nieuwe revenueKwh is gemaakt van een vorige revenueKwhSplit.
                if (!$projectRevenuesKwh->exists()) {
                    $checkDate = Carbon::parse($oldProjectSplitRevenue->date_begin)->subDay()->format('Y-m-d');
                    $projectRevenuesKwhNew = RevenuesKwh::where('project_id', $oldProjectSplitRevenue->project_id)
                        ->where('category_id', $this->projectRevenueKwhCategoryId)
                        ->where('date_end', '=', $checkDate)
                        ->where('confirmed', true)
                        ->orderBy('date_end', 'desc');
//                    if ($projectRevenuesKwhNew->exists()) {
//                        // Zo ja, dan gebruiken we die reeds aangemaakt revenueKwh waarvan we de looptijd verder uitbreiden
//                        $revenuesKwhNew = $projectRevenuesKwhNew->first();
//                        $revenuesKwhNew->date_end = $oldProjectSplitRevenue->date_end;
//                        $revenuesKwhNew->save();
//                    } else {
                        // Zo niet, dan maken met nieuwe revenueKwh obv revenueKwhSplit en revenueKwhSplit verwerken in distribution parts
                        $this->createRevenuesKwh($oldProjectSplitRevenue);
//                    }
                }
            }
        }

        $xxxConversionRevenuesKwh = DB::table('xxx_conversion_revenues_kwh')->where('done', false)->get();
        foreach($xxxConversionRevenuesKwh as $conversionRevenuesKwh) {
            // 1 de concept revenues zonder split.
            if($conversionRevenuesKwh->participation_id == null && $conversionRevenuesKwh->old_confirmed == false && $conversionRevenuesKwh->hasSplitKwh == false){
                $this->doConversion1($conversionRevenuesKwh);
            }
            // 2 de bevestigde revenues zonder split.
            if($conversionRevenuesKwh->participation_id == null && $conversionRevenuesKwh->old_confirmed == true && $conversionRevenuesKwh->hasSplitKwh == false){
                $this->doConversion2($conversionRevenuesKwh);
            }
//            // 3 de concept revenues met split.
            if($conversionRevenuesKwh->participation_id == null && $conversionRevenuesKwh->old_confirmed == false && $conversionRevenuesKwh->hasSplitKwh == true){
                // todo WM: nog verder testen/aanpassen
                $this->doConversion3($conversionRevenuesKwh);
            }
//            // 4 de bevestigde revenues met split.
            if($conversionRevenuesKwh->participation_id == null && $conversionRevenuesKwh->old_confirmed == true && $conversionRevenuesKwh->hasSplitKwh == true){
                // todo WM: nog verder testen/aanpassen
                $this->doConversion4($conversionRevenuesKwh);
            }
//            // 5 de split revenues (zonder total revenue).
            if($conversionRevenuesKwh->participation_id != null){
                // todo WM: bevat nog een fout volgens mij
                $this->doConversion5($conversionRevenuesKwh);
            }

            $oldProjectRevenueEloquent = ProjectRevenue::find($conversionRevenuesKwh->old_revenue_id);

            $oldParticipationsQuantity = 0;
            $oldDeliveredTotalConcept = 0;
            $oldDeliveredTotalConfirmed = 0;
            $oldDeliveredTotalProcessed = 0;
            // DeliveredKwhPeriod zijn niet altijd correct meer. Deze voor conversie opnieuw maken.
            foreach ($oldProjectRevenueEloquent->distribution as $oldDistribution) {
//                if($oldDistribution->id == 486){
//                    Log::info('oldDistribution' . $oldDistribution->id);
//                    Log::info('status' . $oldDistribution->status);
//                    Log::info('delivered_total' . $oldDistribution->delivered_total);
//                }
                $oldParticipationsQuantity += $oldDistribution->participations_amount;
                if($oldDistribution->status == 'concept') {
                    $oldDeliveredTotalConcept += $oldDistribution->delivered_total;
                }
                if($oldDistribution->status == 'confirmed') {
                    $oldDeliveredTotalConfirmed += $oldDistribution->delivered_total;
                }
                if($oldDistribution->status == 'processed') {
                    $oldDeliveredTotalProcessed += $oldDistribution->delivered_total;
                }
            }

            $newRevenuesKwh = RevenuesKwh::find($conversionRevenuesKwh->new_revenue_id);

            foreach ($newRevenuesKwh->partsKwh as $partsKwh) {
//                $revenuePartsKwhForRecalculate = RevenuePartsKwh::find($partsKwh->id);
//                $revenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();
                $this->countingsConceptConfirmedProcessed($partsKwh);
            }

            $newParticipationsQuantity = 0;
            $newDeliveredTotalConcept = 0;
            $newDeliveredTotalConfirmed = 0;
            $newDeliveredTotalProcessed = 0;
//            Log::info('aantal new distributionKwh: ' . $newRevenuesKwh->distributionKwh->count());
            foreach ($newRevenuesKwh->distributionKwh as $distributionKwh){
//                    Log::info('delivered_total_concept' . $distributionKwh->delivered_total_concept);
                $newParticipationsQuantity += $distributionKwh->participations_quantity;
                $newDeliveredTotalConcept += $distributionKwh->delivered_total_concept;
                $newDeliveredTotalConfirmed += $distributionKwh->delivered_total_confirmed;
                $newDeliveredTotalProcessed += $distributionKwh->delivered_total_processed;
            }

            DB::table('xxx_conversion_revenues_kwh')
                ->where('id', $conversionRevenuesKwh->id)
                ->update([
                    'done' => true,
                    'old_number_of_participations' => $oldParticipationsQuantity,
                    'old_participations_quantity' => $oldProjectRevenueEloquent->distribution->count(),
                    'old_delivered_total' => $oldDeliveredTotalConcept + $oldDeliveredTotalConfirmed + $oldDeliveredTotalProcessed,
                    'old_delivered_total_concept' => $oldDeliveredTotalConcept,
                    'old_delivered_total_confirmed' => $oldDeliveredTotalConfirmed,
                    'old_delivered_total_processed' => $oldDeliveredTotalProcessed,
                    'new_number_of_participations' => $newParticipationsQuantity,
                    'new_participations_quantity' => $newRevenuesKwh->distributionKwh->count(),
                    'new_delivered_total' => $newRevenuesKwh->delivered_total_concept + $newRevenuesKwh->delivered_total_confirmed + $newRevenuesKwh->delivered_total_processed,
                    'new_delivered_total_concept' => $newDeliveredTotalConcept,
                    'new_delivered_total_confirmed' => $newDeliveredTotalConfirmed,
                    'new_delivered_total_processed' => $newDeliveredTotalProcessed,
                ]);
        }

        // Re-add Dispatcher
        ProjectRevenue::setEventDispatcher($dispatcherProjectRevenue);
        RevenuesKwh::setEventDispatcher($dispatcherRevenuesKwh);
        RevenuePartsKwh::setEventDispatcher($dispatcherRevenuePartsKwh);

    }

    protected function createRevenuesKwh($oldProjectRevenue): void
    {
//        if($oldProjectRevenue->id == 12){
//            Log::info('Test old rev : ' . $oldProjectRevenue->id);
//            Log::info('date_end a: ' . $oldProjectRevenue->date_end);
//        }
        $hasSplitKwh = ProjectRevenue::where('project_id', $oldProjectRevenue->project_id)
            ->whereNotNull('participation_id')
            ->where('category_id', $this->projectRevenueKwhSplitCategoryId)
            ->where('date_end', '>=', $oldProjectRevenue->date_begin)
            ->where('date_end', '<', $oldProjectRevenue->date_end)
            ->orderBy('date_end', 'desc')->exists();

        $newRevenuesKwh = RevenuesKwh::create([
            'category_id' => $this->projectRevenueKwhCategoryId,
            'project_id' => $oldProjectRevenue->project_id,
            'distribution_type_id' => $oldProjectRevenue->distribution_type_id,
            'confirmed' => $oldProjectRevenue->confirmed,
            'status' => 'conversion',
            'date_begin' => $oldProjectRevenue->date_begin,
            'date_end' => $oldProjectRevenue->date_end,
            'date_confirmed' => $oldProjectRevenue->date_confirmed,
            'payout_kwh' => $oldProjectRevenue->payout_kwh,
            'created_by_id' => $oldProjectRevenue->created_by_id,
            'created_at' => $oldProjectRevenue->created_at,
            'updated_at' => $oldProjectRevenue->updated_at,
        ]);

        $this->setStartAndEndValuesKwh($newRevenuesKwh, $oldProjectRevenue);

        $remarks = 'Nieuw gemaakt obv oude';
        DB::table('xxx_conversion_revenues_kwh')->insert([
            'new_revenue_id' => $newRevenuesKwh->id,
            'old_revenue_id' => $oldProjectRevenue->id,
            'old_confirmed' => $oldProjectRevenue->confirmed,
            'hasSplitKwh' => $hasSplitKwh,
            'participation_id' => $oldProjectRevenue->participation_id,
            'remarks' => $remarks,
        ]);

        $kwhEndCalendarYearHigh = $oldProjectRevenue->kwh_end_calendar_year_high ? $oldProjectRevenue->kwh_end_calendar_year_high : 0;
        $kwhEndCalendarYearLow = $oldProjectRevenue->kwh_end_calendar_year_low ? $oldProjectRevenue->kwh_end_calendar_year_low : 0;
        $kwhEndCalendarYear = $kwhEndCalendarYearHigh + $kwhEndCalendarYearLow;
        $hasKwhEndCalendarYear = false;
        if ($kwhEndCalendarYear > 0) {
            $hasKwhEndCalendarYear = true;
        }

//        if($oldProjectRevenue->confirmed == false && $hasSplitKwh == true) {
//            Log::error("komen we hier ???");
//            $this->createStartRevenuePartsKwhNotConfirmedAndWithSplit($newRevenuesKwh, $hasKwhEndCalendarYear);
//        }else{
            $this->createStartRevenuePartsKwhIfConfirmedOrWithoutSplit($newRevenuesKwh, $hasKwhEndCalendarYear);
//        }
        $this->saveParticipantsOfDistribution($newRevenuesKwh, $oldProjectRevenue);

    }

    /**
     * @param $conversionRevenuesKwh
     * @param $newRevenuesKwh
     */
    protected function setStartAndEndValuesKwh($newRevenuesKwh, $oldProjectRevenuesKwh): void
    {
        $dateBeginFromRevenue = Carbon::parse($oldProjectRevenuesKwh->date_begin)->format('Y-m-d');
        RevenueValuesKwh::create([
            'revenue_id' => $newRevenuesKwh->id,
            'date_registration' => $dateBeginFromRevenue,
            'is_simulated' => false,
            'kwh_start' => $oldProjectRevenuesKwh->kwh_start ? $oldProjectRevenuesKwh->kwh_start : 0,
            'kwh_start_high' => $oldProjectRevenuesKwh->kwh_start_high ? $oldProjectRevenuesKwh->kwh_start_high : 0,
            'kwh_start_low' => $oldProjectRevenuesKwh->kwh_start_low ? $oldProjectRevenuesKwh->kwh_start_low : 0,
            'status' => $oldProjectRevenuesKwh->confirmed ? 'confirmed' : 'concept',
        ]);

        $dateEndFromRevenue = Carbon::parse($oldProjectRevenuesKwh->date_end)->format('Y-m-d');
        $beginDateFromOldEndDate = Carbon::parse($oldProjectRevenuesKwh->date_end)->addDay()->format('Y-m-d');

        $dateEndCalendarYearFromRevenue = Carbon::parse($oldProjectRevenuesKwh->date_begin)->endOfYear()->format('Y-m-d');

        $kwhEndCalendarYearHigh = $oldProjectRevenuesKwh->kwh_end_calendar_year_high ? $oldProjectRevenuesKwh->kwh_end_calendar_year_high : 0;
        $kwhEndCalendarYearLow = $oldProjectRevenuesKwh->kwh_end_calendar_year_low ? $oldProjectRevenuesKwh->kwh_end_calendar_year_low : 0;
        $kwhEndCalendarYear = $kwhEndCalendarYearHigh + $kwhEndCalendarYearLow;
        if ($dateEndFromRevenue > $dateEndCalendarYearFromRevenue && $kwhEndCalendarYear > 0) {
            $beginDateFromOldEndCalendarYear = Carbon::parse($dateEndCalendarYearFromRevenue)->addDay()->format('Y-m-d');
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $newRevenuesKwh->id)->where('date_registration', $beginDateFromOldEndCalendarYear)->first();
            if ($revenueValuesKwh) {
                if ($revenueValuesKwh->kwh_start != $kwhEndCalendarYear
                    || $revenueValuesKwh->kwh_start_high != $oldProjectRevenuesKwh->kwh_end_calendar_year_high
                    || $revenueValuesKwh->kwh_start_low != $oldProjectRevenuesKwh->kwh_end_calendar_year_low) {
                    $revenueValuesKwh->kwh_start = $kwhEndCalendarYear;
                    $revenueValuesKwh->kwh_start_high = $oldProjectRevenuesKwh->kwh_end_calendar_year_high;
                    $revenueValuesKwh->kwh_start_low = $oldProjectRevenuesKwh->kwh_end_calendar_year_low;
                    $revenueValuesKwh->save();
                    Log::error('Revenue kwh id: ' . $newRevenuesKwh->id . '. Verschillende beginstanden op ' . Carbon::parse($dateEndCalendarYearFromRevenue)->addDay()->format('d-m-Y') . '!!!!');
                }
            } else {
                RevenueValuesKwh::create([
                    'revenue_id' => $newRevenuesKwh->id,
                    'date_registration' => $beginDateFromOldEndCalendarYear,
                    'is_simulated' => false,
                    'kwh_start' => $kwhEndCalendarYear ? $kwhEndCalendarYear : 0,
                    'kwh_start_high' => $oldProjectRevenuesKwh->kwh_end_calendar_year_high ? $oldProjectRevenuesKwh->kwh_end_calendar_year_high : 0,
                    'kwh_start_low' => $oldProjectRevenuesKwh->kwh_end_calendar_year_low ? $oldProjectRevenuesKwh->kwh_end_calendar_year_low : 0,
                    'status' => $oldProjectRevenuesKwh->confirmed ? 'confirmed' : 'concept',
                ]);
            }
        }

        $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $newRevenuesKwh->id)->where('date_registration', $beginDateFromOldEndDate)->first();
        if ($revenueValuesKwh) {
            if ($revenueValuesKwh->kwh_start != $oldProjectRevenuesKwh->kwh_end
                || $revenueValuesKwh->kwh_start_high != $oldProjectRevenuesKwh->kwh_end_high
                || $revenueValuesKwh->kwh_start_low != $oldProjectRevenuesKwh->kwh_end_low) {
                $revenueValuesKwh->kwh_start = $oldProjectRevenuesKwh->kwh_end ? $oldProjectRevenuesKwh->kwh_end : 0;
                $revenueValuesKwh->kwh_start_high = $oldProjectRevenuesKwh->kwh_end_high ? $oldProjectRevenuesKwh->kwh_end_high : 0;
                $revenueValuesKwh->kwh_start_low = $oldProjectRevenuesKwh->kwh_end_low ? $oldProjectRevenuesKwh->kwh_end_low : 0;
                $revenueValuesKwh->save();
                Log::error('Revenue kwh id: ' . $newRevenuesKwh->id . '. Verschillende beginstanden op ' . Carbon::parse($oldProjectRevenuesKwh->date_end)->addDay()->format('d-m-Y') . '!!!!');
            }
        } else {
            RevenueValuesKwh::create([
                'revenue_id' => $newRevenuesKwh->id,
                'date_registration' => $beginDateFromOldEndDate,
                'is_simulated' => false,
                'kwh_start' => $oldProjectRevenuesKwh->kwh_end ? $oldProjectRevenuesKwh->kwh_end : 0,
                'kwh_start_high' => $oldProjectRevenuesKwh->kwh_end_high ? $oldProjectRevenuesKwh->kwh_end_high : 0,
                'kwh_start_low' => $oldProjectRevenuesKwh->kwh_end_low ? $oldProjectRevenuesKwh->kwh_end_low : 0,
                'status' => $oldProjectRevenuesKwh->confirmed ? 'confirmed' : 'concept',
            ]);
        }
    }

    protected function createStartRevenuePartsKwhNotConfirmedAndWithSplit(RevenuesKwh $revenuesKwh, $hasKwhEndCalendarYear): void
    {
        $splitDates = [];
        $dateBeginFromRevenue = Carbon::parse($revenuesKwh->date_begin)->format('Y-m-d');
        $splitDates[] = $dateBeginFromRevenue;

        $dateEndFromRevenue = Carbon::parse($revenuesKwh->date_end)->format('Y-m-d');

        $participations = $revenuesKwh->project->participantsProject;

        if($hasKwhEndCalendarYear){
            $dateStartNextCalendarYear = Carbon::parse($revenuesKwh->date_end)->startOfYear()->format('Y-m-d');
            if($dateBeginFromRevenue < $dateStartNextCalendarYear) {
                $splitDates[] = $dateStartNextCalendarYear;
            }
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

        $this->createPeriodParts($splitDates, $dateEndFromRevenue, $revenuesKwh);
    }

    protected function createStartRevenuePartsKwhIfConfirmedOrWithoutSplit(RevenuesKwh $revenuesKwh, $hasKwhEndCalendarYear): void
    {
        $splitDates = [];
        $dateBeginFromRevenue = Carbon::parse($revenuesKwh->date_begin)->format('Y-m-d');
        $splitDates[] = $dateBeginFromRevenue;

        $dateEndFromRevenue = Carbon::parse($revenuesKwh->date_end)->format('Y-m-d');

        if($hasKwhEndCalendarYear) {
            $dateStartNextCalendarYear = Carbon::parse($revenuesKwh->date_end)->startOfYear()->format('Y-m-d');
            if ($dateBeginFromRevenue < $dateStartNextCalendarYear) {
                $splitDates[] = $dateStartNextCalendarYear;
            }
        }

        $this->createPeriodParts($splitDates, $dateEndFromRevenue, $revenuesKwh);
    }

    /**
     * @param array $splitDates
     * @param string $dateEndFromRevenue
     * @param RevenuesKwh $revenuesKwh
     * @return array
     */
    protected function createPeriodParts(array $splitDates, string $dateEndFromRevenue, RevenuesKwh $revenuesKwh): array
    {
        $uniqueSplitDates = array_unique($splitDates);
        rsort($uniqueSplitDates);

        $periodParts = [];
        $saveDate = null;
        foreach ($uniqueSplitDates as $splitDate) {
            if ($saveDate == null) {
                $periodParts[] = ['startDate' => $splitDate, 'endDate' => $dateEndFromRevenue];
            } else {
                $endDate = Carbon::parse($saveDate)->subDay()->format('Y-m-d');;
                $periodParts[] = ['startDate' => $splitDate, 'endDate' => $endDate];
            }
            $saveDate = $splitDate;
        }

        sort($periodParts);
        foreach ($periodParts as $periodPart) {
            RevenuePartsKwh::create([
                'revenue_id' => $revenuesKwh->id,
                'date_begin' => $periodPart['startDate'],
                'date_end' => $periodPart['endDate'],
                'confirmed' => $revenuesKwh->confirmed,
                'status' => $revenuesKwh->status,
                'date_confirmed' => $revenuesKwh->date_confirmed,
                'date_payout' => $revenuesKwh->date_confirmed,
                'payout_kwh' => $revenuesKwh->payout_kwh,
                'delivered_total_concept' => 0,
                'delivered_total_confirmed' => 0,
                'delivered_total_processed' => 0,
                'created_at' => $revenuesKwh->created_at,
                'updated_at' => $revenuesKwh->updated_at,
            ]);
        }
        return array($uniqueSplitDates, $periodParts);
    }

    public function saveParticipantsOfDistribution(RevenuesKwh $revenuesKwh, $oldProjectRevenue)
    {
        set_time_limit(300);

        $oldProjectRevenueDistribution = DB::table('old_project_revenue_distribution')
            ->where('revenue_id', $oldProjectRevenue->id)->get();

        foreach ($oldProjectRevenueDistribution as $oldDistribution) {
            $this->saveDistributionKwh($revenuesKwh, $oldProjectRevenue, $oldDistribution);
        }
    }

    public function saveDistributionKwh(RevenuesKwh $revenuesKwh, $oldProjectRevenue, $oldDistribution):void
    {
//        Log::info('Start saveDistributionKwh');

        $kwhEndCalendarYearHigh = $oldProjectRevenue->kwh_end_calendar_year_high ? $oldProjectRevenue->kwh_end_calendar_year_high : 0;
        $kwhEndCalendarYearLow = $oldProjectRevenue->kwh_end_calendar_year_low ? $oldProjectRevenue->kwh_end_calendar_year_low : 0;
        $kwhEndCalendarYear = $kwhEndCalendarYearHigh + $kwhEndCalendarYearLow;
        $hasKwhEndCalendarYear = false;
        if ($kwhEndCalendarYear > 0) {
            $hasKwhEndCalendarYear = true;
        }

        $participant = ParticipantProject::find($oldDistribution->participation_id);
        if(!$participant){
            Log::error("Geen participant? id: "  . $oldDistribution->id);
//            return;
        }

//        if($oldDistribution->participation_id == 17) {
//            Log::info('oldDistribution id: ' . $oldDistribution->id);
//            Log::info('oldDistribution delivered_total: ' . $oldDistribution->delivered_total);
//            Log::info('oldDistribution participations_amount: ' . $oldDistribution->participations_amount);
//        }

        $contact = Contact::find($participant->contact_id);
        if($participant->address){
            $participantAddress = $participant->address;
        }else{
            $participantAddress = $participant->contact->primaryAddress;
        }

        // If participant already is added to project revenue distribution then update
//        if(RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $participant->id)->exists()) {
//            $distributionKwh = RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $participant->id)->first();
//        } else {
            $distributionKwh = new RevenueDistributionKwh();
            $distributionKwh->revenue_id = $revenuesKwh->id;
            $distributionKwh->participation_id = $participant->id;
            $distributionKwh->contact_id = $contact->id;
//        }

        $distributionKwh->status = $oldDistribution->status;

        if ($oldProjectRevenue->confirmed) {
            $distributionKwh->street = $oldDistribution->street;
            $distributionKwh->street_number = $oldDistribution->street_number;
            $distributionKwh->street_number_addition = $oldDistribution->street_number_addition;
            if($oldDistribution->address != ''){
                $distributionKwh->address = $oldDistribution->address;
            }else{
                $distributionKwh->address = $oldDistribution->street . ' ' . ( $oldDistribution->street_number_addition ? $oldDistribution->street_number . '-' . $oldDistribution->street_number_addition : $oldDistribution->street_number );
            }
            $distributionKwh->postal_code = $oldDistribution->postal_code;
            $distributionKwh->city = $oldDistribution->city;
            $distributionKwh->country = $oldDistribution->country ? $oldDistribution->country : '';
            $distributionKwh->energy_supplier_ean_electricity = $oldDistribution->energy_supplier_ean_electricity;
        } elseif ($participantAddress) {
            $distributionKwh->street = $participantAddress->street;
            $distributionKwh->street_number = $participantAddress->number;
            $distributionKwh->street_number_addition = $participantAddress->addition;
            $distributionKwh->address = $participantAddress->present()->streetAndNumber();
            $distributionKwh->postal_code = $participantAddress->postal_code;
            $distributionKwh->city = $participantAddress->city;
            $distributionKwh->country = $participantAddress->country_id ? $participantAddress->country->name : '';
            $distributionKwh->energy_supplier_ean_electricity = $participantAddress->ean_electricity;
        }

        list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantity($distributionKwh);
        $distributionKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
        $distributionKwh->participations_quantity = $quantityOfParticipations;
        $distributionKwh->save();

        foreach ($revenuesKwh->partsKwh as $partsKwh) {
            $this->saveDistributionPartsKwhWithOld($partsKwh, $distributionKwh, $oldDistribution, $hasKwhEndCalendarYear);
        }
//        Log::info('Einde saveDistributionKwh');
    }

    /**
     * @param RevenueDistributionKwh $distributionKwh
     * @return int[]
     */
    protected function determineParticipationsQuantity(RevenueDistributionKwh $distributionKwh): array
    {
        //todo WM: a la determineParticipationsQuantityPart doen ?
        $quantityOfParticipationsAtStart = 0;
        $quantityOfParticipations = 0;
        $dateBeginFromRegister = Carbon::parse($distributionKwh->participation->date_register)->format('Y-m-d');
        $dateBeginRevenuesKwh = Carbon::parse($distributionKwh->revenuesKwh->date_begin)->format('Y-m-d');
        $dateEndRevenuesKwh = Carbon::parse($distributionKwh->revenuesKwh->date_end)->format('Y-m-d');
        $mutations = $distributionKwh->participation->mutationsDefinitiveForKwhPeriod;

        foreach ($mutations as $mutation) {
            if ($mutation->date_entry >= $dateBeginFromRegister && $mutation->date_entry <= $dateBeginRevenuesKwh) {
                $quantityOfParticipationsAtStart += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginFromRegister && $mutation->date_entry <= $dateEndRevenuesKwh) {
                $quantityOfParticipations += $mutation->quantity;
            }
        }
        return array($quantityOfParticipationsAtStart, $quantityOfParticipations);
    }

    protected function saveDistributionPartsKwhWithOld(RevenuePartsKwh $revenuePartsKwh, RevenueDistributionKwh $distributionKwh, $oldProjectRevenueDistribution, $hasKwhEndCalendarYear):void
    {
//        if($oldProjectRevenueDistribution->participation_id == 17) {
//            Log::info('Start saveDistributionPartsKwhWithOld');
//            Log::info('distributionKwh id: ' . $distributionKwh->id);
//            Log::info('oldProjectRevenueDistribution id: ' . $oldProjectRevenueDistribution->id);
//            Log::info('oldProjectRevenueDistribution delivered_total: ' . $oldProjectRevenueDistribution->delivered_total);
//            Log::info('oldProjectRevenueDistribution participations_amount: ' . $oldProjectRevenueDistribution->participations_amount);
//        }

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
//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('RevenueDistributionPartsKwh exists');
//            }
            $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->first();
        } else {
//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('RevenueDistributionPartsKwh new');
//            }
            $distributionPartsKwh = new RevenueDistributionPartsKwh();
            $distributionPartsKwh->revenue_id = $revenuePartsKwh->revenue_id;
            $distributionPartsKwh->parts_id = $revenuePartsKwh->id;
            $distributionPartsKwh->distribution_id = $distributionKwh->id;
            $distributionPartsKwh->status = $distributionKwh->status;
            if($distributionKwh->status=='processed'){
                if($revenuePartsKwh->revenuesKwh->date_confirmed){
                    $distributionPartsKwh->date_energy_supplier_report = $revenuePartsKwh->revenuesKwh->date_confirmed;
                } else {
                    $distributionPartsKwh->date_energy_supplier_report = Carbon::now()->format('Y-m-d');
                }
            }
        }
        $distributionPartsKwh->save();

        $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
        list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, $partDateBegin, $partDateEnd, $distributionPartsKwh);
        $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
        $distributionPartsKwh->participations_quantity = $quantityOfParticipations;

        $this->saveDistributionValuesKwh($partDateBegin, $partDateEnd, $distributionPartsKwh, $oldProjectRevenueDistribution);

//        if($oldProjectRevenueDistribution->participation_id == 1) {
//            Log::info('partDateBegin id: ' . $partDateBegin);
//            Log::info('partDateEnd id: ' . $partDateEnd);
//            Log::info('get totalDeliveredKwh from RevenueDistributionValuesKwh');
//            Log::info('with: Revenue id: ' . $revenuePartsKwh->revenue_id);
//            Log::info('with: Distribution id: ' . $distributionPartsKwh->distribution_id);
//            Log::info('with: Parts id: ' . $revenuePartsKwh->id);
//        }

        $distributionPartsKwh->delivered_kwh = 0;
        $distributionPartsKwh->save();

//        if($oldProjectRevenueDistribution->participation_id == 17) {
//            Log::info('distributionPartsKwh->delivered_kwh a: ' . $distributionPartsKwh->delivered_kwh);
//        }

        if($oldProjectRevenueDistribution){
            $distributionPartsKwh->es_id = $oldProjectRevenueDistribution->es_id;
            $distributionPartsKwh->energy_supplier_name = $oldProjectRevenueDistribution->energy_supplier_name;
            $distributionPartsKwh->energy_supplier_number = $oldProjectRevenueDistribution->energy_supplier_number;

//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('distributionPartsKwh->delivered_kwh b: ' . $distributionPartsKwh->delivered_kwh);
//            }

            $dateEndFromRevenue = Carbon::parse($distributionKwh->revenuesKwh->date_end)->format('Y-m-d');
            $dateEndCalendarYearFromRevenue = Carbon::parse($distributionKwh->revenuesKwh->date_begin)->endOfYear()->format('Y-m-d');
//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('dateEndFromRevenue: ' . $dateEndFromRevenue);
//                Log::info('dateEndCalendarYearFromRevenue: ' . $dateEndCalendarYearFromRevenue);
//                Log::info('partDateEnd: ' . $partDateEnd);
//                Log::info('delivered_total: ' . $oldProjectRevenueDistribution->delivered_total);
//                Log::info('delivered_total_end_calendar_year: ' . $oldProjectRevenueDistribution->delivered_total_end_calendar_year);
//                Log::info('hasKwhEndCalendarYear: ' . $hasKwhEndCalendarYear);
//            }
            if($hasKwhEndCalendarYear && $dateEndFromRevenue > $dateEndCalendarYearFromRevenue && $oldProjectRevenueDistribution->delivered_total_end_calendar_year > 0){
//                if($oldProjectRevenueDistribution->participation_id == 1) {
//                    Log::info('dateEndFromRevenue > dateEndCalendarYearFromRevenue && oldProjectRevenueDistribution->delivered_total_end_calendar_year > 0');
//                }
                if($dateEndCalendarYearFromRevenue == $partDateEnd){
//                    if($oldProjectRevenueDistribution->participation_id == 1) {
//                        Log::info('dateEndCalendarYearFromRevenue == partDateEnd');
//                    }
                    $distributionPartsKwh->delivered_kwh = $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                } else {
//                    if($oldProjectRevenueDistribution->participation_id == 1) {
//                        Log::info('dateEndCalendarYearFromRevenue != partDateEnd');
//                    }
                    $distributionPartsKwh->delivered_kwh = $oldProjectRevenueDistribution ? ($oldProjectRevenueDistribution->delivered_total - $oldProjectRevenueDistribution->delivered_total_end_calendar_year) : 0;
                }
            } else {
//                if($oldProjectRevenueDistribution->participation_id == 1) {
//                    Log::info('not: dateEndFromRevenue > dateEndCalendarYearFromRevenue && oldProjectRevenueDistribution->delivered_total_end_calendar_year > 0');
//                }
                $distributionPartsKwh->delivered_kwh = $oldProjectRevenueDistribution ? $oldProjectRevenueDistribution->delivered_total : 0;
            }
//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('distributionPartsKwh->delivered_kwh c: ' . $distributionPartsKwh->delivered_kwh);
//            }

        } else {
            $distributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
            $distributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
            $distributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number: null;

            $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('distribution_id', $distributionPartsKwh->distribution_id)->where('parts_id', $revenuePartsKwh->id)->sum('delivered_kwh');
//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('totalDeliveredKwh from RevenueDistributionValuesKwh: ' . $totalDeliveredKwh);
//            }
            $distributionPartsKwh->delivered_kwh = $totalDeliveredKwh;
//            if($oldProjectRevenueDistribution->participation_id == 1) {
//                Log::info('distributionPartsKwh->delivered_kwh d: ' . $distributionPartsKwh->delivered_kwh);
//            }
        }

        $distributionPartsKwh->is_visible = empty($distributionPartsKwh->remarks) ? false : true;
        $distributionPartsKwh->save();

//        Log::info('Verwerk countings part (2): ' . $revenuePartsKwh->id);
//        $revenuePartsKwhForRecalculate = RevenuePartsKwh::find($revenuePartsKwh->id);
//        $revenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();

//        Log::info('Einde saveDistributionPartsKwhWithOld');
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

    protected function saveDistributionValuesKwh($partDateBegin, $partDateEnd, RevenueDistributionPartsKwh $distributionPartsKwh, $oldProjectRevenueDistribution): void
    {
//        if($oldProjectRevenueDistribution->participation_id == 87) {
//            Log::info("saveDistributionValuesKwh - distributionpartskwh id: " . $distributionPartsKwh->id);
//            Log::info("oldProjectRevenueDistribution - id: " . $oldProjectRevenueDistribution->id);
//            Log::info("oldProjectRevenueDistribution - revenue_id: " . $oldProjectRevenueDistribution->revenue_id);
//            Log::info("Begindatum period: " . $partDateBegin);
//            Log::info("Einddatum period : " . $partDateEnd);
//
//            Log::info("New revenue id: " . $distributionPartsKwh->revenue_id);
//            Log::info("New part id: " . $distributionPartsKwh->parts_id);
//            Log::info("New distribution id: " . $distributionPartsKwh->distribution_id);
//            Log::info("Begindatum part: " . $partDateBegin);
//            Log::info("Einddatum part : " . $partDateEnd);
//            Log::info("Oud revenue id: " . $oldProjectRevenueDistribution->revenue_id);
//            Log::info("Oud distribution id: " . $oldProjectRevenueDistribution->id);
//        }

//        $oldProjectRevenueDeliveredKwhPeriods = xxxProjectRevenueDeliveredKwhPeriod::where('distribution_id', $oldProjectRevenueDistribution->id)
//            ->where('revenue_id', $oldProjectRevenueDistribution->revenue_id)
//            ->whereBetween('date_begin', [$partDateBegin, $partDateEnd])->get();

        $oldProjectRevenueDeliveredKwhPeriods = DB::table('xxx_project_revenue_delivered_kwh_period')
            ->where('distribution_id', $oldProjectRevenueDistribution->id)
            ->where('revenue_id', $oldProjectRevenueDistribution->revenue_id)
            ->whereBetween('date_begin', [$partDateBegin, $partDateEnd])->get();

//        if($oldProjectRevenueDistribution->participation_id == 87) {
//            Log::info("oldProjectRevenueDeliveredKwhPeriods aantal: " . $oldProjectRevenueDeliveredKwhPeriods->count());
//        }

        foreach ($oldProjectRevenueDeliveredKwhPeriods as $oldProjectRevenueDeliveredKwhPeriod){
//            if($oldProjectRevenueDistribution->participation_id == 87) {
//                Log::info("Do oldProjectRevenueDeliveredKwhPeriod: " . $oldProjectRevenueDeliveredKwhPeriod->id);
//                Log::info("oldProjectRevenueDeliveredKwhPeriod date_end: " . $oldProjectRevenueDeliveredKwhPeriod->date_end);
//                Log::info("oldProjectRevenueDeliveredKwhPeriod delivered_kwh: " . $oldProjectRevenueDeliveredKwhPeriod->delivered_kwh);
//                Log::info("partDateEnd: " . $partDateEnd);
//            }
            if($oldProjectRevenueDeliveredKwhPeriod->date_end > $partDateEnd){
                Log::error("Einddatum period NA Einddatum nieuwe part ! OldProjectRevenueId: " . $oldProjectRevenueDistribution->revenue_id . " | OldProjectRevenueDeliveredKwhPeriodId: " . $oldProjectRevenueDeliveredKwhPeriod->id);
            }
            RevenueDistributionValuesKwh::create(
                [
                    'date_begin' => $oldProjectRevenueDeliveredKwhPeriod->date_begin,
                    'date_end' =>  $oldProjectRevenueDeliveredKwhPeriod->date_end > $partDateEnd ? $partDateEnd : $oldProjectRevenueDeliveredKwhPeriod->date_end,
                    'distribution_id' => $distributionPartsKwh->distribution_id,
                    'revenue_id' => $distributionPartsKwh->revenue_id,
                    'parts_id' => $distributionPartsKwh->parts_id,
                    'status' => $distributionPartsKwh->status,
                    'days_of_period' => $oldProjectRevenueDeliveredKwhPeriod->days_of_period,
                    'participations_quantity' => $oldProjectRevenueDeliveredKwhPeriod->participations_quantity,
                    'quantity_multiply_by_days' => $oldProjectRevenueDeliveredKwhPeriod->participations_quantity * $oldProjectRevenueDeliveredKwhPeriod->days_of_period,
                    'delivered_kwh' => $oldProjectRevenueDeliveredKwhPeriod->delivered_kwh
                ]);
        }

    }

    /**
     * @param $conversionRevenuesKwh
     * de concept revenues zonder split
     */
    protected function doConversion1($conversionRevenuesKwh): void
    {
//        foreach ($revenuesKwh->distributionKwh as $distributionKwh) {
//            $distributionKwh->delivered_total_concept = $revenuesKwh->distributionPartsKwh->where('distribution_id', $distributionKwh->id)->where('status', 'concept')->sum('delivered_kwh');
//            $distributionKwh->delivered_total_confirmed = $revenuesKwh->distributionPartsKwh->where('distribution_id', $distributionKwh->id)->where('status', 'confirmed')->sum('delivered_kwh');
//            $distributionKwh->delivered_total_processed = $revenuesKwh->distributionPartsKwh->where('distribution_id', $distributionKwh->id)->where('status', 'processed')->sum('delivered_kwh');
//            $distributionKwh->save();
//        }

        $newRevenuesKwh = RevenuesKwh::find($conversionRevenuesKwh->new_revenue_id);
        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('id', $conversionRevenuesKwh->old_revenue_id)->first();

        if ($oldProjectRevenuesKwh->kwh_end_high != 0 || $oldProjectRevenuesKwh->kwh_end_low != 0){
            $newRevenuesKwh->status = 'concept';
        } else {
            $newRevenuesKwh->status = 'new';
        }
        $newRevenuesKwh->save();
        $remarks = $conversionRevenuesKwh->remarks . '; status op ' . $newRevenuesKwh->status;
        DB::table('xxx_conversion_revenues_kwh')
            ->where('id', $conversionRevenuesKwh->id)
            ->update(['remarks' => $remarks]);
        foreach ($newRevenuesKwh->partsKwh as $partsKwh) {
            $partsKwh->status = $newRevenuesKwh->status;
            $partsKwh->save();
            $partDateBegin = Carbon::parse($partsKwh->date_begin)->format('Y-m-d');
            $partDateEnd =  Carbon::parse($partsKwh->date_end)->format('Y-m-d');
            $dateRegistrationDayAfterEnd = Carbon::parse($partsKwh->date_end)->addDay()->format('Y-m-d');
            $status = $partsKwh->confirmed ? 'confirmed' : 'concept';
            $this->createOrUpdateRevenueValuesKwhSimulate($partsKwh->revenue_id, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd, $status);
            $this->countingsConceptConfirmedProcessed($partsKwh);
        }
    }

    /**
     * @param $conversionRevenuesKwh
     * de confirmed revenues zonder split
     */
    protected function doConversion2($conversionRevenuesKwh): void
    {
        $newRevenuesKwh = RevenuesKwh::find($conversionRevenuesKwh->new_revenue_id);
        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('id', $conversionRevenuesKwh->old_revenue_id)->first();

        $newRevenuesKwh->confirmed = 1;
        $newRevenuesKwh->date_confirmed = $oldProjectRevenuesKwh->date_confirmed;
        $newRevenuesKwhStatus = 'confirmed';
        if($newRevenuesKwh->distributionKwh->where('status', 'processed')->count() > 0
        && $newRevenuesKwh->distributionKwh->where('status', '!=', 'processed')->count() == 0)
        {
            $newRevenuesKwhStatus = 'processed';
        }
        $newRevenuesKwh->status = $newRevenuesKwhStatus;

        $newRevenuesKwh->save();
        $remarks = $conversionRevenuesKwh->remarks . '; status op ' . $newRevenuesKwh->status;
        DB::table('xxx_conversion_revenues_kwh')
            ->where('id', $conversionRevenuesKwh->id)
            ->update(['remarks' => $remarks]);

        foreach ($newRevenuesKwh->partsKwh as $partsKwh) {
            $partsKwh->status = $newRevenuesKwh->status;
            $partsKwh->save();
            $partDateBegin = Carbon::parse($partsKwh->date_begin)->format('Y-m-d');
            $partDateEnd =  Carbon::parse($partsKwh->date_end)->format('Y-m-d');
            $dateRegistrationDayAfterEnd = Carbon::parse($partsKwh->date_end)->addDay()->format('Y-m-d');
            $status = $partsKwh->confirmed ? 'confirmed' : 'concept';
            $this->createOrUpdateRevenueValuesKwhSimulate($partsKwh->revenue_id, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd, $status);
            $this->countingsConceptConfirmedProcessed($partsKwh);
        }
    }
    /**
     * @param $conversionRevenuesKwh
     * de concept revenues met split
     */
    protected function doConversion3($conversionRevenuesKwh): void
    {
        // eert doen we conversion1
        $this->doConversion1($conversionRevenuesKwh);
        // daarna de tussentijdse verdelingen hierin verwerken.
        // wordt een zooitje
//        $newRevenuesKwh = RevenuesKwh::find($conversionRevenuesKwh->new_revenue_id);
//        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('id', $conversionRevenuesKwh->old_revenue_id)->first();
//
//        $this->addRevenueSplitPartsKwh($oldProjectRevenuesKwh, $newRevenuesKwh);
    }
    /**
     * @param $conversionRevenuesKwh
     * de confirmed revenues met split
     */
    protected function doConversion4($conversionRevenuesKwh): void
    {
        // eert doen we conversion2
        $this->doConversion2($conversionRevenuesKwh);
        // daarna de tussentijdse verdelingen hierin verwerken.
        // wordt een zooitje
//        $newRevenuesKwh = RevenuesKwh::find($conversionRevenuesKwh->new_revenue_id);
//        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('id', $conversionRevenuesKwh->old_revenue_id)->first();
//
//        $this->addRevenueSplitPartsKwh($oldProjectRevenuesKwh, $newRevenuesKwh);
    }
    /**
     * @param $conversionRevenuesKwh
     * de split revenues (zonder total revenue).
     */
    protected function doConversion5($conversionRevenuesKwh): void
    {
        // eert maar eens a la conversion1 proberen
//        $this->doConversion1($conversionRevenuesKwh);
//        $revenuesKwhController = new RevenuesKwhController();
//        $revenuesKwhController->saveParticipantsOfDistribution($newRevenuesKwh);
//        $this->saveParticipantsOfDistribution($newRevenuesKwh, $oldProjectRevenuesKwh);

        $newRevenuesKwh = RevenuesKwh::find($conversionRevenuesKwh->new_revenue_id);
        foreach ($newRevenuesKwh->partsKwh as $partsKwh) {
            $partsKwh->status = 'in-progress';
            $partsKwh->save();
        }
    }

    protected function countingsConceptConfirmedProcessed(RevenuePartsKwh $revenuePartsKwh): void
    {
//        Log::info("Conversion - countingsConceptConfirmedProcessed");
//        Log::info($revenuePartsKwh->id);

        // todo WM: herzien voor ozon cooperaties, check of dit voor overige nog steeds goed gaat??
        foreach ($revenuePartsKwh->revenuesKwh->distributionKwh as $distributionKwh) {

            if($distributionKwh->status == 'confirmed' || $distributionKwh->status == 'processed'){
//                $distributionKwh->delivered_total_concept = $distributionKwh->distributionPartsKwh->where('status', 'concept')->where('parts_id', $revenuePartsKwh->id)->sum('delivered_kwh');
//                $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionPartsKwh->where('status', 'confirmed')->where('parts_id', $revenuePartsKwh->id)->sum('delivered_kwh');
//                $distributionKwh->delivered_total_processed = $distributionKwh->distributionPartsKwh->where('status', 'processed')->where('parts_id', $revenuePartsKwh->id)->sum('delivered_kwh');
                $distributionKwh->delivered_total_concept = $distributionKwh->distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
                $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
                $distributionKwh->delivered_total_processed = $distributionKwh->distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
            } else {
                $distributionKwh->delivered_total_concept = $distributionKwh->distributionValuesKwh->where('status', 'concept')->sum('delivered_kwh');
                $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionValuesKwh->where('status', 'confirmed')->sum('delivered_kwh');
                $distributionKwh->delivered_total_processed = $distributionKwh->distributionValuesKwh->where('status', 'processed')->sum('delivered_kwh');
            }
//            if($distributionKwh->participation_id == 161) {
//                Log::info("Participation id: " . $distributionKwh->participation_id);
//                Log::info("delivered_total_concept: " . $distributionKwh->delivered_total_concept);
//                Log::info("delivered_total_confirmed: " . $distributionKwh->delivered_total_confirmed);
//                Log::info("delivered_total_processed: " . $distributionKwh->delivered_total_processed);
//            }
            $distributionKwh->save();
        }

        if($revenuePartsKwh->confirmed){
            if($revenuePartsKwh->confirmed
                && $revenuePartsKwh->distributionPartsKwh->where('status', 'processed')->count() > 0
                && $revenuePartsKwh->distributionPartsKwh->where('status', '!=', 'processed')->count() == 0
            ) {
                $revenuePartsKwh->status = 'processed';
            }else{
                $revenuePartsKwh->status = 'confirmed';
            }
        } else {
            $revenuePartsKwh->status = 'concept';
        }
        $revenuePartsKwh->delivered_total_concept = $revenuePartsKwh->distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $revenuePartsKwh->delivered_total_confirmed = $revenuePartsKwh->distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $revenuePartsKwh->delivered_total_processed = $revenuePartsKwh->distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $revenuePartsKwh->save();

        $revenuePartsKwh->revenuesKwh->delivered_total_concept = $revenuePartsKwh->revenuesKwh->distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $revenuePartsKwh->revenuesKwh->delivered_total_confirmed = $revenuePartsKwh->revenuesKwh->distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $revenuePartsKwh->revenuesKwh->delivered_total_processed = $revenuePartsKwh->revenuesKwh->distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $revenuePartsKwh->revenuesKwh->save();

    }

    public function createOrUpdateRevenueValuesKwhSimulate($revenueId, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd, $status): void
    {
//        Log::info('test: ' . $revenueId);
//        Log::info('partDateBegin: ' . $partDateBegin);
//        Log::info('partDateEnd: ' . $partDateEnd);
//        Log::info('dateRegistrationDayAfterEnd: ' . $dateRegistrationDayAfterEnd);

        $daysOfPeriod = Carbon::parse($dateRegistrationDayAfterEnd)->diffInDays(Carbon::parse($partDateBegin));
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $partDateBegin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistrationDayAfterEnd)->first();

//        Log::info($beginRevenueValuesKwh);
//        Log::info($endRevenueValuesKwh);
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
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistration)->first();
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

                RevenueValuesKwh::create([
                    'revenue_id' => $revenueId,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'status' => $status,
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

    public function addRevenueSplitPartsKwh($oldProjectRevenuesKwh, $revenuesKwh)
    {
        $oldProjectRevenuesKwhSplit = DB::table('xxx_project_revenues')
            ->where('category_id', $this->projectRevenueKwhSplitCategoryId)
            ->where('project_id', $oldProjectRevenuesKwh->project_id)
            ->where('date_begin', '>=', $oldProjectRevenuesKwh->date_begin)
            ->where('date_end', '<', $oldProjectRevenuesKwh->date_end)
            ->orderBy('date_begin')->get();

        foreach($oldProjectRevenuesKwhSplit as $oldProjectSplitRevenue) {
            $splitDateString = Carbon::parse($oldProjectSplitRevenue->date_end)->addDay()->format('Y-m-d');

            // zoek part to split.
            $partToSplit = $revenuesKwh->partsKwh->where('date_begin', '<', $splitDateString)
                ->where('date_end', '>=', $splitDateString)
                ->first();

            // indien niet gevonden, klaar.
            if(!$partToSplit){
                continue;
            }
            // indien part to split al helemaal verwerkt, dan geen nieuwe splitsing meer.
            if($partToSplit == 'processed'){
                return;
            }

            $partDateBegin = Carbon::parse($partToSplit->date_begin)->format('Y-m-d');
            $partDateEnd =  Carbon::parse($partToSplit->date_end)->format('Y-m-d');

            //  1 oude einddatum originele revenuePartsKwh bewaren
            //    nieuwe einddatum originele revenuePartsKwh:: Splitsdatum - 1 dag.
            //    indien status concept, dan originele revenuePartsKwh op new zetten (ze moeten eindstanden nog toevoegen)
            $oldEndDateOriginalPartsKwh = Carbon::parse($partToSplit->date_end)->format('Y-m-d');
            $newRevenuePartsKwh = $partToSplit->replicate();
            $newEndDateOriginalPartsKwh = Carbon::parse($oldProjectSplitRevenue->date_end)->format('Y-m-d');
            $partToSplit->date_end = $newEndDateOriginalPartsKwh;

            if($partToSplit->status == 'concept'){
                $partToSplit->delivered_total_concept = 0;
                $partToSplit->delivered_total_confirmed = 0;
                $partToSplit->delivered_total_processed = 0;
            }
            $partToSplit->save();

            //  2 Values op splitDate van simulated afhalen (indien nog niet definitief) en voorzien van waarden uit split revenue.
            $revenueValuesKwhOnSplitDate = RevenueValuesKwh::where('revenue_id', $partToSplit->revenue_id)
                ->where('date_registration', $splitDateString)
                ->first();
            if ($revenueValuesKwhOnSplitDate) {
                if($revenueValuesKwhOnSplitDate->kwh_start != $oldProjectSplitRevenue->kwh_end ||
                    $revenueValuesKwhOnSplitDate->kwh_start_high != $oldProjectSplitRevenue->kwh_end_high ||
                    $revenueValuesKwhOnSplitDate->kwh_start_low != $oldProjectSplitRevenue->kwh_end_low) {
                    Log::error('Revenue kwh id: ' . $partToSplit->revenue_id . '. Verschillende beginstanden op ' . Carbon::parse($oldProjectSplitRevenue->date_end)->addDay()->format('d-m-Y') . '!!!!');
                    Log::error('oud kwh_end : ' . $oldProjectSplitRevenue->kwh_end );
                    Log::error('new kwh_end : ' . $revenueValuesKwhOnSplitDate->kwh_start );
                    Log::error('oud kwh_end_high : ' . $oldProjectSplitRevenue->kwh_end_high );
                    Log::error('new kwh_end_high : ' . $revenueValuesKwhOnSplitDate->kwh_start_high );
                    Log::error('oud kwh_end_low : ' . $oldProjectSplitRevenue->kwh_end_low );
                    Log::error('new kwh_end_low : ' . $revenueValuesKwhOnSplitDate->kwh_start_low );
                    if($revenueValuesKwhOnSplitDate->status == 'concept'){
                        $revenueValuesKwhOnSplitDate->kwh_start = $oldProjectSplitRevenue->kwh_end;
                        $revenueValuesKwhOnSplitDate->kwh_start_high = $oldProjectSplitRevenue->kwh_end_calendar_year_high;
                        $revenueValuesKwhOnSplitDate->kwh_start_low = $oldProjectSplitRevenue->kwh_end_calendar_year_low;
                        $revenueValuesKwhOnSplitDate->is_simulated = false;
                        $revenueValuesKwhOnSplitDate->save();
                        Log::error('Beginstanden bijgewerkt obv waarden bij tussentijdse verdeling ! Oud project revenue id: ' . $oldProjectSplitRevenue->id);
                    }
                }
            } else {
                RevenueValuesKwh::create([
                    'revenue_id' => $partToSplit->revenue_id,
                    'date_registration' => $splitDateString,
                    'is_simulated' => false,
                    'kwh_start' => $oldProjectSplitRevenue->kwh_end,
                    'kwh_start_high' => $oldProjectSplitRevenue->kwh_end_high,
                    'kwh_start_low' => $oldProjectSplitRevenue->kwh_end_low,
                    'status' => 'concept',
                ]);
            }

            //  3 Nieuw revenuePartsKwh:
            //    begindatum = splitsdatum, einddatum = oude einddatum originele revenuePartsKwh, delivered totalen op 0 (alleen bij concept).
            //    overige gegevens overnemen originele revenuePartsKwh.
            $newRevenuePartsKwh->date_begin = $splitDateString;
            $newRevenuePartsKwh->date_end = $oldEndDateOriginalPartsKwh;
            if($newRevenuePartsKwh->status == 'concept'){
                $newRevenuePartsKwh->delivered_total_concept = 0;
                $newRevenuePartsKwh->delivered_total_confirmed = 0;
                $newRevenuePartsKwh->delivered_total_processed = 0;
            }
            $newRevenuePartsKwh->save();

//            Log::error('Gesimuleerde waarden opnieuw bepalen voor periode ' . $partDateBegin . ' t/m ' . $oldEndDateOriginalPartsKwh );
//            Log::info('delete periode: ' . $partDateBegin . ' t/m ' . $oldEndDateOriginalPartsKwh );
            $simulatedValuesPartToSplit = RevenueValuesKwh::where('revenue_id', $partToSplit->revenue_id)->where('is_simulated', true)->whereBetween('date_registration', [$partDateBegin, $oldEndDateOriginalPartsKwh])->where('status', 'concept')->delete();
            $status = $partToSplit->confirmed ? 'confirmed' : 'concept';

//            Log::info('create periode: ' . $partDateBegin . ' t/m ' . $oldEndDateOriginalPartsKwh );
            $this->createOrUpdateRevenueValuesKwhSimulate($partToSplit->revenue_id, $partDateBegin, $newEndDateOriginalPartsKwh, Carbon::parse($newEndDateOriginalPartsKwh)->addDay()->format('Y-m-d'), $status);
//            Log::info('create periode: ' . $partDateBegin . ' t/m ' . $oldEndDateOriginalPartsKwh );
            $this->createOrUpdateRevenueValuesKwhSimulate($newRevenuePartsKwh->revenue_id, Carbon::parse($splitDateString)->format('Y-m-d'), $oldEndDateOriginalPartsKwh, Carbon::parse($oldEndDateOriginalPartsKwh)->addDay()->format('Y-m-d'), $status);

            //  Stappen 4, 4b en 5 hoeven niet als revenuePartsKwh status new heeft.
            if($partToSplit->status != 'new') {

                //  4 Doorlezen distributionPartsKwh van originele distributionPartsKwh en nieuwe aanmaken met:
                //    parts_id = (id_new).
                //    delivered_kwh op 0.
                //    address energy supplier data uit binnenkomende parm mits meegegeven.
                //    overige gegevens overnemen originele distributionPartsKwh.
                //
                $dateBeginRevenues = Carbon::parse($partToSplit->revenuesKwh->date_begin)->format('Y-m-d');
                foreach ($partToSplit->distributionPartsKwh as $distributionPartsKwh) {
                    $newDistributionPartsKwh = $distributionPartsKwh->replicate();
                    $newDistributionPartsKwh->parts_id = $newRevenuePartsKwh->id;
                    $newDistributionPartsKwh->delivered_kwh = 0;
                    $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $distributionPartsKwh->distributionKwh->participation->address_id)
                        ->where(function ($addressEnergySupplier) use ($splitDateString) {
                            $addressEnergySupplier
                                ->where(function ($addressEnergySupplier) use ($splitDateString) {
                                    $addressEnergySupplier->whereNotNull('member_since')
                                        ->where('member_since', '<=', $splitDateString);
                                })
                                ->orWhereNull('member_since');
                        })
                        ->where(function ($addressEnergySupplier) use ($splitDateString) {
                            $addressEnergySupplier
                                ->where(function ($addressEnergySupplier) use ($splitDateString) {
                                    $addressEnergySupplier->whereNotNull('end_date')
                                        ->where('end_date', '>=', $splitDateString);
                                })
                                ->orWhereNull('end_date');
                        })->first();

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
                    $dateBeginRevenues = Carbon::parse($partToSplit->revenuesKwh->date_begin)->format('Y-m-d');
                    list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, Carbon::parse($partToSplit->date_begin)->format('Y-m-d'), Carbon::parse($partToSplit->date_end)->format('Y-m-d'), $distributionPartsKwh);
                    $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
                    $distributionPartsKwh->participations_quantity = $quantityOfParticipations;
                    $distributionPartsKwh->save();

                    //  5a Concept -> delete distributions bij orignele part en maak ze opnieuw bij originele en nieuwe.
                    //
                    $distributionPartsKwh->distributionKwh->distributionValuesKwh()->where('parts_id', $partToSplit->id)->delete();
                    $this->saveDistributionValuesKwhFromSplit($partDateBegin, $newEndDateOriginalPartsKwh, $distributionPartsKwh);
                    $this->saveDistributionValuesKwhFromSplit($splitDateString, $oldEndDateOriginalPartsKwh, $newDistributionPartsKwh);

                    $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $partToSplit->revenue_id)->where('distribution_id', $distributionPartsKwh->distribution_id)->where('parts_id', $partToSplit->id)->sum('delivered_kwh');
                    $distributionPartsKwh->delivered_kwh = $totalDeliveredKwh;
                    $distributionPartsKwh->is_visible = empty($distributionPartsKwh->remarks) ? false : true;
                    $distributionPartsKwh->save();

                    $newTotalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $newRevenuePartsKwh->revenue_id)->where('distribution_id', $newDistributionPartsKwh->distribution_id)->where('parts_id', $newRevenuePartsKwh->id)->sum('delivered_kwh');
                    $newDistributionPartsKwh->delivered_kwh = $newTotalDeliveredKwh;
                    $newDistributionPartsKwh->is_visible = empty($distributionPartsKwh->remarks) ? false : true;
                    $newDistributionPartsKwh->save();
                }

                $totalSumOfParticipationsAndDaysConcept = $partToSplit->conceptDistributionValuesKwh()->sum('quantity_multiply_by_days');
                $totalDeliveredKwhConfirmed = $partToSplit->confirmedValuesKwh()->sum('delivered_kwh');
                $totalDeliveredKwhConcept = $partToSplit->conceptValuesKwh()->sum('delivered_kwh');
                $totalDeliveredKwhToDivide = $totalDeliveredKwhConcept - $totalDeliveredKwhConfirmed;
//                Log::info('totalSumOfParticipationsAndDaysConcept: ' . $totalSumOfParticipationsAndDaysConcept);
//                Log::info('totalDeliveredKwhConfirmed: ' . $totalDeliveredKwhConfirmed);
//                Log::info('totalDeliveredKwhConcept: ' . $totalDeliveredKwhConcept);
//                Log::info('totalDeliveredKwhToDivide: ' . $totalDeliveredKwhToDivide);
                foreach ($partToSplit->conceptDistributionValuesKwh as $conceptDistributionValuesKwh) {

                    // delivered_kwh = (totaal delivered to divide / $totalSumOfParticipationsAndDaysConcept) * quantity_multiply_by_days
                    if ($totalSumOfParticipationsAndDaysConcept != 0) {
                        $deliveredKwh = round(($totalDeliveredKwhToDivide / $totalSumOfParticipationsAndDaysConcept) * $conceptDistributionValuesKwh->quantity_multiply_by_days, 6);
                    } else {
                        $deliveredKwh = 0;
                    }
                    $conceptDistributionValuesKwh->delivered_kwh = $deliveredKwh;
                    $conceptDistributionValuesKwh->save();
                }

                $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $partToSplit->revenue_id)->where('parts_id', $partToSplit->id)->get();
                foreach ($distributionPartsKwh as $distributionPartKwh) {
                    $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $partToSplit->revenue_id)->where('distribution_id', $distributionPartKwh->distribution_id)->where('parts_id', $partToSplit->id)->sum('delivered_kwh');
                    $distributionPartKwh->delivered_kwh = $totalDeliveredKwh;
                    $distributionPartKwh->save();
                }


                $totalSumOfParticipationsAndDaysConceptNew = $newRevenuePartsKwh->conceptDistributionValuesKwh()->sum('quantity_multiply_by_days');
                $totalDeliveredKwhConfirmedNew = $newRevenuePartsKwh->confirmedValuesKwh()->sum('delivered_kwh');
                $totalDeliveredKwhConceptNew = $newRevenuePartsKwh->conceptValuesKwh()->sum('delivered_kwh');
                $totalDeliveredKwhToDivideNew = $totalDeliveredKwhConceptNew - $totalDeliveredKwhConfirmedNew;
//                Log::info('totalSumOfParticipationsAndDaysConceptNew: ' . $totalSumOfParticipationsAndDaysConceptNew);
//                Log::info('totalDeliveredKwhConfirmedNew: ' . $totalDeliveredKwhConfirmedNew);
//                Log::info('totalDeliveredKwhConceptNew: ' . $totalDeliveredKwhConceptNew);
//                Log::info('totalDeliveredKwhToDivideNew: ' . $totalDeliveredKwhToDivideNew);

                foreach ($newRevenuePartsKwh->conceptDistributionValuesKwh as $conceptDistributionValuesKwhNew) {

                    // delivered_kwh = (totaal delivered to divide / $totalSumOfParticipationsAndDaysConcept) * quantity_multiply_by_days
                    if ($totalSumOfParticipationsAndDaysConceptNew != 0) {
                        $deliveredKwhNew = round(($totalDeliveredKwhToDivideNew / $totalSumOfParticipationsAndDaysConceptNew) * $conceptDistributionValuesKwhNew->quantity_multiply_by_days, 6);
                    } else {
                        $deliveredKwhNew = 0;
                    }
                    $conceptDistributionValuesKwhNew->delivered_kwh = $deliveredKwhNew;
                    $conceptDistributionValuesKwhNew->save();
                }

                $distributionPartsKwhNew = RevenueDistributionPartsKwh::where('revenue_id', $newRevenuePartsKwh->revenue_id)->where('parts_id', $newRevenuePartsKwh->id)->get();
                foreach ($distributionPartsKwhNew as $distributionPartKwhNew) {
                    $totalDeliveredKwhNew = RevenueDistributionValuesKwh::where('revenue_id', $newRevenuePartsKwh->revenue_id)->where('distribution_id', $distributionPartKwhNew->distribution_id)->where('parts_id', $newRevenuePartsKwh->id)->sum('delivered_kwh');
                    $distributionPartKwhNew->delivered_kwh = $totalDeliveredKwhNew;
                    $distributionPartKwhNew->save();
                }

                $partToSplitForRecalculate = RevenuePartsKwh::find($partToSplit->id);
//                $partToSplitForRecalculate->calculator()->runCountingsRevenuesKwh();
                $this->countingsConceptConfirmedProcessed($partToSplitForRecalculate);
                $partToSplitForRecalculate->status = 'in-progress';
                $partToSplitForRecalculate->save();
                $newRevenuePartsKwhForRecalculate = RevenuePartsKwh::find($newRevenuePartsKwh->id);
//                $newRevenuePartsKwhForRecalculate->calculator()->runCountingsRevenuesKwh();
                $this->countingsConceptConfirmedProcessed($newRevenuePartsKwhForRecalculate);
                $newRevenuePartsKwhForRecalculate->status = 'in-progress';
                $newRevenuePartsKwhForRecalculate->save();
            }

        }

    }

    protected function saveDistributionValuesKwhFromSplit($partDateBegin, $partDateEnd, RevenueDistributionPartsKwh $distributionPartsKwh): void
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
            if($dateBegin->format('Y-m-d') <= $dateEndMutation->format('Y-m-d')){
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
            }
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

    public function saveDeliveredKwhPeriod(ProjectRevenueDistribution $oldProjectRevenueDistribution)
    {
//        if(!$oldProjectRevenueDistribution->participation) return;

        $oldDistributionId = $oldProjectRevenueDistribution->id;
        $oldProjectRevenue = $oldProjectRevenueDistribution->revenue;

//        Log::info('oldDistributionId  :' . $oldDistributionId);

        $dateBeginFromRevenue = Carbon::parse($oldProjectRevenue->date_begin);
        $dateEndFromRevenue = Carbon::parse($oldProjectRevenue->date_end);
        $dateEndCalendarYearFromRevenue = Carbon::parse($oldProjectRevenue->date_begin)->endOfYear();

//        Log::info('dateBeginFromRevenue  :' . $dateBeginFromRevenue);
//        Log::info('dateEndFromRevenue  :' . $dateEndFromRevenue);
//        Log::info('dateEndCalendarYearFromRevenue  :' . $dateEndCalendarYearFromRevenue);

        if (!$dateBeginFromRevenue || !$dateEndFromRevenue) return 0;

        $quantityOfParticipations = 0;

//        $mutations = $oldProjectRevenueDistribution->participation->mutationsDefinitiveForKhwPeriod;
        $mutations = $oldProjectRevenueDistribution->participation->mutationsDefinitiveForKwhPeriod;
//        Log::info('Participation: ' . $oldProjectRevenueDistribution->participation->id);
//        Log::info('participantId  :' . $oldProjectRevenueDistribution->participation->id);
//        Log::info('aantal mutations participant  :' . $mutations->count());
//        Log::info($mutations);

        foreach ($mutations as $index => $mutation) {
            $dateBegin = $dateBeginFromRevenue;
            $dateEnd = $dateEndFromRevenue;

            $nextMutation = $mutations->get(++$index);

            if($nextMutation) {
                $dateEnd = Carbon::parse($nextMutation->date_entry)->subDay();
            }

            if($dateEnd > $dateEndFromRevenue) {
                $dateEnd = clone $dateEndFromRevenue;
            }

            $dateEntry = Carbon::parse($mutation->date_entry);

            // If date entry is after date begin then date begin is equal to date entry
            if($dateEntry > $dateBegin) $dateBegin = $dateEntry;

            $dateEndForPeriod = clone $dateEnd;
            $dateEndCalendarYearFromRevenueForPeriod = clone $dateEndCalendarYearFromRevenue;
            if($dateBegin >= $dateBeginFromRevenue && $dateBegin <= $dateEndFromRevenue){
                $quantityOfParticipations += $mutation->quantity;
            }

            if($dateEnd >= $dateBegin) {

                $kwhEndCalendarYear = ($oldProjectRevenue->kwh_end_calendar_year_high ? $oldProjectRevenue->kwh_end_calendar_year_high : 0) + ($oldProjectRevenue->kwh_end_calendar_year_low ? $oldProjectRevenue->kwh_end_calendar_year_low : 0);
                $dateEndForCheck = clone $dateEnd;
                $dateEndForCheck->endOfDay();
                if ( $kwhEndCalendarYear > 0
                    && $dateBegin < $dateEndCalendarYearFromRevenue
                    && $dateEndForCheck >= $dateEndCalendarYearFromRevenue ) {
                    $daysOfPeriod = $dateEndCalendarYearFromRevenueForPeriod->addDay()->diffInDays($dateBegin);

                    $deliveredKwhPeriod = xxxProjectRevenueDeliveredKwhPeriod::updateOrCreate(
                        [
                            'distribution_id' => $oldDistributionId,
                            'revenue_id' => $oldProjectRevenue->id,
                            'date_begin' => $dateBegin
                        ],
                        [
                            'date_end' => $dateEndCalendarYearFromRevenue,
                            'days_of_period' => $daysOfPeriod,
                            'participations_quantity' => $quantityOfParticipations
                        ]
                    );
                    $deliveredKwhPeriod->save();

                    $dateBegin = $dateEndCalendarYearFromRevenue->copy()->addDay();
                }

                $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin);

                $xxxProjectRevenueDeliveredKwhPeriod = DB::table('xxx_project_revenue_delivered_kwh_period')
                    ->where('distribution_id', $oldDistributionId)
                    ->where('revenue_id', $oldProjectRevenue->id)
                    ->where('date_begin', $dateBegin)
                    ->first();

                if($xxxProjectRevenueDeliveredKwhPeriod){
                    DB::table('xxx_project_revenue_delivered_kwh_period')
                        ->where('distribution_id', $oldDistributionId)
                        ->where('revenue_id', $oldProjectRevenue->id)
                        ->where('date_begin', $dateBegin)
                        ->update([
                            'date_end' => $dateEnd,
                            'days_of_period' => $daysOfPeriod,
                            'participations_quantity' => $quantityOfParticipations
                        ]);
                }else{
                    DB::table('xxx_project_revenue_delivered_kwh_period')->insert([
                        'distribution_id' => $oldDistributionId,
                        'revenue_id' => $oldProjectRevenue->id,
                        'date_begin' => $dateBegin,
                        'date_end' => $dateEnd,
                        'days_of_period' => $daysOfPeriod,
                        'participations_quantity' => $quantityOfParticipations
                    ]);
                }

            }
        }
//        Log::info('do calculateDeliveredKwh');
//        $this->calculateDeliveredKwh($oldProjectRevenue, $oldProjectRevenueDistribution);
    }

    protected function calculateDeliveredKwh($oldProjectRevenueDistribution)
    {
        $oldProjectRevenue = $oldProjectRevenueDistribution->revenue;

//        if($oldProjectRevenueDistribution->participation_id == 87) {
//            Log::info("oldProjectRevenueDistribution - id: " . $oldProjectRevenueDistribution->id);
//        }

        // Calculate total kwh
        $totalKwh = $oldProjectRevenue->kwh_end - $oldProjectRevenue->kwh_start;

        // Calculate total kwh end calendar year
        $kwhEndCalendarYear = $oldProjectRevenue->kwh_end_calendar_year_high + $oldProjectRevenue->kwh_end_calendar_year_low;
        $totalKwhEndCalendarYear = 0;
        $totalKwhRest = 0;
        if ($kwhEndCalendarYear > 0) {
            $totalKwhEndCalendarYear = $kwhEndCalendarYear - $oldProjectRevenue->kwh_start;
            $totalKwhRest = $totalKwh - $totalKwhEndCalendarYear;
        }

        $xxxProjectRevenueDeliveredKwhPeriodsRevenue = DB::table('xxx_project_revenue_delivered_kwh_period')
            ->where('revenue_id', $oldProjectRevenue->id)
            ->get();

        // Total sum of participations and days
        $totalSumOfParticipationsAndDays = $xxxProjectRevenueDeliveredKwhPeriodsRevenue->sum(function ($deliveredKwhPeriod) use($oldProjectRevenueDistribution) {
//            if($oldProjectRevenueDistribution->participation_id == 87) {
//                Log::info("deliveredKwhPeriod - id: " . $deliveredKwhPeriod->id);
//                Log::info("deliveredKwhPeriod - days_of_period: " . $deliveredKwhPeriod->days_of_period);
//                Log::info("deliveredKwhPeriod - participations_quantity: " . $deliveredKwhPeriod->participations_quantity);
//            }
            return $deliveredKwhPeriod->days_of_period * $deliveredKwhPeriod->participations_quantity;
        });

        // Total sum of participations and days end calendar year
        $totalSumOfParticipationsAndDaysEndCalendarYear = 0;
        if ($kwhEndCalendarYear > 0) {
            $totalSumOfParticipationsAndDaysEndCalendarYear = $xxxProjectRevenueDeliveredKwhPeriodsRevenue->sum(function ($deliveredKwhPeriod) use ($kwhEndCalendarYear, $oldProjectRevenue) {
                if ($kwhEndCalendarYear > 0 != null && Carbon::parse($deliveredKwhPeriod->date_begin)->year == Carbon::parse($oldProjectRevenue->date_begin)->year) {
                    return $deliveredKwhPeriod->days_of_period * $deliveredKwhPeriod->participations_quantity;
                }
                return 0;
            });
            $totalSumOfParticipationsAndDaysRest = $totalSumOfParticipationsAndDays - $totalSumOfParticipationsAndDaysEndCalendarYear;
        }

//        $totalDeliveredKwh = 0;
//        $totalDeliveredKwhEndCalendarYear = 0;

        $xxxProjectRevenueDeliveredKwhPeriodsDistribution = DB::table('xxx_project_revenue_delivered_kwh_period')
            ->where('distribution_id', $oldProjectRevenueDistribution->id)
            ->where('revenue_id', $oldProjectRevenue->id)
            ->get();

//        if($oldProjectRevenueDistribution->participation_id == 87) {
//            Log::info('distribution_id  :' . $oldProjectRevenueDistribution->id);
//            Log::info('totalSumOfParticipationsAndDays  :' . $totalSumOfParticipationsAndDays);
//        }

        foreach ($xxxProjectRevenueDeliveredKwhPeriodsDistribution as $oldDeliveredKwhPeriod) {
            // Sum of participations times days, for each record in revenue delivered kwh period this is (days_of_period * participations_quantity)
            // With this value we can calculate the amount of kwh returns on this deliverdKwhPeriod
//            Log::info($oldDeliveredKwhPeriod);
            $sumOfParticipationsTimesDays = $oldDeliveredKwhPeriod->days_of_period * $oldDeliveredKwhPeriod->participations_quantity;

            if ($kwhEndCalendarYear > 0) {
                // Save returns per Kwh period
                if( Carbon::parse($oldDeliveredKwhPeriod->date_begin)->year == Carbon::parse($oldProjectRevenue->date_begin)->year){
                    if($totalSumOfParticipationsAndDaysEndCalendarYear != 0){
                        $oldDeliveredKwhPeriod->delivered_kwh = round(($totalKwhEndCalendarYear / $totalSumOfParticipationsAndDaysEndCalendarYear) * $sumOfParticipationsTimesDays, 2);
//                    $totalDeliveredKwhEndCalendarYear += $oldDeliveredKwhPeriod->delivered_kwh;
//                    $totalDeliveredKwh += $oldDeliveredKwhPeriod->delivered_kwh;
                    }
                } else {
                    if($totalSumOfParticipationsAndDaysRest != 0) {
                        $oldDeliveredKwhPeriod->delivered_kwh = round(($totalKwhRest / $totalSumOfParticipationsAndDaysRest) * $sumOfParticipationsTimesDays, 2);
//                    $totalDeliveredKwh += $oldDeliveredKwhPeriod->delivered_kwh;
                    }
                }
            } else {
                if($totalSumOfParticipationsAndDays != 0){
                    $oldDeliveredKwhPeriod->delivered_kwh = round(($totalKwh / $totalSumOfParticipationsAndDays) * $sumOfParticipationsTimesDays, 2);
//                $totalDeliveredKwh += $oldDeliveredKwhPeriod->delivered_kwh;
                }
            }

//            if($oldDeliveredKwhPeriod->distribution_id == 11765){
//                Log::info('totalSumOfParticipationsAndDays  :' . $totalSumOfParticipationsAndDays);
//                Log::info('totalKwh  :' . $totalKwh);
//                Log::info('sumOfParticipationsTimesDays  :' . $sumOfParticipationsTimesDays);
//                Log::info('date_begin  :' . $oldDeliveredKwhPeriod->date_begin);
//                Log::info('delivered_kwh  :' . $oldDeliveredKwhPeriod->delivered_kwh);
//            }

            DB::table('xxx_project_revenue_delivered_kwh_period')
                ->where('distribution_id', $oldDeliveredKwhPeriod->distribution_id)
                ->where('revenue_id', $oldDeliveredKwhPeriod->revenue_id)
                ->where('date_begin', $oldDeliveredKwhPeriod->date_begin)
                ->update([
                    'delivered_kwh' => $oldDeliveredKwhPeriod->delivered_kwh
                ]);
        }
    }

}


