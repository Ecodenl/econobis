<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\FinancialOverview;


use App\Eco\Email\Email;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Http\Controllers\Api\FinancialOverview\FinancialOverviewParticipantProjectController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateFinancialOverviewParticipantProjects implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $financialOverviewProject;
    private $userId;

    public function __construct(FinancialOverviewProject $financialOverviewProject, $userId)
    {
        $this->financialOverviewProject = $financialOverviewProject;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = "Start aanmaken project (" . ($financialOverviewProject->project->code) . ") voor waardestaat (" . ($financialOverviewProject->financialOverview->description) . ").";
        $jobLog->job_category_id = 'create-financial-overview-project';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));
        $financialOverviewParticipantProjectController = new FinancialOverviewParticipantProjectController();
        $financialOverviewParticipantProjectController->createParticipantProjectsForFinancialOverview($this->financialOverviewProject);

        $this->financialOverviewProject->status_id = 'concept';
        $this->financialOverviewProject->save();

        $jobLog = new JobsLog();
        $jobLog->value = "Project (" . ($this->financialOverviewProject->project->code) . ") toegevoegd aan waardestaat (" . ($this->financialOverviewProject->financialOverview->description) . ").";
        $jobLog->job_category_id = 'create-financial-overview-project';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        $financialOverviewProjectsToGo = FinancialOverviewProject::where('financial_overview_id', $this->financialOverviewProject->financialOverview->id)
            ->where('status_id', 'in-progress')->count();

//        Log::info("Projecten nog te verwerken: " . $financialOverviewProjectsToGo);

        if($financialOverviewProjectsToGo == 0){
            $this->financialOverviewProject->financialOverview->status_id = 'concept';
            $this->financialOverviewProject->financialOverview->save();

        }

    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Toevoegen project (" . ($this->financialOverviewProject->project->code) . ") aan waardestaat (" . ($this->financialOverviewProject->financialOverview->description) . ") mislukt.";
        $jobLog->job_category_id = 'create-financial-overview-project';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Waardestaat maken project mislukt.: " . $exception->getMessage());
    }
}