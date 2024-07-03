<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\Revenue;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Jobs\JobsLog;
use App\Eco\Project\ProjectRevenueDistribution;
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
    private $distributionFullName;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $showOnPortal;
    private $userId;
    private Email $email;

    public function __construct($distributionId, $subject, $documentTemplateId, $emailTemplateId, $showOnPortal, $userId, $email)
    {
        $this->distributionId = $distributionId;
        $distribution = ProjectRevenueDistribution::find($distributionId);
        $this->distributionFullName = "****";
        if($distribution && $distribution->contact){
            $this->distributionFullName = $distribution->contact->full_name;
        }
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->showOnPortal = $showOnPortal;
        $this->userId = $userId;
        $this->email = $email;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start opbrengstverdeling deelnemer '.$this->distributionFullName.' ('.$distributionId.') rapportage.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = 'revenue';
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
            ($this->documentTemplateId ? DocumentTemplate::find($this->documentTemplateId) : null),
            EmailTemplate::find($this->emailTemplateId),
            $this->showOnPortal,
        );

        if($result && isset($result['messages']))
        {
            foreach ($result['messages'] as $message) {
                $value = 'Fout bij rapportage deelnemer '.$this->distributionFullName.' ('.$this->distributionId.'): '.$message;
                $jobLog = new JobsLog();
                $jobLog->value = $value;
                $jobLog->user_id = $this->userId;
                $jobLog->job_category_id = 'revenue';
                $jobLog->save();
            }
        }else{
            $value = 'Opbrengstverdeling deelnemer '.$this->distributionFullName.' ('.$this->distributionId.') rapportage gemaakt.';
            $jobLog = new JobsLog();
            $jobLog->value = $value;
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'revenue';
            $jobLog->save();

            /**
             * Gekoppelde email bijwerken voor weergave in verzonden items.
             */
            $distribution = ProjectRevenueDistribution::find($this->distributionId);
            $emailAddress = optional(optional($distribution)->contact)->primaryEmailAddress;
            if($emailAddress){
                $this->email->contacts()->syncWithoutDetaching($emailAddress->contact_id);
                $this->email->to = array_unique(array_merge($this->email->to, [$emailAddress->email]));
                $this->email->save();
            }
        }
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'revenue';
        $jobLog->save();

        Log::error('Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage mislukt: ' . $exception->getMessage());
    }
}