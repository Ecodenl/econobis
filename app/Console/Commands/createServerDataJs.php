<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class createServerDataJs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:createServerDataJs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creëer een server-data.js';

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
        $oauthClient = DB::table('oauth_clients')->where('id', 2)->first();
        $xml = view('portal.server-data', [
            'internalPortalUrl' => config('app.url') . '/portal',
            'secretKey' => $oauthClient->secret
        ])->render();

        try{
            if(config('app.env') == "local")
            {
                Storage::disk('public_portal_local')->put('js/server-data.js', $xml);
            }else{
                Storage::disk('public_portal')->put('js/server-data.js', $xml);
            }
        }catch (\Exception $exception){
            Log::error('Opslaan server-data.js mislukt : ' . $exception->getMessage());
        }

        Log::info('Creëer een server-data.js klaar');
    }
}
