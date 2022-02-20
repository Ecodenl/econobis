<?php

namespace App\Console\Commands;

use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
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
        DB::statement('DELETE FROM revenue_values_kwh;');
        DB::statement('DELETE FROM revenue_distribution_parts_kwh;');
        DB::statement('DELETE FROM revenue_distribution_values_kwh;');
        DB::statement('DELETE FROM revenue_distribution_kwh;');
        DB::statement('DELETE FROM revenue_parts_kwh;');
        DB::statement('DELETE FROM revenues_kwh;');
        DB::statement('DELETE FROM xxx_project_revenues;');
        DB::statement('INSERT xxx_project_revenues SELECT * FROM old_project_revenues;');
        DB::statement('UPDATE xxx_project_revenues SET type_id = null;');

        $dispatcherProjectRevenue = ProjectRevenue::getEventDispatcher();
        $dispatcherRevenuesKwh = RevenuesKwh::getEventDispatcher();
        // Remove Dispatcher
        ProjectRevenue::unsetEventDispatcher();
        RevenuesKwh::unsetEventDispatcher();

        $projectRevenueKwhSplitCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwhSplit')->first()->id;
        $projectRevenueKwhCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first()->id;

        // eerst de totale opbrengstverdelingen
        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('category_id', $projectRevenueKwhCategoryId)->get();
        foreach($oldProjectRevenuesKwh as $oldProjectRevenue) {
            $this->createRevenuesKwh($oldProjectRevenue, $projectRevenueKwhCategoryId, $projectRevenueKwhSplitCategoryId, null, false);
        }

        // nu de tussentijdse opbrengstverdelingen
        $oldProjectRevenuesKwhSplit = DB::table('xxx_project_revenues')
            ->where('category_id', $projectRevenueKwhSplitCategoryId)
            ->orderBy('date_begin')->get();
        foreach($oldProjectRevenuesKwhSplit as $oldProjectSplitRevenue) {
            // Check of tussentijds periode reeds valt in een totale opbrengstverdeling.
            // tt 01-01-2022 t/m 30-06-2022
            //    01-01-2022 t/m 30-06-2022
            // tt 01-01-2022 t/m 30-06-2022 01-01-2022 <= 01-01-2022 true 30-06-2022 > 01-01-2022 true
            // tt 01-07-2022 t/m 31-12-2022
            //    01-01-2022 t/m 31-12-2022 01-01-2022 <= 01-07-2022 true 31-12-2022 > 01-07-2022 true
            $projectRevenuesKwh = DB::table('revenues_kwh')->where('project_id', $oldProjectSplitRevenue->project_id)
                ->where('category_id', $projectRevenueKwhCategoryId)
                ->where('date_begin', '<=', $oldProjectSplitRevenue->date_begin)
                ->where('date_end', '>', $oldProjectSplitRevenue->date_begin)
                ->orderBy('date_end', 'desc');

            if ($projectRevenuesKwh->exists()) {
                // Zo wel, dan revenueKwhSplit verwerken in distribution parts bij gevonden revenueKwh.
                $this->createRevenuesKwh($oldProjectSplitRevenue, $projectRevenueKwhCategoryId, $projectRevenueKwhSplitCategoryId, $projectRevenuesKwh->first(), false);
            } else {
                // Zo niet, dan controleren of er al een nieuwe revenueKwh is gemaakt van een vorige revenueKwhSplit.
                $checkDate = Carbon::parse($oldProjectSplitRevenue->date_begin)->subDay()->format('Y-m-d');
                $projectRevenuesKwhNew = DB::table('revenues_kwh')->where('project_id', $oldProjectSplitRevenue->project_id)
                    ->where('category_id', $projectRevenueKwhCategoryId)
                    ->where('date_end', '=', $checkDate)
                    ->where('confirmed', true)
                    ->orderBy('date_end', 'desc');
                if ($projectRevenuesKwhNew->exists()) {
                    // Zo ja, dan gebruiken we die reeds aangemaakt revenueKwh waarvan we de looptijd verder uitbreiden, daarna de revenueKwhSplit verwerken in distribution parts
                    $projectRevenuesKwhNew->first()->date_end = $oldProjectSplitRevenue->date_end;
                    $projectRevenuesKwhNew->save();
                    $this->createRevenuesKwh($oldProjectSplitRevenue, $projectRevenueKwhCategoryId, $projectRevenueKwhSplitCategoryId, $projectRevenuesKwhNew, false);
                } else {
                    // Zo niet, dan maken met nieuwe revenueKwh obv revenueKwhSplit en revenueKwhSplit verwerken in distribution parts
                    $this->createRevenuesKwh($oldProjectSplitRevenue, $projectRevenueKwhCategoryId, $projectRevenueKwhSplitCategoryId, null, true);
                }
            }
        }

        // simuleren overige waarden per dag
//        $revenuesKwh = RevenuesKwh::all();
//        foreach($revenuesKwh as $revenueKwh) {
//            if(!$revenueKwh->distributionPartsKwh()->exists()){
//                $this->createRevenueValuesKwhSimulate($revenueKwh);
//            }
//        }

        // Re-add Dispatcher
        ProjectRevenue::setEventDispatcher($dispatcherProjectRevenue);
        RevenuesKwh::setEventDispatcher($dispatcherRevenuesKwh);

    }

    /**
     * @param $oldProjectRevenue
     * @param $projectRevenueKwhCategory
     * @param $createFromSplit
     */
    protected function createRevenuesKwh($oldProjectRevenue, $projectRevenueKwhCategoryId, $projectRevenueKwhSplitCategoryId, $revenuesKwh, $createFromSplit): void
    {
        $newRevenuesKwhCreated = false;
        if($revenuesKwh == null) {
            if ($createFromSplit) {
                $confirmed = 0;
                $status = 'concept';
                $dateConfirmed = null;
            } else {
                $confirmed = $oldProjectRevenue->confirmed;
                $status = $oldProjectRevenue->confirmed ? 'confirmed' : 'concept';
                $dateConfirmed = $oldProjectRevenue->date_confirmed;
            }
            $revenuesKwh = RevenuesKwh::create([
                'category_id' => $projectRevenueKwhCategoryId,
                'project_id' => $oldProjectRevenue->project_id,
                'distribution_type_id' => $oldProjectRevenue->distribution_type_id,
                'confirmed' => $confirmed,
                'status' => $status,
                'date_begin' => $oldProjectRevenue->date_begin,
                'date_end' => $oldProjectRevenue->date_end,
                'date_confirmed' => $dateConfirmed,
                'payout_kwh' => $oldProjectRevenue->payout_kwh,
                'created_by_id' => $oldProjectRevenue->created_by_id,
                'created_at' => $oldProjectRevenue->created_at,
                'updated_at' => $oldProjectRevenue->updated_at,
            ]);
            $remarks = 'Nieuw gemaakt obv oude';
            DB::insert('insert into xxx_conversion_revenues_kwh (new_revenue_id, old_revenue_id, remarks) values (?, ?, ?)', [$revenuesKwh->id, $oldProjectRevenue->id, $remarks]);
            $newRevenuesKwhCreated = true;
        }

        // revenue met jaaroverschrijding? dan splitsen op einde jaar
        $dateBeginFromRevenue = Carbon::parse($oldProjectRevenue->date_begin)->format('Y-m-d');
        $dateEndFromRevenue = Carbon::parse($oldProjectRevenue->date_end)->format('Y-m-d');
        $dateEndCalendarYearFromRevenue = Carbon::parse($oldProjectRevenue->date_begin)->endOfYear()->format('Y-m-d');
        $part1BeginDate = null;
        $part1EndDate = null;
        $part2BeginDate = null;
        $part2EndDate = null;
        $kwhStartHigh = $oldProjectRevenue->kwh_start_high ? $oldProjectRevenue->kwh_start_high : 0;
        $kwhEndHigh = $oldProjectRevenue->kwh_end_high ? $oldProjectRevenue->kwh_end_high : 0;
        $kwhStartLow = $oldProjectRevenue->kwh_start_low ? $oldProjectRevenue->kwh_start_low : 0;
        $kwhEndLow = $oldProjectRevenue->kwh_end_low ? $oldProjectRevenue->kwh_end_low : 0;
        $kwhEndCalendarYearHigh = $oldProjectRevenue->kwh_end_calendar_year_high ? $oldProjectRevenue->kwh_end_calendar_year_high : 0;
        $kwhEndCalendarYearLow = $oldProjectRevenue->kwh_end_calendar_year_low ? $oldProjectRevenue->kwh_end_calendar_year_low : 0;
        $kwhEndCalendarYear = $kwhEndCalendarYearHigh + $kwhEndCalendarYearLow;

        if ($dateEndFromRevenue >= $dateEndCalendarYearFromRevenue && $kwhEndCalendarYear > 0) {
            $dateBeginNextCalendarYearFromRevenue = Carbon::parse($oldProjectRevenue->date_end)->startOfYear()->format('Y-m-d');
            $part1BeginDate = $dateBeginFromRevenue;
            $part1EndDate = $dateEndCalendarYearFromRevenue;
            $part1KwhStartHigh = $kwhStartHigh;
            $part1KwhEndHigh = $kwhEndCalendarYearHigh;
            $part1KwhStartLow = $kwhStartLow;
            $part1KwhEndLow = $kwhEndCalendarYearLow;
            $part1KwhStart = $part1KwhStartHigh + $part1KwhStartLow;
            $part1KwhEnd = $part1KwhEndHigh + $part1KwhEndLow;;
            $part2BeginDate = $dateBeginNextCalendarYearFromRevenue;
            $part2EndDate = $dateEndFromRevenue;
            $part2KwhStartHigh = $part1KwhEndHigh;
            $part2KwhEndHigh = $kwhEndHigh;
            $part2KwhStartLow = $part1KwhEndLow;
            $part2KwhEndLow = $kwhEndLow;
            $part2KwhStart = $part2KwhStartHigh + $part2KwhStartLow;
            $part2KwhEnd = $part2KwhEndHigh + $part2KwhEndLow;;
        } else {
            $part1BeginDate = $dateBeginFromRevenue;
            $part1EndDate = $dateEndFromRevenue;
            $part1KwhStartHigh = $kwhStartHigh;
            $part1KwhEndHigh = $kwhEndHigh;
            $part1KwhStartLow = $kwhStartLow;
            $part1KwhEndLow = $kwhEndLow;
            $part1KwhStart = $part1KwhStartHigh + $part1KwhStartLow;
            $part1KwhEnd = $part1KwhEndHigh + $part1KwhEndLow;;
            $part2BeginDate = null;
            $part2EndDate = null;
            $part2KwhStartHigh = 0;
            $part2KwhEndHigh = 0;
            $part2KwhStartLow = 0;
            $part2KwhEndLow = 0;
            $part2KwhStart = 0;
            $part2KwhEnd = 0;
        }

        $this->createRevenueValuesKwh($part1BeginDate, $revenuesKwh, $part1KwhStart, $part1KwhStartHigh, $part1KwhStartLow, $oldProjectRevenue, $part1EndDate, $part1KwhEnd, $part1KwhEndHigh, $part1KwhEndLow);
        $this->createRevenueValuesKwh($part2BeginDate, $revenuesKwh, $part2KwhStart, $part2KwhStartHigh, $part2KwhStartLow, $oldProjectRevenue, $part2EndDate, $part2KwhEnd, $part2KwhEndHigh, $part2KwhEndLow);

        // bij oude tussentijdse opbrengsten (zonder totale opbrengstverdeling), eerst distributies alle participanten aanmaken.
        if($createFromSplit && $oldProjectRevenue->category_id == $projectRevenueKwhSplitCategoryId ){
            $revenuesKwhController = new RevenuesKwhController();
            $revenuesKwhReload = RevenuesKwh::find($revenuesKwh->id);
            if($revenuesKwhReload->project->participantsProject){
                foreach ($revenuesKwhReload->project->participantsProject as $participant) {
                    $revenuesKwhController->saveDistributionKwh($revenuesKwhReload, $participant);
                }
            }
        }

//        $oldProjectRevenueDistributions = DB::table('old_project_revenue_distribution')->where('revenue_id', $oldProjectRevenue->id)->get();
//        foreach ($oldProjectRevenueDistributions as $oldProjectRevenueDistribution) {
//            $this->createDistributionPartsKwh($part2BeginDate, $part2EndDate, $oldProjectRevenueDistribution, $revenuesKwh, $part1BeginDate, $part1EndDate, $oldProjectRevenue, $projectRevenueKwhSplitCategoryId);
//        }

    }

    /**
     * @param string $partBeginDate
     * @param $revenuesKwh
     * @param int $partKwhStart
     * @param int $partKwhStartHigh
     * @param int $partKwhStartLow
     * @param $oldProjectRevenue
     * @param string $partEndDate
     * @param int $partKwhEnd
     * @param int $partKwhEndHigh
     * @param int $partKwhEndLow
     */
    protected function createRevenueValuesKwh(?string $partBeginDate, $revenuesKwh, int $partKwhStart, int $partKwhStartHigh, int $partKwhStartLow, $oldProjectRevenue, ?string $partEndDate, int $partKwhEnd, int $partKwhEndHigh, int $partKwhEndLow): void
    {
//        if($oldProjectRevenue->id == 218){
//            Log::info('test !!!!');
//            Log::info($partBeginDate);
//            Log::info($partEndDate);
//            Log::info($partKwhStart);
//            Log::info($partKwhStartHigh);
//            Log::info($partKwhStartLow);
//        }
        if ($partBeginDate != null) {
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuesKwh->id)->where('date_registration', $partBeginDate)->first();
            if($revenueValuesKwh){
//                if($oldProjectRevenue->id == 218){
//                    Log::info('test 2');
//                    Log::info($revenueValuesKwh->kwh_start);
//                    Log::info($revenueValuesKwh->kwh_start_high);
//                    Log::info($revenueValuesKwh->kwh_start_low);
//                }
                if($revenueValuesKwh->kwh_start != $partKwhStart
                    || $revenueValuesKwh->kwh_start_high != $partKwhStartHigh
                    || $revenueValuesKwh->kwh_start_low != $partKwhStartLow){
                    $revenueValuesKwh->status .= ' - Error beginstanden!';
                    $revenueValuesKwh->kwh_start = $partKwhStart;
                    $revenueValuesKwh->kwh_start_high = $partKwhStartHigh;
                    $revenueValuesKwh->kwh_start_low = $partKwhStartLow;
                    $revenueValuesKwh->save();
                    Log::error('Revenue kwh id: ' . $revenuesKwh->id . '. Verschillende beginstanden op ' . Carbon::parse($partBeginDate)->format('d-m-Y') . '!!!!');
                }
            }else{
                RevenueValuesKwh::create([
                    'revenue_id' => $revenuesKwh->id,
                    'date_registration' => $partBeginDate,
                    'is_simulated' => false,
                    'kwh_start' => $partKwhStart,
                    'kwh_end' => 0,
                    'kwh_start_high' => $partKwhStartHigh,
                    'kwh_end_high' => 0,
                    'kwh_start_low' => $partKwhStartLow,
                    'kwh_end_low' => 0,
                    'status' => 'conversion-start',
                    'created_at' => $oldProjectRevenue->created_at,
                    'updated_at' => $oldProjectRevenue->updated_at,
                ]);
            }
        }
        if ($partEndDate != null) {
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuesKwh->id)->where('date_registration', $partEndDate)->first();
            if($revenueValuesKwh){
                if($revenueValuesKwh->kwh_end != $partKwhEnd
                    || $revenueValuesKwh->kwh_end_high != $partKwhEndHigh
                    || $revenueValuesKwh->kwh_end_low != $partKwhEndLow){
                    $revenueValuesKwh->status .= ' - Error beginstanden!';
                    $revenueValuesKwh->kwh_end = $partKwhEnd;
                    $revenueValuesKwh->kwh_end_high = $partKwhEndHigh;
                    $revenueValuesKwh->kwh_end_low = $partKwhEndLow;
                    $revenueValuesKwh->save();
                    Log::error('Revenue kwh id: ' . $revenuesKwh->id . '. Verschillende eindstanden op ' . Carbon::parse($partEndDate)->format('d-m-Y') . '!!!!');
                }
            }else {
                RevenueValuesKwh::create([
                    'revenue_id' => $revenuesKwh->id,
                    'date_registration' => $partEndDate,
                    'is_simulated' => false,
                    'kwh_start' => 0,
                    'kwh_end' => $partKwhEnd,
                    'kwh_start_high' => 0,
                    'kwh_end_high' => $partKwhEndHigh,
                    'kwh_start_low' => 0,
                    'kwh_end_low' => $partKwhEndLow,
                    'status' => 'conversion-end',
                    'created_at' => $oldProjectRevenue->created_at,
                    'updated_at' => $oldProjectRevenue->updated_at,
                ]);
            }
//            $newBeginDate = Carbon::parse($partEndDate)->addDay()->format('Y-m-d');
//            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuesKwh->id)->where('date_registration', $newBeginDate)->first();
//            if($revenueValuesKwh){
//                if($revenueValuesKwh->kwh_start != $partKwhEnd
//                    || $revenueValuesKwh->kwh_start_high != $partKwhEndHigh
//                    || $revenueValuesKwh->kwh_start_low != $partKwhEndLow){
//                    $revenueValuesKwh->status = .= ' - Error eindstanden!';
//                    $revenueValuesKwh->kwh_start = $partKwhEnd;
//                    $revenueValuesKwh->kwh_start_high = $partKwhEndHigh;
//                    $revenueValuesKwh->kwh_start_low = $partKwhEndLow;
//                    $revenueValuesKwh->save();
//                    Log::error('Revenue kwh id: ' . $revenuesKwh->id . '. Verschillende eindstanden op ' . Carbon::parse($partEndDate)->format('d-m-Y') . '!!!!');
//                }
//            }else {
//                RevenueValuesKwh::create([
//                    'revenue_id' => $revenuesKwh->id,
//                    'date_registration' => $newBeginDate,
//                    'is_simulated' => false,
//                    'kwh_start' => $partKwhEnd,
//                    'kwh_end' => 0,
//                    'kwh_start_high' => $partKwhEndHigh,
//                    'kwh_end_high' => 0,
//                    'kwh_start_low' => $partKwhEndLow,
//                    'kwh_end_low' => 0,
//                    'status' => 'conversion',
////                    'delivered_total_concept' => $delivered_total_concept,
////                    'delivered_total_confirmed' => $delivered_total_confirmed,
////                    'delivered_total_processed' => $delivered_total_processed,
//                    'created_at' => $oldProjectRevenue->created_at,
//                    'updated_at' => $oldProjectRevenue->updated_at,
//                ]);
//            }
        }
    }

    /**
     * @param string|null $part2BeginDate
     * @param string|null $part2EndDate
     * @param $oldProjectRevenueDistribution
     * @param $revenuesKwh
     * @param string $part1BeginDate
     * @param string $part1EndDate
     * @param $oldProjectRevenue
     */
    protected function createDistributionPartsKwh(?string $part2BeginDate, ?string $part2EndDate, $oldProjectRevenueDistribution, $revenuesKwh, string $part1BeginDate, string $part1EndDate, $oldProjectRevenue, $projectRevenueKwhSplitCategoryId): void
    {
        if ($part2BeginDate != null && $part2EndDate != null) {
            $participations_quantity = $oldProjectRevenueDistribution->participations_amount_end_calendar_year;
            $participations_quantity2 = $oldProjectRevenueDistribution->participations_amount;
        } else {
            $participations_quantity = $oldProjectRevenueDistribution->participations_amount;
            $participations_quantity2 = 0;
        }

        $delivered_total_concept = 0;
        $delivered_total_concept1 = 0;
        $delivered_total_concept2 = 0;
        $delivered_total_confirmed = 0;
        $delivered_total_confirmed1 = 0;
        $delivered_total_confirmed2 = 0;
        $delivered_total_processed = 0;
        $delivered_total_processed1 = 0;
        $delivered_total_processed2 = 0;
        if ($oldProjectRevenueDistribution->status == 'concept') {
            if ($part2BeginDate != null && $part2EndDate != null) {
                $delivered_total_concept = $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                $delivered_total_concept1 = $oldProjectRevenueDistribution->delivered_total - $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                $delivered_total_concept2 = $oldProjectRevenueDistribution->delivered_total;
            } else {
                $delivered_total_concept = $oldProjectRevenueDistribution->delivered_total;
                $delivered_total_concept1 = $oldProjectRevenueDistribution->delivered_total;
                $delivered_total_concept2 = 0;
            }
        } elseif ($oldProjectRevenueDistribution->status == 'confirmed') {
            if ($part2BeginDate != null && $part2EndDate != null) {
                $delivered_total_confirmed = $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                $delivered_total_confirmed1 = $oldProjectRevenueDistribution->delivered_total - $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                $delivered_total_confirmed2 = $oldProjectRevenueDistribution->delivered_total;
            } else {
                $delivered_total_confirmed = $oldProjectRevenueDistribution->delivered_total;
                $delivered_total_confirmed1 = $oldProjectRevenueDistribution->delivered_total;
                $delivered_total_confirmed2 = 0;
            }
        } elseif ($oldProjectRevenueDistribution->status == 'processed') {
            if ($part2BeginDate != null && $part2EndDate != null) {
                $delivered_total_processed = $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                $delivered_total_processed1 = $oldProjectRevenueDistribution->delivered_total - $oldProjectRevenueDistribution->delivered_total_end_calendar_year;
                $delivered_total_processed2 = $oldProjectRevenueDistribution->delivered_total;
            } else {
                $delivered_total_processed = $oldProjectRevenueDistribution->delivered_total;
                $delivered_total_processed1 = $oldProjectRevenueDistribution->delivered_total;
                $delivered_total_processed2 = 0;
            }
        }

        if($oldProjectRevenue->category_id == $projectRevenueKwhSplitCategoryId ){

        }


        $revenueDistributionKwh = RevenueDistributionKwh::where('revenue_id', $revenuesKwh->id)->where('participation_id', $oldProjectRevenueDistribution->participation_id)->first();
        if($revenueDistributionKwh){
            // bij oude tussentijdse opbrengsten (zonder totale opbrengstverdeling), eerst distributies alle participanten aanmaken.
            $revenueDistributionKwh->status .= '- bijgewerkt';
            $revenueDistributionKwh->participations_quantity = $oldProjectRevenueDistribution->participations_amount;
            $revenueDistributionKwh->delivered_total_concept = $delivered_total_concept;
            $revenueDistributionKwh->delivered_total_confirmed = $delivered_total_confirmed;
            $revenueDistributionKwh->delivered_total_processed = $delivered_total_processed;
            $revenueDistributionKwh->save();
            Log::error('Revenue distribution kwh id: ' . $revenueDistributionKwh->id . ' bestaat reeds. Deelnames en Totalen geleverd wel bijgewerkt.');
        }else{
            $revenueDistributionKwh = RevenueDistributionKwh::create([
                'revenue_id' => $revenuesKwh->id,
                'participation_id' => $oldProjectRevenueDistribution->participation_id,
                'contact_id' => $oldProjectRevenueDistribution->contact_id,
                'status' => $oldProjectRevenueDistribution->status,
                'participations_quantity' => $oldProjectRevenueDistribution->participations_amount,
                'delivered_total_concept' => $delivered_total_concept,
                'delivered_total_confirmed' => $delivered_total_confirmed,
                'delivered_total_processed' => $delivered_total_processed,
                'street_number_addition' => $oldProjectRevenueDistribution->street_number_addition,
                'street_number' => $oldProjectRevenueDistribution->participations_amount,
                'street' => $oldProjectRevenueDistribution->street,
                'address' => $oldProjectRevenueDistribution->address,
                'postal_code' => $oldProjectRevenueDistribution->postal_code,
                'city' => $oldProjectRevenueDistribution->city,
                'country' => $oldProjectRevenueDistribution->country,
                'energy_supplier_ean_electricity' => $oldProjectRevenueDistribution->energy_supplier_ean_electricity,
                'created_at' => $oldProjectRevenueDistribution->created_at,
                'updated_at' => $oldProjectRevenueDistribution->updated_at,
            ]);
        }

        if ($part1BeginDate != null && $part1EndDate != null) {
            $revenuePartsKwh1 = RevenuePartsKwh::where('revenue_id', $revenuesKwh->id)->where('date_begin', $part1BeginDate)->where('date_end', $part1EndDate)->first();
            if(!$revenuePartsKwh1){
                $revenuePartsKwh1 = RevenuePartsKwh::create([
                    'revenue_id' => $revenuesKwh->id,
                    'date_begin' => $part1BeginDate,
                    'date_end' => $part1EndDate,
                    'confirmed' => $oldProjectRevenueDistribution->confirmed,
                    'status' => $oldProjectRevenueDistribution->status,
                    'dateConfirmed' => $oldProjectRevenueDistribution->date_confirmed,
                    'payout_kwh' => $oldProjectRevenue->payout_kwh,
                    'delivered_total_concept' => $delivered_total_concept1,
                    'delivered_total_confirmed' => $delivered_total_confirmed1,
                    'delivered_total_processed' => $delivered_total_processed1,
                    'created_at' => $oldProjectRevenue->created_at,
                    'updated_at' => $oldProjectRevenue->updated_at,
                ]);
            }
            $revenueDistributionPartsKwh = RevenueDistributionPartsKwh::create([
                'parts_id' => $revenuePartsKwh1->id,
                'distribution_id' => $revenueDistributionKwh->id,
                'revenue_id' => $revenuesKwh->id,
                'status' => $oldProjectRevenueDistribution->status,
                'participations_quantity' => $participations_quantity,
                'delivered_total_concept' => $delivered_total_concept1,
                'delivered_total_confirmed' => $delivered_total_confirmed1,
                'delivered_total_processed' => $delivered_total_processed1,
                'es_id' => $oldProjectRevenueDistribution->es_id,
                'energy_supplier_name' => $oldProjectRevenueDistribution->energy_supplier_name,
                'energy_supplier_number' => $oldProjectRevenueDistribution->energy_supplier_number,
                'created_at' => $oldProjectRevenue->created_at,
                'updated_at' => $oldProjectRevenue->updated_at,
            ]);
        }

        if ($part2BeginDate != null && $part2EndDate != null) {
            $revenuePartsKwh2 = RevenuePartsKwh::where('revenue_id', $revenuesKwh->id)->where('date_begin', $part2BeginDate)->where('date_end', $part2EndDate)->first();
            if(!$revenuePartsKwh2) {
                $revenuePartsKwh2 = RevenuePartsKwh::create([
                    'revenue_id' => $revenuesKwh->id,
                    'date_begin' => $part2BeginDate,
                    'date_end' => $part2EndDate,
                    'confirmed' => $oldProjectRevenueDistribution->confirmed,
                    'status' => 'conversion',
                    'dateConfirmed' => $oldProjectRevenueDistribution->date_confirmed,
                    'payout_kwh' => $oldProjectRevenue->payout_kwh,
                    'delivered_total_concept' => $delivered_total_concept2,
                    'delivered_total_confirmed' => $delivered_total_confirmed2,
                    'delivered_total_processed' => $delivered_total_processed2,
                    'created_at' => $oldProjectRevenue->created_at,
                    'updated_at' => $oldProjectRevenue->updated_at,
                ]);
            }
            $revenueDistributionPartsKwh = RevenueDistributionPartsKwh::create([
                'parts_id' => $revenuePartsKwh2->id,
                'distribution_id' => $revenueDistributionKwh->id,
                'revenue_id' => $revenuesKwh->id,
                'status' => $oldProjectRevenueDistribution->status,
                'participations_quantity' => $participations_quantity2,
                'delivered_total_concept' => $delivered_total_concept2,
                'delivered_total_confirmed' => $delivered_total_confirmed2,
                'delivered_total_processed' => $delivered_total_processed2,
                'es_id' => $oldProjectRevenueDistribution->es_id,
                'energy_supplier_name' => $oldProjectRevenueDistribution->energy_supplier_name,
                'energy_supplier_number' => $oldProjectRevenueDistribution->energy_supplier_number,
                'created_at' => $oldProjectRevenue->created_at,
                'updated_at' => $oldProjectRevenue->updated_at,
            ]);
        }
    }

    /**
     * @param $revenueDistributionPartsKwh
     */
    protected function createRevenueValuesKwhSimulate($revenueKwh): void
    {
        $period = CarbonPeriod::create(Carbon::parse($revenueKwh->date_begin)->format('Y-m-d'), Carbon::parse($revenueKwh->date_end)->format('Y-m-d'));
//        Log::info('Revenue id ' . $revenueKwh->id . '. Old revenue id ' . $revenueKwh->old_revenue_id);
//        Log::info('Begin ' . $revenueKwh->date_begin);
//        Log::info('Eind  ' . $revenueKwh->date_end);
        $daysOfPeriod = Carbon::parse($revenueKwh->date_end)->addDay()->diffInDays(Carbon::parse($revenueKwh->date_begin));
//        Log::info('Aantal dagen ' . $daysOfPeriod);
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueKwh->id)->where('date_registration', $revenueKwh->date_begin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueKwh->id)->where('date_registration', $revenueKwh->date_end)->first();
//        Log::info('Delivered High ' . ($endRevenueValuesKwh->kwh_end_high - $beginRevenueValuesKwh->kwh_start_high));
//        Log::info('Delivered Low ' . ($endRevenueValuesKwh->kwh_end_low - $beginRevenueValuesKwh->kwh_start_low));
//        Log::info('Delivered Total ' . ($endRevenueValuesKwh->kwh_end - $beginRevenueValuesKwh->kwh_start));
        $deliveredHighPerDay = round((($endRevenueValuesKwh->kwh_end_high - $beginRevenueValuesKwh->kwh_start_high) / $daysOfPeriod), 6);
        $deliveredLowPerDay = round((($endRevenueValuesKwh->kwh_end_low - $beginRevenueValuesKwh->kwh_start_low) / $daysOfPeriod), 6);
        $deliveredTotalPerDay = round((($endRevenueValuesKwh->kwh_end - $beginRevenueValuesKwh->kwh_start) / $daysOfPeriod), 6);
//        Log::info('Delivered High per dag ' . $deliveredHighPerDay);
//        Log::info('Delivered Low per dag ' . $deliveredLowPerDay);
//        Log::info('Delivered Total per dag ' . $deliveredTotalPerDay);
        $deliveredTotalConceptDefault = 0;
        $deliveredTotalConfirmedDefault = 0;
        $deliveredTotalProcessedDefault = 0;
        if ($revenueKwh->status == 'concept') {
            $deliveredTotalConceptDefault = $deliveredTotalPerDay;
        } elseif ($revenueKwh->status == 'confirmed') {
            $deliveredTotalConfirmedDefault = $deliveredTotalPerDay;
        } elseif ($revenueKwh->status == 'processed') {
            $deliveredTotalProcessedDefault = $deliveredTotalPerDay;
        }

        RevenueValuesKwh::where('revenue_id', $revenueKwh->id)->where('is_simulated', true)->delete();

        $kwhStart = $beginRevenueValuesKwh->kwh_start;
        $kwhEnd = $beginRevenueValuesKwh->kwh_start + $deliveredTotalPerDay;
        $kwhStartHigh = $beginRevenueValuesKwh->kwh_start_high;
        $kwhEndHigh = $beginRevenueValuesKwh->kwh_start_high + $deliveredHighPerDay;
        $kwhStartLow = $beginRevenueValuesKwh->kwh_start_low;
        $kwhEndLow = $beginRevenueValuesKwh->kwh_start_low + $deliveredLowPerDay;
        // Iterate over the period
        foreach ($period as $date) {
//            if($revenueKwh->old_revenue_id == 218){
//                Log::info('bij simulatie');
//                Log::info($revenueKwh->kwh_start);
//                Log::info($kwhStart);
//                Log::info($revenueKwh->kwh_start_high);
//                Log::info($kwhStartHigh);
//                Log::info($revenueKwh->kwh_start_low);
//                Log::info($kwhStartLow);
//            }

            $dateRegistration = $date->format('Y-m-d');
            $revenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueKwh->id)->where('date_registration', $dateRegistration)->first();
            if($revenueValuesKwh) {
                if(strstr($revenueValuesKwh->status, 'conversion-start')){
                    if($revenueValuesKwh->kwh_start != $kwhStart
                        || $revenueValuesKwh->kwh_start_high != $kwhStartHigh
                        || $revenueValuesKwh->kwh_start_low != $kwhStartLow){
                        $revenueValuesKwh->status .= ' - Vershillen vaste beginstanden bij simulatie!';
                        $revenueValuesKwh->save();
                        Log::error('Revenue kwh id: ' . $revenueKwh->id . '. Verschillende beginstanden op ' . Carbon::parse($dateRegistration)->format('d-m-Y') . '!!!!');
                    }
                }
                $revenueValuesKwh->kwh_start = $kwhStart;
                $revenueValuesKwh->kwh_start_high = $kwhStartHigh;
                $revenueValuesKwh->kwh_start_low = $kwhStartLow;
                if(strstr($revenueValuesKwh->status, 'conversion-end') && $revenueValuesKwh->kwh_end != $kwhEnd){
                    $deliveredTotalConceptEnd = 0;
                    $deliveredTotalConfirmedEnd = 0;
                    $deliveredTotalProcessedEnd = 0;
                    $deliveredTotalConcept = $revenueValuesKwh->kwh_end - $kwhStart;
                    if ($revenueKwh->status == 'concept') {
                        $deliveredTotalConceptEnd = $deliveredTotalConcept;
                    } elseif ($revenueKwh->status == 'confirmed') {
                        $deliveredTotalConfirmedEnd = $deliveredTotalConcept;
                    } elseif ($revenueKwh->status == 'processed') {
                        $deliveredTotalProcessedEnd = $deliveredTotalConcept;
                    }
                    $revenueValuesKwh->delivered_total_concept = $deliveredTotalConceptEnd;
                    $revenueValuesKwh->delivered_total_confirmed = $deliveredTotalConfirmedEnd;
                    $revenueValuesKwh->delivered_total_processed = $deliveredTotalProcessedEnd;
                } else {
                    $revenueValuesKwh->kwh_end = $kwhEnd;
                    $revenueValuesKwh->kwh_end_high = $kwhEndHigh;
                    $revenueValuesKwh->kwh_end_low = $kwhEndLow;
                    $revenueValuesKwh->delivered_total_concept = $deliveredTotalConceptDefault;
                    $revenueValuesKwh->delivered_total_confirmed = $deliveredTotalConfirmedDefault;
                    $revenueValuesKwh->delivered_total_processed = $deliveredTotalProcessedDefault;
                }
                $revenueValuesKwh->save();
            } else {
                RevenueValuesKwh::create([
                    'revenue_id' => $revenueKwh->id,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_end' => $kwhEnd,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_end_high' => $kwhEndHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'kwh_end_low' => $kwhEndLow,
                    'status' => $revenueKwh->status,
                    'delivered_total_concept' => $deliveredTotalConceptDefault,
                    'delivered_total_confirmed' => $deliveredTotalConfirmedDefault,
                    'delivered_total_processed' => $deliveredTotalProcessedDefault,
                    'created_at' => $revenueKwh->created_at,
                    'updated_at' => $revenueKwh->updated_at,
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
}
