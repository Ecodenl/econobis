<?php

namespace App\Console\Commands;

use App\Eco\Address\Address;
use App\Http\Controllers\Api\Address\AddressController;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class createTaskAtEndDateAddress extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'address:createTaskAtEndDateAddress';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Procedure maak taak aan als einddatum adres bereikt is';

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
        $addressController = new AddressController();
        $addressesWithEndDateToday = Address::where('end_date', Carbon::now()->format('Y-m-d'))->get();
        foreach ($addressesWithEndDateToday as $addressWithEndDateToday){
            $addressController->createTaskEndDateAddress($addressWithEndDateToday);
        }

        Log::info('Procedure maak taak aan als einddatum adres bereikt is klaar');
    }
}
