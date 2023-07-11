<?php

namespace App\Console\Commands;

use App\Eco\Administration\Administration;
use App\Eco\User\User;
use App\Helpers\Twinfield\TwinfieldCustomerHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class processTwinfieldCustomer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoice:processTwinfieldCustomer';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Customers in Twinfield aanmaken.";

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

        foreach (Administration::where('twinfield_is_valid', 1)->where('uses_twinfield', 1)->get() as $administration) {
            $twinfieldCustomerHelper = new TwinfieldCustomerHelper($administration, null);
            $twinfieldCustomerHelper->processTwinfieldCustomer();
        }

        Log::info("Contacten Econobis in Twinfield bijgewerkt.");
    }
}
