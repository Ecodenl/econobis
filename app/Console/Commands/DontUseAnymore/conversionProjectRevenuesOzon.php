<?php

namespace App\Console\Commands\DontUseAnymore;

use App\Eco\Address\Address;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenue;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class conversionProjectRevenuesOzon extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionProjectRevenuesOzon';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie project revenues Ozon';

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
        Log::info('Test Conversie project revenues Ozon - start');
        Log::info('NIET MEER IN DEZE VERSIE !!');

//        DB::statement('DELETE FROM project_revenue_distribution where revenue_id in (select id FROM project_revenues where category_id = 1);');
//        DB::statement('DELETE FROM project_revenues where category_id = 1;');
//        $projects = Project::where('project_type_id', 8)->get();
//        foreach ($projects as $project) {
//            $project->date_interest_bearing_kwh = null;
//            $project->kwh_start_high_next_revenue = null;
//            $project->save();
//        }
//
//        $projectIds = Project::where('project_type_id', 8)->pluck('id')->toArray();
//        foreach ($projectIds as $projectId) {
//            for ($year = 2015; $year <= 2021; $year++) {
//                $project = Project::find($projectId);
//                $participations = ParticipantProject::where('project_id', $project->id)
//                    ->whereRaw('YEAR(date_register) = ' . $year)->exists();
//                if ($participations) {
//
//                    $dateBegin = $year . '-01-01';
//                    $dateEnd = $year . '-12-31';
//
//                    $participationIds = $project->participantsProject->pluck('id')->toArray();
//                    $mutations = ParticipantMutation::where('type_id', 14)
//                        ->whereBetween('date_payment', [Carbon::parse($dateBegin)->addDay()->format('Y-m-d'), Carbon::parse($dateEnd)->addDay(2)->format('Y-m-d')])
//                        ->whereIn('participation_id', $participationIds)
//                        ->get();
//
//                    if($mutations->count()>0){
////                        if($project->id == 8){
////                            Log::info('project 8 !');
////                            Log::info('Aantal particpations: ' . ParticipantProject::where('project_id', $project->id)
////                                    ->whereRaw('YEAR(date_register) = ' . $year)->count());
////                            Log::info('Aantal mutations: ' . $mutations->count());
////                            Log::info('jaar: ' . $year);
////
////                            Log::info(ParticipantProject::where('project_id', $project->id)
////                                ->whereRaw('YEAR(date_register) = ' . $year)->get());
////                        }
//
//                        if ($year == 2015) {
//                            $vat = 0.1185;
//                        } elseif ($year == 2016) {
//                            $vat = 0.11960;
//                        } elseif ($year == 2017) {
//                            $vat = 0.1007;
//                        } elseif ($year == 2018) {
//                            $vat = 0.1013;
//                        } elseif ($year == 2019) {
//                            $vat = 0.10458;
//                        } elseif ($year == 2020) {
//                            $vat = 0.09863;
//                        } elseif ($year == 2021) {
//                            $vat = 0.0977;
//                        }
//
//                        $revData = [
//                            'category_id' => 1,
//                            'project_id' => $project->id,
//                            'distribution_type_id' => 'inPossessionOf',
//                            'confirmed' => 0,
//                            'date_begin' => $dateBegin,
//                            'date_end' => $dateEnd,
//                            'type_id' => 3,
//                            'date_reference' => ($year + 1) . '-01-01',
//                            'kwh_start' => $project->kwh_start_high_next_revenue,
//                            'kwh_start_high' => $project->kwh_start_high_next_revenue,
//                            'created_by_id' => 1,
//                            'created_at' => Carbon::now(),
//                            'updated_at' => Carbon::now(),
//                            'payout_kwh' => $vat,
//                        ];
//                        $newRevenueId = DB::table('project_revenues')
//                            ->insertGetId($revData);
//
//                        $projectRevenue = ProjectRevenue::find($newRevenueId);
////                        $participationIds = $projectRevenue->project->participantsProject->pluck('id')->toArray();
////                        $mutations = ParticipantMutation::where('type_id', 14)
////                            ->whereBetween('date_payment', [Carbon::parse($projectRevenue->date_begin)->addDay()->format('Y-m-d'), Carbon::parse($projectRevenue->date_end)->addDay()->format('Y-m-d')])
////                            ->whereIn('participation_id', $participationIds)
////                            ->get();
//                        foreach ($mutations as $mutation) {
//
//                            $dateBegin = Carbon::parse($projectRevenue->date_begin)->format('Y-m-d');
//                            $addressEnergySupplier = AddressEnergySupplier::where('address_id', '=', $mutation->participation->address_id)
//                                ->whereIn('energy_supply_type_id', [2, 3] )
//                                ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                                    $addressEnergySupplier
//                                        ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                                            $addressEnergySupplier->whereNotNull('member_since')
//                                                ->where('member_since', '<=', $dateBegin);
//                                        })
//                                        ->orWhereNull('member_since');
//                                })
//                                ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                                    $addressEnergySupplier
//                                        ->where(function ($addressEnergySupplier) use ($dateBegin) {
//                                            $addressEnergySupplier->whereNotNull('end_date')
//                                                ->where('end_date', '>=', $dateBegin);
//                                        })
//                                        ->orWhereNull('end_date');
//                                })->first();
//
//                            $DistriData = [
//                                'revenue_id' => $projectRevenue->id,
//                                'contact_id' => $mutation->participation->contact_id,
//                                'street' => $mutation->participation->address->street,
//                                'street_number' => $mutation->participation->address->number,
//                                'address' => $mutation->participation->address->present()->streetAndNumber(),
//                                'postal_code' => $mutation->participation->address->postal_code,
//                                'city' => $mutation->participation->address->city,
//                                'status' => 'processed',
//                                'participations_amount' => $mutation->participation->participations_definitive,
//                                'payout' => 0,
//                                'payout_type_id' => 0,
//                                'energy_supplier_name' => $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : '',
//                                'delivered_total' => $mutation->payout_kwh,
//                                'es_id' => $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null,
//                                'participation_id' => $mutation->participation_id,
//                                'energy_supplier_ean_electricity' => $mutation->participation->address->ean_electricity,
//                                'energy_supplier_number' => $addressEnergySupplier ? $addressEnergySupplier->es_number : '',
//                                'payout_kwh' => $projectRevenue->payout_kwh,
//                                'created_at' => Carbon::now(),
//                                'updated_at' => Carbon::now(),
//                            ];
//                            DB::table('project_revenue_distribution')
//                                ->insert($DistriData);
//                        }
//
//                        $sumDeliveredTotal = $projectRevenue->distribution->sum('delivered_total');
//                        $projectRevenue->confirmed = 1;
//                        $projectRevenue->date_confirmed = $projectRevenue->date_reference;
//                        $projectRevenue->kwh_end = $project->kwh_start_high_next_revenue + $sumDeliveredTotal;
//                        $projectRevenue->kwh_end_high = $project->kwh_start_high_next_revenue + $sumDeliveredTotal;
//                        $projectRevenue->save();
//                    }
//
//                }
//            }
//        }
//        Log::info('Test Conversie project revenues Ozon - klaar');

    }
}
