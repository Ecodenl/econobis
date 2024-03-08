<?php

namespace App\Console\Commands\RecoverScripts;

use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\User\User;
use App\Helpers\Project\RevenuesKwhHelper;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class recoverMissingEnergySupplierDataInParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recover:recoverMissingEnergySupplierDataInParts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recover missing parts';

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

        $adminUser = User::where('email', config('app.admin_user.email'))->first();
        if($adminUser){
            Auth::setUser($adminUser);
        }

//        Log::info($this->description);
//        Log::info('-----------------------------');

        $revenuesKwh = RevenuesKwh::all();
        foreach($revenuesKwh as $revenueKwh) {

            // niet verwerkte parts controleren
            $revenuePartsKwh = $revenueKwh->partsKwh
                ->where('status', '!=', 'processed');
            foreach($revenuePartsKwh as $partKwh) {
                $dateBegin = Carbon::parse($partKwh->date_begin)->format('Y-m-d');
                $dateEnd = Carbon::parse($partKwh->date_end)->format('Y-m-d');
                foreach ($revenueKwh->distributionKwh as $distributionKwh) {
                    $dateTerminated = Carbon::parse($distributionKwh->participation->date_terminated)->addDay()->format('Y-m-d');

                    // controleer addressEnergySuppliers als deelnemer niet beeindigd is of als beeindigsdatum na begindatum ligt.
                    if($dateTerminated == null || $dateTerminated > $dateBegin){

                        $addressEnergySuppliers = $distributionKwh->participation->address->addressEnergySuppliers()
                            ->whereIn('energy_supply_type_id', [2, 3])
                            ->where(function ($addressEnergySupplier) use ($dateBegin, $dateEnd) {
                                $addressEnergySupplier
                                    ->where(function ($addressEnergySupplier) use ($dateBegin, $dateEnd) {
                                        $addressEnergySupplier->whereNotNull('member_since')
                                            ->where('member_since', '>', $dateBegin)
                                            ->where('member_since', '<=', $dateEnd);
                                    });
                            })
                            ->get();
                        if ($addressEnergySuppliers->count() > 0) {
                            foreach ($addressEnergySuppliers as $addressEnergySupplier){
//                            Log::info('Geen splitsing deelperiode data gevonden voor switch datum deelnemer: ' . $distributionKwh->participation_id . ' ' . $distributionKwh->contact->full_name);
//                            Log::info('Recover voor addressEnergySupplier Id: ' . $addressEnergySupplier->id);
                                $revenuesKwhHelper = new RevenuesKwhHelper();
                                $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($distributionKwh->participation, $addressEnergySupplier->member_since, $addressEnergySupplier);
                            }

                        }
                    }

                    if ($distributionKwh->participation->date_terminated != null) {
                        $dayAfterTerminated = Carbon::parse($distributionKwh->participation->date_terminated)->addDay()->format('Y-m-d');
                        if ($dayAfterTerminated > $dateBegin and $dayAfterTerminated <= $dateEnd) {
//                            Log::info('Geen splitsing deelperiode data gevonden voor dag na beeindiging deelnemer: ' . $distributionKwh->participation_id . ' ' . $distributionKwh->contact->full_name);
                            $revenuesKwhHelper = new RevenuesKwhHelper();
                            $splitRevenuePartsKwhResponse = $revenuesKwhHelper->checkAndSplitRevenuePartsKwh($distributionKwh->participation, \Illuminate\Support\Carbon::parse($distributionKwh->participation->date_terminated)->addDay(), null);
                        }
                    }
                }
            }
        }
    }

}

