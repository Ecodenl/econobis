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
use App\Eco\Invoice\Invoice;
use App\Eco\Jobs\JobsLog;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\User\User;
use App\Helpers\Invoice\InvoiceHelper;
use App\Http\Controllers\Api\PaymentInvoice\PaymentInvoiceController;
use App\Http\Controllers\Api\Project\ProjectRevenueController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreatePaymentInvoices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Email
     */
    private $createReport;
    private $createInvoice;
    private $distributionIds;
    private $subject;
    private $documentTemplateId;
    private $emailTemplateId;
    private $userId;

    public function __construct($createReport, $createInvoice, $distributionIds, $subject, $documentTemplateId, $emailTemplateId, $userId)
    {
        $this->createReport = $createReport;
        $this->createInvoice = $createInvoice;
        $this->distributionIds = $distributionIds;
        $this->subject = $subject;
        $this->documentTemplateId = $documentTemplateId;
        $this->emailTemplateId = $emailTemplateId;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = 'Start uitkering facturen.';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $productionProjectRevenueController = new ProjectRevenueController();
        if($this->createInvoice) {
            //create invoices
            $createdInvoices = $productionProjectRevenueController->createInvoices(ProjectRevenueDistribution::whereIn('id',
                $this->distributionIds)->get());

            if ($createdInvoices) {
                if($this->createReport) {
                    $reportDistributionIds = [];
                    //only send reports to the created ones
                    foreach ($createdInvoices as $createdInvoice) {
                        array_push($reportDistributionIds, $createdInvoice->revenue_distribution_id);
                    }

                    $productionProjectRevenueController->createParticipantRevenueReport($this->subject,
                        $reportDistributionIds,
                        DocumentTemplate::find($this->documentTemplateId),
                        EmailTemplate::find($this->emailTemplateId));

                }
                $paymentInvoiceController = new PaymentInvoiceController();

                $paymentInvoiceController->generateSepaFile(collect($createdInvoices));
            } else {
                $jobLog = new JobsLog();
                $jobLog->value = 'Geen uitkering facturen gemaakt.';
                $jobLog->user_id = $this->userId;
                $jobLog->save();
            }
        }

        elseif (!$this->createInvoice && $this->createReport){
            $productionProjectRevenueController->createParticipantRevenueReport($this->subject,
                $this->distributionIds,
                DocumentTemplate::find($this->documentTemplateId),
                EmailTemplate::find($this->emailTemplateId));
        }

        $jobLog = new JobsLog();
        $jobLog->value = 'Uitkering facturen verwerkt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = 'Uitkering facturen mislukt.';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error('Uitkering facturen mislukt:' . $exception->getMessage());
    }
}