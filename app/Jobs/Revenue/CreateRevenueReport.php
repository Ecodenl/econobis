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

    private $distributionIds;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $userId;

    public function __construct($distributionIds, $subject, $documentTemplateId, $emailTemplateId, $userId)
    {
        $this->distributionIds = $distributionIds;
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start opbrengstverdeling deelnemers rapportage.';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $projectRevenueController = new ProjectRevenueController();

        $projectRevenueController->createParticipantRevenueReport($this->subject,
            $this->distributionIds,
            DocumentTemplate::find($this->documentTemplateId),
            EmailTemplate::find($this->emailTemplateId));

        $jobLog = new JobsLog();
        $jobLog->value = 'Opbrengstverdeling deelnemers rapportage gemaakt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Opbrengstverdeling deelnemers rapportage mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error('Opbrengstverdeling deelnemers rapportage mislukt:' . $exception->getMessage());
    }
}