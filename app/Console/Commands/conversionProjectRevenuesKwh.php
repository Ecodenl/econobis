<?php

namespace App\Console\Commands;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectRevenueCategory;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use App\Http\Controllers\Api\Project\RevenuesKwhController;
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
        $this->projectRevenueKwhSplitCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwhSplit')->first()->id;
        $this->projectRevenueKwhCategoryId = ProjectRevenueCategory::where('code_ref', 'revenueKwh')->first()->id;

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
        $dispatcherRevenuePartsKwh = RevenuePartsKwh::getEventDispatcher();
        // Remove Dispatcher
        ProjectRevenue::unsetEventDispatcher();
        RevenuesKwh::unsetEventDispatcher();
        RevenuePartsKwh::unsetEventDispatcher();

        // eerst de totale opbrengstverdelingen
        $oldProjectRevenuesKwh = DB::table('xxx_project_revenues')->where('category_id', $this->projectRevenueKwhCategoryId)->get();
        foreach($oldProjectRevenuesKwh as $oldProjectRevenue) {
            $this->createRevenuesKwh($oldProjectRevenue);
        }

        // Nu de tussentijdse opbrengstverdelingen zonder totale opbrengstverdeling
        $oldProjectRevenuesKwhSplit = DB::table('xxx_project_revenues')
            ->where('category_id', $this->projectRevenueKwhSplitCategoryId)
            ->orderBy('date_begin')->get();
        foreach($oldProjectRevenuesKwhSplit as $oldProjectSplitRevenue) {
            // Check of tussentijds periode reeds valt in een totale opbrengstverdeling.
            // tt 01-01-2022 t/m 30-06-2022
            //    01-01-2022 t/m 30-06-2022
            // tt 01-01-2022 t/m 30-06-2022 01-01-2022 <= 01-01-2022 true 30-06-2022 > 01-01-2022 true
            // tt 01-07-2022 t/m 31-12-2022
            //    01-01-2022 t/m 31-12-2022 01-01-2022 <= 01-07-2022 true 31-12-2022 > 01-07-2022 true
            $projectRevenuesKwh = DB::table('revenues_kwh')->where('project_id', $oldProjectSplitRevenue->project_id)
                ->where('category_id', $this->projectRevenueKwhCategoryId)
                ->where('date_begin', '<=', $oldProjectSplitRevenue->date_begin)
                ->where('date_end', '>', $oldProjectSplitRevenue->date_begin)
                ->orderBy('date_end', 'desc');

            // Zo niet, dan controleren of er al een nieuwe revenueKwh is gemaakt van een vorige revenueKwhSplit.
            if (!$projectRevenuesKwh->exists()) {
                $checkDate = Carbon::parse($oldProjectSplitRevenue->date_begin)->subDay()->format('Y-m-d');
                $projectRevenuesKwhNew = DB::table('revenues_kwh')->where('project_id', $oldProjectSplitRevenue->project_id)
                    ->where('category_id', $this->projectRevenueKwhCategoryId)
                    ->where('date_end', '=', $checkDate)
                    ->where('confirmed', true)
                    ->orderBy('date_end', 'desc');
                if ($projectRevenuesKwhNew->exists()) {
                    // Zo ja, dan gebruiken we die reeds aangemaakt revenueKwh waarvan we de looptijd verder uitbreiden
                    $projectRevenuesKwhNew->first()->date_end = $oldProjectSplitRevenue->date_end;
                    $projectRevenuesKwhNew->save();
                } else {
                    // Zo niet, dan maken met nieuwe revenueKwh obv revenueKwhSplit en revenueKwhSplit verwerken in distribution parts
                    $this->createRevenuesKwh($oldProjectSplitRevenue);
                }
            }
        }

        // Re-add Dispatcher
        ProjectRevenue::setEventDispatcher($dispatcherProjectRevenue);
        RevenuesKwh::setEventDispatcher($dispatcherRevenuesKwh);
        RevenuePartsKwh::setEventDispatcher($dispatcherRevenuePartsKwh);

    }

    /**
     * @param $oldProjectRevenue
     * @param $projectRevenueKwhCategory
     * @param $createFromSplit
     */
    protected function createRevenuesKwh($oldProjectRevenue): void
    {
        $revenuesKwh = RevenuesKwh::create([
            'category_id' => $this->projectRevenueKwhCategoryId,
            'project_id' => $oldProjectRevenue->project_id,
            'distribution_type_id' => $oldProjectRevenue->distribution_type_id,
            'confirmed' => 0,
            'status' => 'conversion',
            'date_begin' => $oldProjectRevenue->date_begin,
            'date_end' => $oldProjectRevenue->date_end,
            'date_confirmed' => null,
            'payout_kwh' => $oldProjectRevenue->payout_kwh,
            'created_by_id' => $oldProjectRevenue->created_by_id,
            'created_at' => $oldProjectRevenue->created_at,
            'updated_at' => $oldProjectRevenue->updated_at,
        ]);
        $remarks = 'Nieuw gemaakt obv oude';
        DB::insert('insert into xxx_conversion_revenues_kwh (new_revenue_id, old_revenue_id, remarks) values (?, ?, ?)', [$revenuesKwh->id, $oldProjectRevenue->id, $remarks]);

        $valuesKwhData = [
            'valuesDateBegin' => $oldProjectRevenue->date_begin,
            'kwhStart' =>  $oldProjectRevenue->kwh_start,
            'kwhStartHigh' => $oldProjectRevenue->kwh_start_high,
            'kwhStartLow' => $oldProjectRevenue->kwh_start_low,
        ];

        $this->createStartRevenueValuesKwh($valuesKwhData, $revenuesKwh);
        $this->createStartRevenuePartsKwh($revenuesKwh);
        $revenuesKwhController = new RevenuesKwhController();
        $revenuesKwhController->saveParticipantsOfDistribution($revenuesKwh);

    }

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
            'status' => 'conversion',
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

}
