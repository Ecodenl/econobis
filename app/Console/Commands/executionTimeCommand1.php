<?php

namespace App\Console\Commands;

use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Eco\ContactGroup\ContactGroup;

class executionTimeCommand1 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:executionTimeCommand1';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'execution time 9.30';

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
        Log::info($this->description);
    }
}
