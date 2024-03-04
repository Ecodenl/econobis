<?php

namespace App\Console\Commands\RecoverScripts;

use App\Eco\RevenuesKwh\RevenuesKwh;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class recountRevenuesKwh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'recover:recountRevenuesKwh {--id=null}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recount revenues Kwh';

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
        if( $this->option('id') == 'null'){
            echo("option id verplicht \n");
            return;
        }
        Log::info('Recount revenues Kwh');
        Log::info('-----------------------------');

        $revenuesKwhId = $this->option('id');
        $revenuesKwh = RevenuesKwh::find($revenuesKwhId);
        if( !$revenuesKwh ){
            echo("RevenuesKwh niet gevonden \n");
            return;
        }
        foreach ($revenuesKwh->partsKwh as $partsKwh) {
            Log::info('runCountingsRevenuesKwh part ' . $partsKwh->id);
            echo("runCountingsRevenuesKwh part " . $partsKwh->id . " \n");
//            $partsKwh->calculator()->runCountingsRevenuesKwh();
        }
        Log::info('Recount revenues Kwh klaar');
        echo("Recount revenues Kwh klaar \n" );

    }

}

