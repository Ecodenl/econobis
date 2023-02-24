<?php

namespace App\Console\Commands;

use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class conversionProjectRevenueDistribution extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionProjectRevenueDistribution';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie project revenue distribution';

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
        Auth::setUser(User::find(1));
        foreach(ProjectRevenueDistribution::all() as $projectRevenueDistribution) {

            if($projectRevenueDistribution->revenue->confirmed) {
                $projectRevenueDistribution->status = 'processed';
            }else{
                $projectRevenueDistribution->status = 'concept';
            }
            $projectRevenueDistribution->save();
        }
    dd('klaar');
    }
}
