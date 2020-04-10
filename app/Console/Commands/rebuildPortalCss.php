<?php

namespace App\Console\Commands;

use App\Jobs\Portal\GeneratePortalCss;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class rebuildPortalCss extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'portal:rebuildPortalCss';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maak nieuwe portal css aan';

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
        GeneratePortalCss::dispatch();
        Log::info('Einde Maak nieuwe portal css aan');
    }

}
