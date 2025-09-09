<?php

namespace App\Console\Commands;

use App\Helpers\CleanupItem\CleanupItemHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class updateCleanupItems extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:cleanupItems';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "cleanup item aantallen herberekenen.";

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
        $cleanupItemHelper = new CleanupItemHelper();
        $cleanupItemHelper->updateAmountsAll();
    }
}
