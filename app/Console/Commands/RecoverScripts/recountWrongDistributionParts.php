<?php

namespace App\Console\Commands\RecoverScripts;

use App\Eco\RevenuesKwh\RevenuesKwh;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class recountWrongDistributionParts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recover:recountWrongDistributionParts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recount wrong distribution parts';

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

        Log::info('Recount wrong distribution parts');
        Log::info('-----------------------------');

//        Loop door tabel _wrong_distribution_parts_data.
        $wrongDistributionPartsRevenues = DB::table('_wrong_distribution_parts_data')->pluck('revenue_id')->toArray();
        $wrongDistributionPartsRevenuesIds = array_unique($wrongDistributionPartsRevenues);
        foreach ($wrongDistributionPartsRevenuesIds as $wrongDistributionPartsRevenuesId) {
            $revenuesKwh = RevenuesKwh::find($wrongDistributionPartsRevenuesId);
            foreach ($revenuesKwh->partsKwh as $partsKwh) {
                Log::info('runCountingsRevenuesKwh ' . $wrongDistributionPartsRevenuesId . '/' . $partsKwh->id);
                $partsKwh->calculator()->runCountingsRevenuesKwh();
            }
        }

    }

}

