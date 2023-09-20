<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\RevenueKwh;

use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Jobs\JobsCategory;
use App\Eco\Jobs\JobsLog;
use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\User\User;
use App\Http\Controllers\Api\Project\RevenuePartsKwhController;
use Carbon\Carbon;
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

    private $distributionPartsKwhId;
    private $distributionPartsDateBegin;
    private $distributionPartsDateEnd;
    private $distributionId;
    private $distributionFullName;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $showOnPortal;
    private $userId;
    private Email $email;

    public function __construct($distributionPartsKwhId, $subject, $documentTemplateId, $emailTemplateId, $showOnPortal, $userId, Email $email)
    {
        $this->distributionPartsKwhId = $distributionPartsKwhId;
        $distributionPartsKwh = RevenueDistributionPartsKwh::find($distributionPartsKwhId);
        $distribution =$distributionPartsKwh->distributionKwh;
        $this->distributionId = $distribution->id;
        $this->distributionFullName = "****";
        if($distribution && $distribution->contact){
            $this->distributionFullName = $distribution->contact->full_name;
        }
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->showOnPortal = $showOnPortal;
        $this->userId = $userId;

        $this->distributionPartsDateBegin = Carbon::parse($distributionPartsKwh->date_begin_from_till_visible)->format('d-m-Y');
        $this->distributionPartsDateEnd = Carbon::parse($distributionPartsKwh->partsKwh->date_end)->format('d-m-Y');

        $jobLog = new JobsLog();
        $jobLog->value = 'Start opbrengstverdeling deelnemer '.$this->distributionFullName.' (' . $this->distributionId . ') rapportage, periode ' . $this->distributionPartsDateBegin  . ' t/m ' . $this->distributionPartsDateEnd . '.';
        $jobLog->user_id = $userId;
        $jobLog->job_category_id = 'revenue';
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $revenuePartsKwhController = new RevenuePartsKwhController();

        $result = $revenuePartsKwhController->createParticipantRevenuePartsReport(
            $this->subject,
            $this->distributionPartsKwhId,
            $this->distributionId,
            DocumentTemplate::find($this->documentTemplateId),
            EmailTemplate::find($this->emailTemplateId),
            $this->showOnPortal,
        );

        if($result && $result['messages'])
        {
            foreach ($result['messages'] as $message) {
                $value = 'Fout bij rapportage deelnemer '.$this->distributionFullName.' ('.$this->distributionId.') ' . $this->distributionPartsDateBegin  . ' t/m ' . $this->distributionPartsDateEnd . ': '.$message;
                $jobLog = new JobsLog();
                $jobLog->value = $value;
                $jobLog->user_id = $this->userId;
                $jobLog->job_category_id = 'revenue';
                $jobLog->save();
            }
        }else{
            $value = 'Opbrengstverdeling deelnemer '.$this->distributionFullName.' ('.$this->distributionId.') ' . $this->distributionPartsDateBegin  . ' t/m ' . $this->distributionPartsDateEnd . ' rapportage gemaakt.';
            $jobLog = new JobsLog();
            $jobLog->value = $value;
            $jobLog->user_id = $this->userId;
            $jobLog->job_category_id = 'revenue';
            $jobLog->save();

            /**
             * Gekoppelde email bijwerken voor weergave in verzonden items.
             */
            $distributionKwh = RevenueDistributionKwh::find($this->distributionId);
            $emailAddress = optional(optional($distributionKwh)->contact)->primaryEmailAddress;
            if($emailAddress){
                $this->email->contacts()->attach($emailAddress->contact_id);
                $this->email->to = array_merge($this->email->to, [$emailAddress->id]);
                $this->email->save();
            }
        }
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Opbrengstverdeling deelnemer ('.$this->distributionId.') ' . $this->distributionPartsDateBegin  . ' t/m ' . $this->distributionPartsDateEnd . ' rapportage mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->job_category_id = 'revenue';
        $jobLog->save();

        Log::error('Opbrengstverdeling deelnemer ('.$this->distributionId.') ' . $this->distributionPartsDateBegin  . ' t/m ' . $this->distributionPartsDateEnd . ' rapportage mislukt: ' . $exception->getMessage());
    }
}