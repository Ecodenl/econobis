<?php

namespace App\Console\Commands;

use App\Eco\Cooperation\Cooperation;
use App\Helpers\Laposta\LapostaHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class processStateAllMembersLaposta extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'laposta:processStateAllMembersLaposta';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "State alle relaties uit Laposta ophalen en deze bijwerken bij contactgroep contacten.";

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
        $cooperation = Cooperation::first();
        if($cooperation->use_laposta) {
            $lapostaHelper = new LapostaHelper();
            $lapostaHelper->processStateAllMembersLaposta();
        }

        Log::info("State laposta relatie in Econobis contacten bijgewerkt.");
    }
}
