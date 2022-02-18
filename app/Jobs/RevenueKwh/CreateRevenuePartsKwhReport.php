<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\RevenueKwh;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Jobs\JobsCategory;
use App\Eco\Jobs\JobsLog;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\User\User;
use App\Http\Controllers\Api\Project\RevenuesKwhController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateRevenuePartsKwhReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $distributionId;
    private $distributionFullName;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $userId;

    public function __construct($distributionId, $subject, $documentTemplateId, $emailTemplateId, $userId)
    {
        $this->distributionId = $distributionId;
        $distribution = RevenueDistributionKwh::find($distributionId);
        $this->distributionFullName = "****";
        if($distribution && $distribution->contact){
            $this->distributionFullName = $distribution->contact->full_name;
        }
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->userId = $userId;

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

        $revenuesKwhController = new RevenuesKwhController();

        $result = $revenuesKwhController->createParticipantRevenueReport(
            $this->subject,
            $this->distributionId,
            DocumentTemplate::find($this->documentTemplateId),
            EmailTemplate::find($this->emailTemplateId));

        if($result && $result['messages'])
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
        }
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'revenue';
        $jobLog->save();

        Log::error('Opbrengstverdeling deelnemer ('.$this->distributionId.') rapportage mislukt: ' . $exception->getMessage());
    }
}