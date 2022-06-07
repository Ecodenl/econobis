<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class setProviderOauthClients extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:setProviderOauthClients';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Provider goedzetten in OauthClients';

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
        DB::table('oauth_clients')->where('id', 2)->update(["provider" => null]);


        Log::info('Provider goedzetten in OauthClients klaar');
    }
}
