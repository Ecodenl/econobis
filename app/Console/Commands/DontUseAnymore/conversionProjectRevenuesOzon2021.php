<?php

namespace App\Console\Commands\DontUseAnymore;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\Contact\Contact;
use App\Eco\Project\Project;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenueDistributionValuesKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\RevenuesKwh\RevenueValuesKwh;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class conversionProjectRevenuesOzon2021 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionProjectRevenuesOzon2021';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie project revenues Ozon 2021 verdelingen';

    protected $newRevenueTotalProcessed = 0;
    protected $oldRevenueTotalProcessed = 0;

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
        Log::info('Test Conversie project revenues Ozon 2021 verdelingen - start');

// Tijdens testen was het wel even handig om snel alles ongedaan te maken
//        DB::statement('CREATE TABLE xxx_revenue_values_kwh LIKE revenue_values_kwh;');
//        DB::statement('CREATE TABLE xxx_revenue_distribution_values_kwh LIKE revenue_distribution_values_kwh;');
//        DB::statement('CREATE TABLE xxx_revenue_distribution_parts_kwh LIKE revenue_distribution_parts_kwh;');
//        DB::statement('CREATE TABLE xxx_revenue_distribution_kwh LIKE revenue_distribution_kwh;');
//        DB::statement('CREATE TABLE xxx_revenue_parts_kwh LIKE revenue_parts_kwh;');
//        DB::statement('CREATE TABLE xxx_revenues_kwh LIKE revenues_kwh;');
//        DB::statement('INSERT xxx_revenue_values_kwh SELECT * FROM revenue_values_kwh;');
//        DB::statement('INSERT xxx_revenue_distribution_values_kwh SELECT * FROM revenue_distribution_values_kwh;');
//        DB::statement('INSERT xxx_revenue_distribution_parts_kwh SELECT * FROM revenue_distribution_parts_kwh;');
//        DB::statement('INSERT xxx_revenue_distribution_kwh SELECT * FROM revenue_distribution_kwh;');
//        DB::statement('INSERT xxx_revenue_parts_kwh SELECT * FROM revenue_parts_kwh;');
//        DB::statement('INSERT xxx_revenues_kwh SELECT * FROM revenues_kwh;');

        $conversion2021Ozon = DB::table('xxx_conversion2021_ozon')->where('done', false)->get();
        foreach($conversion2021Ozon as $conversion2021OzonToDo) {
//            DB::statement('DELETE FROM revenue_values_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('DELETE FROM revenue_distribution_values_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('DELETE FROM revenue_distribution_parts_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('DELETE FROM revenue_distribution_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('DELETE FROM revenue_parts_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('DELETE FROM revenues_kwh where id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('INSERT revenues_kwh SELECT * FROM xxx_revenues_kwh where id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('INSERT revenue_parts_kwh SELECT * FROM xxx_revenue_parts_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('INSERT revenue_distribution_kwh SELECT * FROM xxx_revenue_distribution_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('INSERT revenue_distribution_parts_kwh SELECT * FROM xxx_revenue_distribution_parts_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('INSERT revenue_distribution_values_kwh SELECT * FROM xxx_revenue_distribution_values_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');
//            DB::statement('INSERT revenue_values_kwh SELECT * FROM xxx_revenue_values_kwh where revenue_id= ' . $conversion2021OzonToDo->econobis_2021_revenue_id . ';');

            $project = Project::find($conversion2021OzonToDo->econobis_project_id);
            $revenuesKwh = RevenuesKwh::find($conversion2021OzonToDo->econobis_2021_revenue_id);

            if($project && $revenuesKwh){
                DB::table('xxx_conversion2021_ozon')
                    ->where('id', $conversion2021OzonToDo->id)
                    ->update([
                        'original_econobis_2021_revenue_total_processed' => $revenuesKwh->delivered_total_processed,
                        'original_date_interest_bearing_kwh' => $project->date_interest_bearing_kwh,
                        'original_kwh_start_high_next_revenue' => $project->kwh_start_high_next_revenue,
                        'original_kwh_start_low_next_revenue' => $project->kwh_start_low_next_revenue,
                    ]);
            } else {
                Log::error("Geen project en revenuesKwh gevonden!");
                Log::error("econobis_project_id: " . $conversion2021OzonToDo->econobis_project_id);
                Log::error("econobis_2021_revenue_id: " . $conversion2021OzonToDo->econobis_2021_revenue_id);
            }

//            Log::info("Verwerk - project: " . $project->id . " | revenue : " . $revenuesKwh->id);

            $revenuepart2021Kwh = RevenuePartsKwh::where('revenue_id', $revenuesKwh->id)->where('date_end', '2021-12-31')->first();
            if($revenuepart2021Kwh && $revenuepart2021Kwh->confirmed && $revenuepart2021Kwh->status == 'processed'){

//                Log::info("Verwerk - part: " . $revenuepart2021Kwh->id);

                $revenuepart2021Kwh->status = 'in-progress-to-processed';
                $revenuepart2021Kwh->save();

//                $this->newRevenueTotalProcessed = $conversion2021OzonToDo->levering_totaal - $revenuepart2021Kwh->values_kwh_start['kwhStart'];
                $this->newRevenueTotalProcessed = $conversion2021OzonToDo->levering_totaal - $conversion2021OzonToDo->levering_totaal_end_2020;
                $this->oldRevenueTotalProcessed = $revenuesKwh->delivered_total_processed;

//                $valuesKwhData = [
//                    'kwhStart' => $revenuepart2021Kwh->values_kwh_start['kwhStart'],
//                    'kwhStartHigh' => $revenuepart2021Kwh->values_kwh_start['kwhStartHigh'],
//                    'kwhStartLow' => $revenuepart2021Kwh->values_kwh_start['kwhStartLow'],
//                    'kwhEnd' => $conversion2021OzonToDo->levering_totaal,
//                    'kwhEndHigh' => $conversion2021OzonToDo->levering_hoog,
//                    'kwhEndLow' => $conversion2021OzonToDo->levering_laag,
//                ];
                $valuesKwhData = [
                    'kwhStart' => $conversion2021OzonToDo->levering_totaal_end_2020,
                    'kwhStartHigh' => $conversion2021OzonToDo->levering_hoog_end_2020,
                    'kwhStartLow' => $conversion2021OzonToDo->levering_laag_end_2020,
                    'kwhEnd' => $conversion2021OzonToDo->levering_totaal,
                    'kwhEndHigh' => $conversion2021OzonToDo->levering_hoog,
                    'kwhEndLow' => $conversion2021OzonToDo->levering_laag,
                ];
                $this->createOrUpdateRevenueValuesKwh($valuesKwhData, $revenuepart2021Kwh);

                $this->saveParticipantsOfDistributionParts($revenuepart2021Kwh);
                $this->calculateDeliveredKwh($revenuepart2021Kwh);

                $revenuepart2021Kwh->status = 'confirmed';
                $revenuepart2021Kwh->save();

                $project->kwh_start_high_next_revenue =$conversion2021OzonToDo->levering_hoog;
                $project->kwh_start_low_next_revenue = $conversion2021OzonToDo->levering_laag;
                $project->save();

                $this->countingsConceptConfirmedProcessed($revenuepart2021Kwh);
                DB::table('xxx_conversion2021_ozon')
                    ->where('id', $conversion2021OzonToDo->id)
                    ->update([
                        'new_kwh_start_high_next_revenue' => $project->kwh_start_high_next_revenue,
                        'new_kwh_start_low_next_revenue' => $project->kwh_start_low_next_revenue,
                        'done' => true,
                    ]);

            }

        }

        Log::info('Test Conversie project revenues Ozon 2021 verdelingen - klaar');
    }

    protected function createOrUpdateRevenueValuesKwh($valuesKwhData = null, RevenuePartsKwh $revenuePartsKwh): void
    {
//        Log::info("test - createOrUpdateRevenueValuesKwh");
//        Log::info($valuesKwhData);

        if($valuesKwhData != null) {

            $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
            $partDateEnd =  Carbon::parse($revenuePartsKwh->date_end)->format('Y-m-d');
            $dateRegistrationDayAfterEnd = Carbon::parse($revenuePartsKwh->date_end)->addDay()->format('Y-m-d');

            $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $partDateBegin)->first();
            $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_registration', $dateRegistrationDayAfterEnd)->first();

//            Log::info("beginRevenueValuesKwh");
//            Log::info($beginRevenueValuesKwh);
//            Log::info("endRevenueValuesKwh");
//            Log::info($endRevenueValuesKwh);
//            Log::info("BEGIN kwh_start_high: " . $beginRevenueValuesKwh->kwh_start_high);
//            Log::info("END   kwh_start_high: " . $endRevenueValuesKwh->kwh_start_high);

            // Delete bestaande gesimuleerde values kwh
//            Log::info("Delete bestaande concept gesimuleerde values kwh");
            $revenueValuesKwh =  RevenueValuesKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->whereBetween('date_registration', [$partDateBegin, $partDateEnd])->where('is_simulated', true);
            $revenueValuesKwh->delete();

            // Bijwerken of aanmaken start values kwh.
            if ($beginRevenueValuesKwh) {
                $beginRevenueValuesKwh->kwh_start = $valuesKwhData['kwhStart'];
                $beginRevenueValuesKwh->kwh_start_high = $valuesKwhData['kwhStartHigh'];
                $beginRevenueValuesKwh->kwh_start_low = $valuesKwhData['kwhStartLow'];
                $beginRevenueValuesKwh->save();
            }
            // Bijwerken of aanmaken end values kwh (deze plaatsen we in start values kwh 1 dag na einddatum.
            if ($endRevenueValuesKwh) {
                $endRevenueValuesKwh->kwh_start = $valuesKwhData['kwhEnd'];
                $endRevenueValuesKwh->kwh_start_high = $valuesKwhData['kwhEndHigh'];
                $endRevenueValuesKwh->kwh_start_low = $valuesKwhData['kwhEndLow'];
                $endRevenueValuesKwh->save();
            }

            // Opnieuw aanmaken simulated values kwh tussen begin en eind datum.
            $this->createOrUpdateRevenueValuesKwhSimulate($revenuePartsKwh->revenue_id, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd);
        }
    }

    /**
     * @param $revenueDistributionPartsKwh
     */
    protected function createOrUpdateRevenueValuesKwhSimulate($revenueId, $partDateBegin, $partDateEnd, $dateRegistrationDayAfterEnd): void
    {
        $daysOfPeriod = Carbon::parse($dateRegistrationDayAfterEnd)->diffInDays(Carbon::parse($partDateBegin), true);
        $beginRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $partDateBegin)->first();
        $endRevenueValuesKwh = RevenueValuesKwh::where('revenue_id', $revenueId)->where('date_registration', $dateRegistrationDayAfterEnd)->first();

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
            // Als we einddatum bereikt hebben, dan afrondingsverschil op laatste simulatie verwerken.
            if($dateRegistration == $partDateEnd){
                $deliveredTotal = $kwhEnd - $kwhStart;
            } else {
                $deliveredTotal = $deliveredTotalPerDay;
            }
            if($revenueValuesKwh) {
                $revenueValuesKwh->delivered_kwh = $deliveredTotal;
                $revenueValuesKwh->save();
            } else {
                RevenueValuesKwh::create([
                    'revenue_id' => $revenueId,
                    'date_registration' => $dateRegistration,
                    'is_simulated' => true,
                    'kwh_start' => $kwhStart,
                    'kwh_start_high' => $kwhStartHigh,
                    'kwh_start_low' => $kwhStartLow,
                    'status' => 'confirmed',
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

        $partDateBegin = Carbon::parse($revenuePartsKwh->date_begin)->format('Y-m-d');
        $project = $revenuePartsKwh->revenuesKwh->project;
        $participants = $project->participantsProject;
        foreach ($participants as $participant) {

            $participantDateTerminated = Carbon::parse($participant->date_terminated)->format('Y-m-d');
            if ($participantDateTerminated != null && $participantDateTerminated < $partDateBegin ) {
                Log::error("Revenue: " . $revenuePartsKwh->revenuesKwh->id . " | participant: " . $participant->id . " voor 2021 beeindigd, we doen hier niets meer mee ");
                continue;
            }

            $contact = Contact::find($participant->contact_id);

            // If participant already is added to project revenue distribution then skip
            if(RevenueDistributionKwh::where('revenue_id', $revenuePartsKwh->revenuesKwh->id)->where('participation_id', $participant->id)->exists()) {
                Log::error("Revenue: " . $revenuePartsKwh->revenuesKwh->id . " | participant: " . $participant->id . " bestaat al, we doen hier niets meer mee ");
                continue;
            } else {
//                Log::info("Revenue: " . $revenuePartsKwh->revenuesKwh->id . " | participant: " . $participant->id . " NIEUW! ");

                $distributionKwh = new RevenueDistributionKwh();
                $distributionKwh->revenue_id = $revenuePartsKwh->revenuesKwh->id;
                $distributionKwh->participation_id = $participant->id;
                $distributionKwh->contact_id = $contact->id;
            }

            $distributionKwh->status = 'in-progress-to-processed';

            if($participant->address){
                $participantAddress = $participant->address;
            }else{
                $participantAddress = $participant->contact->primaryAddress;
            }

            if ($participantAddress) {
                $distributionKwh->street = $participantAddress->street;
                $distributionKwh->street_number = $participantAddress->number;
                $distributionKwh->street_number_addition = $participantAddress->addition;
                $distributionKwh->address = $participantAddress->present()->streetAndNumber();
                $distributionKwh->postal_code = $participantAddress->postal_code;
                $distributionKwh->city = $participantAddress->city;
                $distributionKwh->country = $participantAddress->country_id ? $participantAddress->country->name : '';
                $distributionKwh->energy_supplier_ean_electricity = $participantAddress->ean_electricity;
            } else {
                $distributionKwh->street = '';
                $distributionKwh->street_number = 0;
                $distributionKwh->street_number_addition = '';
                $distributionKwh->address = '';
                $distributionKwh->postal_code = '';
                $distributionKwh->city = '';
                $distributionKwh->country = '';
                $distributionKwh->energy_supplier_ean_electricity = '';
            }

            list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantity($distributionKwh);
            if($quantityOfParticipationsAtStart != 0 || $quantityOfParticipations != 0){
                $distributionKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
                $distributionKwh->participations_quantity = $quantityOfParticipations;
                $distributionKwh->save();

                $this->saveDistributionPartsKwh($revenuePartsKwh, $distributionKwh);
            }
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
//            $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('parts_id', $revenuePartsKwh->id)->where('distribution_id', $distributionKwh->id)->first();
            Log::error("Hier zouden we niet moeten komen !!!!!!!!!!");
        } else {
            $distributionPartsKwh = new RevenueDistributionPartsKwh();
            $distributionPartsKwh->revenue_id = $revenuePartsKwh->revenue_id;
            $distributionPartsKwh->parts_id = $revenuePartsKwh->id;
            $distributionPartsKwh->distribution_id = $distributionKwh->id;
            $distributionPartsKwh->status = 'in-progress-to-processed';
        }
        $distributionPartsKwh->save();

        $dateBeginRevenues = Carbon::parse($revenuePartsKwh->revenuesKwh->date_begin)->format('Y-m-d');
        list($quantityOfParticipationsAtStart, $quantityOfParticipations) = $this->determineParticipationsQuantityPart($dateBeginRevenues, $partDateBegin, $partDateEnd, $distributionPartsKwh);
        $distributionPartsKwh->participations_quantity_at_start = $quantityOfParticipationsAtStart;
        $distributionPartsKwh->participations_quantity = $quantityOfParticipations;

        $distributionPartsKwh->distributionKwh->distributionValuesKwh()->where('parts_id', $revenuePartsKwh->id)->whereIn('status', ['in-progress-to-processed'])->delete();
        $this->saveDistributionValuesKwh($partDateBegin, $partDateEnd, $distributionPartsKwh);

        $distributionPartsKwh->delivered_kwh = 0;
        $distributionPartsKwh->es_id = $addressEnergySupplier ? $addressEnergySupplier->energy_supplier_id : null;
        $distributionPartsKwh->energy_supplier_name = $addressEnergySupplier ? $addressEnergySupplier->energySupplier->name : null;
        $distributionPartsKwh->energy_supplier_number = $addressEnergySupplier ? $addressEnergySupplier->es_number: null;

        $distributionPartsKwh->is_visible = empty($distributionPartsKwh->remarks) ? false : true;
        $distributionPartsKwh->save();
    }

    /**
     * @param RevenueDistributionKwh $distributionKwh
     * @return int[]
     */
    protected function determineParticipationsQuantity(RevenueDistributionKwh $distributionKwh): array
    {

        $quantityOfParticipationsAtStart = 0;
        $quantityOfParticipations = 0;
        $dateBeginFromRegister = Carbon::parse($distributionKwh->participation->date_register)->format('Y-m-d');
        $dateBeginRevenuesKwh = Carbon::parse($distributionKwh->revenuesKwh->date_begin)->format('Y-m-d');
        $dateEndRevenuesKwh = Carbon::parse($distributionKwh->revenuesKwh->date_end)->format('Y-m-d');
        $mutations = $distributionKwh->participation->mutationsDefinitiveForKwhPeriod;

//        if($distributionKwh->participation_id == 327){
//            Log::info("Check quantity participant id : " . $distributionKwh->participation_id);
//            Log::info("aantal mutation : " . $mutations->count());
//            Log::info("dateBeginFromRegister : " . $dateBeginFromRegister);
//            Log::info("dateBeginRevenuesKwh : " . $dateBeginRevenuesKwh);
//        }
        foreach ($mutations as $mutation) {
//            if($distributionKwh->participation_id == 327){
//                Log::info("mutation->quantity : " . $mutation->quantity);
//                Log::info("mutation->date_entry : " . $mutation->date_entry);
//            }
            if ($mutation->date_entry >= $dateBeginFromRegister && $mutation->date_entry < $dateBeginRevenuesKwh) {
                $quantityOfParticipationsAtStart += $mutation->quantity;
            }
            if ($mutation->date_entry >= $dateBeginFromRegister && $mutation->date_entry <= $dateEndRevenuesKwh) {
                $quantityOfParticipations += $mutation->quantity;
            }
        }
//        if($distributionKwh->participation_id == 327){
//            Log::info("quantityOfParticipationsAtStart : " . $quantityOfParticipationsAtStart);
//            Log::info("quantityOfParticipations : " . $quantityOfParticipations);
//        }

        return array($quantityOfParticipationsAtStart, $quantityOfParticipations);
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
            if ($mutation->date_entry >= $dateBeginRevenues && $mutation->date_entry < $partDateBegin) {
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
        $participationsQuantity = $distributionPartsKwh->participations_quantity_at_start;

        $mutations = $distributionPartsKwh->distributionKwh->participation->mutationsDefinitiveForKwhPeriod->whereBetween('date_entry', [$partDateBegin, $partDateEnd]);
        $dateBegin = Carbon::parse($partDateBegin);  // dateBegin = 01-06-2024
        $dateEnd = Carbon::parse($partDateEnd);      // dateEnd   = 10-06-2024
        foreach ($mutations as $mutation) {
            $dateEndMutation = Carbon::parse($mutation->date_entry)->subDay(); // dateEnd   = 05-06-2024

            $dateEndForPeriod = clone $dateEndMutation;
            $dateEndForPeriod->endOfDay();
            $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin, true);
            if($dateBegin->format('Y-m-d') <= $dateEndMutation->format('Y-m-d')) {
                RevenueDistributionValuesKwh::updateOrCreate(
                    [
                        'date_begin' => $dateBegin->format('Y-m-d'),
                        'date_end' => $dateEndMutation->format('Y-m-d'),
                        'distribution_id' => $distributionPartsKwh->distribution_id,
                        'revenue_id' => $distributionPartsKwh->revenue_id,
                        'parts_id' => $distributionPartsKwh->parts_id,
                        'status' => 'in-progress-to-processed',
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
        $daysOfPeriod = $dateEndForPeriod->addDay()->diffInDays($dateBegin, true);

        RevenueDistributionValuesKwh::create(
            [
                'date_begin' => $dateBegin->format('Y-m-d'),
                'date_end' => $dateEnd->format('Y-m-d'),
                'distribution_id' => $distributionPartsKwh->distribution_id,
                'revenue_id' => $distributionPartsKwh->revenue_id,
                'parts_id' => $distributionPartsKwh->parts_id,
                'status' => 'in-progress-to-processed',
                'days_of_period' => $daysOfPeriod,
                'participations_quantity' => $participationsQuantity,
                'quantity_multiply_by_days' => $participationsQuantity * $daysOfPeriod,
                'delivered_kwh' => 0
            ]);

    }

    protected function calculateDeliveredKwh(RevenuePartsKwh $revenuePartKwh)
    {
        $revenueId = $revenuePartKwh->revenue_id;
        $partsId = $revenuePartKwh->id;

        $totalSumOfParticipationsAndDaysToDo = $revenuePartKwh->distributionValuesKwh()->where('status', 'in-progress-to-processed')->sum('quantity_multiply_by_days');
        $totalDeliveredKwhOld = $this->oldRevenueTotalProcessed;
        $totalDeliveredKwhNew = $this->newRevenueTotalProcessed;
        $totalDeliveredKwhToDivide = $totalDeliveredKwhNew - $totalDeliveredKwhOld;

        $distributionValuesKwh = $revenuePartKwh->distributionValuesKwh->where('status', 'in-progress-to-processed');
        foreach ($distributionValuesKwh as $distributionValuesKwhToDo) {
//            if($distributionValuesKwhToDo->distributionKwh->participation_id == 327){
//                Log::info("Check verdeling participant id : " . $distributionValuesKwhToDo->distributionKwh->participation_id);
//            }

            // delivered_kwh = (totaal delivered to divide / $totalSumOfParticipationsAndDaysToDo) * quantity_multiply_by_days
            if ($totalSumOfParticipationsAndDaysToDo != 0) {
                $delivered_kwh = round(($totalDeliveredKwhToDivide / $totalSumOfParticipationsAndDaysToDo) * $distributionValuesKwhToDo->quantity_multiply_by_days, 6);
            } else {
                $delivered_kwh = 0;
            }
            $distributionValuesKwhToDo->delivered_kwh = $delivered_kwh;
            $distributionValuesKwhToDo->status = 'confirmed';
            $distributionValuesKwhToDo->save();
        }

        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenueId)->where('parts_id', $partsId)->where('status', 'in-progress-to-processed')->get();
        foreach ($distributionPartsKwh as $distributionPartKwh) {
            $totalDeliveredKwh = RevenueDistributionValuesKwh::where('revenue_id', $revenueId)->where('distribution_id', $distributionPartKwh->distribution_id)->where('parts_id', $partsId)->sum('delivered_kwh');
            $distributionPartKwh->delivered_kwh = $totalDeliveredKwh;
            $distributionPartKwh->status = 'confirmed';
            $distributionPartKwh->save();
        }
    }

    protected function countingsConceptConfirmedProcessed(RevenuePartsKwh $revenuePartKwh)
    {
        $distributionsKwh = $revenuePartKwh->revenuesKwh->distributionKwh->where('status', 'in-progress-to-processed');
//        Log::info("aantal distributionsKwh : " . $distributionsKwh->count());
        foreach ($distributionsKwh as $distributionKwh) {
            $distributionKwh->delivered_total_concept = $distributionKwh->distributionValuesKwh->where('status', 'concept')->sum('delivered_kwh');
            $distributionKwh->delivered_total_confirmed = $distributionKwh->distributionValuesKwh->where('status', 'confirmed')->sum('delivered_kwh');
            $distributionKwh->delivered_total_processed = $distributionKwh->distributionValuesKwh->where('status', 'processed')->sum('delivered_kwh');
            $distributionKwh->status = 'confirmed';
            $distributionKwh->save();
        }
        $distributionPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartKwh->revenue_id)->where('parts_id', $revenuePartKwh->id)->get();
        $revenuePartKwh->delivered_total_concept = $distributionPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $revenuePartKwh->delivered_total_confirmed = $distributionPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $revenuePartKwh->delivered_total_processed = $distributionPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $revenuePartKwh->status = 'confirmed';
        $revenuePartKwh->save();

        $distributionAllPartsKwh = RevenueDistributionPartsKwh::where('revenue_id', $revenuePartKwh->revenue_id)->get();
        $revenuePartKwh->revenuesKwh->delivered_total_concept = $distributionAllPartsKwh->where('status', 'concept')->sum('delivered_kwh');
        $revenuePartKwh->revenuesKwh->delivered_total_confirmed = $distributionAllPartsKwh->where('status', 'confirmed')->sum('delivered_kwh');
        $revenuePartKwh->revenuesKwh->delivered_total_processed = $distributionAllPartsKwh->where('status', 'processed')->sum('delivered_kwh');
        $revenuePartKwh->revenuesKwh->save();
    }


}
