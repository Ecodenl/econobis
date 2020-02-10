<?php

namespace App\Console\Commands;

use App\Eco\Project\ProjectRevenue;
use App\Eco\User\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;

class conversionProjectRevenues extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionProjectRevenues';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie project revenues';

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
        foreach(ProjectRevenue::all() as $projectRevenue) {
            if($projectRevenue->project)
            {
                $projectType = $projectRevenue->project->projectType->code_ref;
                if($projectType == 'obligation'){
                    $waardeTotaal = $projectRevenue->project->total_participations * $projectRevenue->project->participation_worth;
                    if($waardeTotaal <> 0 && $projectRevenue->revenue <> 0)
                    {
                        $factor = $projectRevenue->revenue / $waardeTotaal;
                        $pay_percentage_old = $projectRevenue->pay_percentage;
                        $projectRevenue->pay_percentage = round($factor*100, 2);
                        print_r("Id: " . $projectRevenue->id . " - Percentage oud: " . $pay_percentage_old . " - Percentage new: " . $projectRevenue->pay_percentage . "\n");
                        $projectRevenue->save();
                    }
                }
            }
        }
    dd('klaar');
    }
}
