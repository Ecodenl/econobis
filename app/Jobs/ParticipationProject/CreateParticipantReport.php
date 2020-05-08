<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\ParticipationProject;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Jobs\JobsCategory;
use App\Eco\Jobs\JobsLog;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\User\User;
use App\Http\Controllers\Api\ParticipationProject\ParticipationProjectController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateParticipantReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $participantId;
    private $participantFullName;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $userId;

    public function __construct($participantId, $subject, $documentTemplateId, $emailTemplateId, $userId)
    {
        $this->participantId = $participantId;
        $participant = ParticipantProject::find($participantId);
        $this->participantFullName = "****";
        if($participant && $participant->contact){
            $this->participantFullName = $participant->contact->full_name;
        }
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start deelnemer '.$this->participantFullName.' ('.$participantId.') rapportage.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = 'participant';
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $participationProjectController = new ParticipationProjectController();

        $result = $participationProjectController->createParticipantProjectReport(
            $this->subject,
            $this->participantId,
            DocumentTemplate::find($this->documentTemplateId),
            EmailTemplate::find($this->emailTemplateId));

        if($result && $result['messages'])
        {
            foreach ($result['messages'] as $message) {
                $value = 'Fout bij rapportage deelnemer '.$this->participantFullName.' ('.$this->participantId.'): '.$message;
                $jobLog = new JobsLog();
                $jobLog->value = $value;
                $jobLog->user_id = $this->userId;
                $jobLog->job_category_id = 'participant';
                $jobLog->save();
            }
        }else{
            $value = 'Deelnemer '.$this->participantFullName.' ('.$this->participantId.') rapportage gemaakt.';
            $jobLog = new JobsLog();
            $jobLog->value = $value;
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'participant';
            $jobLog->save();
        }
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Rapportage deelnemer ('.$this->participantId.') rapportage mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'participant';
        $jobLog->save();

        Log::error('Deelnemers ('.$this->participantId.') rapportage mislukt: ' . $exception->getMessage());
    }
}