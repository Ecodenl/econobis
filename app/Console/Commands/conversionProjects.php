<?php

namespace App\Console\Commands;

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectValueCourse;
use App\Eco\User\User;
use App\Http\Controllers\Api\ParticipantMutation\ParticipantMutationController;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class conversionProjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:conversionProjects';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Conversie projecten';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        Auth::setUser(User::find(1));
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        foreach(Project::all() as $project) {
            if($project->projectValueCourses->isNotEmpty()) continue;

            if($project->participation_worth > 0) {
                if($project->projectType->code_ref != 'loan') {
                    $projectValueCourse = new ProjectValueCourse();

                    $projectValueCourse->fill([
                        'project_id' => $project->id,
                        'date' => Carbon::now(),
                        'book_worth' => $project->participation_worth,
                        'active' => true,
                    ]);

                    $projectValueCourse->save();
                }
            }
        }
    dd('klaar');
    }
}
