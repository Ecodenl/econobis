<?php

namespace App\Console\Commands\UitfaserenAlfresco;

use App\Eco\Administration\Administration;
use App\Eco\Schedule\CommandRun;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
class test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'uitfaserenAlfresco:test';

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
        Log::info('test wim');
//        Storage::disk('documents')->put('test.txt', 'Symlink test content');
        echo Storage::disk('documents')->get('test.txt');

    }

}

