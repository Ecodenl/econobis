<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Revenue;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Jobs\JobsCategory;
use App\Eco\Jobs\JobsLog;
use App\Eco\User\User;
use App\Http\Controllers\Api\Project\ProjectRevenueController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateRevenueReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $distributionId;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $userId;
    private $jobCategoryId;

    public function __construct($distributionId, $subject, $documentTemplateId, $emailTemplateId, $userId)
    {
        $this->distributionId = $distributionId;
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->userId = $userId;

        $this->jobCategoryId = JobsCategory::where('Opbrengstverdeling rapportage')->first();

        $jobLog = new JobsLog();
        $jobLog->value = 'Start opbrengstverdeling deelnemer ('.$distributionId.') rapportage.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = isset($this->jobCategoryId) ? $this->jobCategoryId->id : "";
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $projectRevenueController = new ProjectRevenueController();

        $result = $projectRevenueController->createParticipantRevenueReport(
            $this->subject,
            $this->distributionId,
            DocumentTemplate::find($this->documentTemplateId),
            EmailTemplate::find($this->emailTemplateId));

        if($result && $result['messages'])
        {
            $value = 'Fout bij rapportage deelnemer ('.$this->distributionId.'): '.implode(" ",$result['messages']);
        }else{
            $value = 'Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage gemaakt.';
        }
        $jobLog = new JobsLog();
        $jobLog->value = $value;
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = isset($this->jobCategoryId) ? $this->jobCategoryId->id : "";
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = isset($this->jobCategoryId) ? $this->jobCategoryId->id : "";
        $jobLog->save();

        Log::error('Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage mislukt: ' . $exception->getMessage());
    }
}