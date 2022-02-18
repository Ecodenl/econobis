<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\RevenueKwh;

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

class ProcessRevenuesKwh implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $distributionIds;
    private $datePayout;
    private $userId;

    public function __construct($distributionIds, $datePayout, $userId)
    {
        $this->distributionIds = $distributionIds;
        $this->datePayout = $datePayout;
        $this->userId = $userId;

        $jobLog = new JobsLog();
        $jobLog->value = "Start Opbrengst Kwh verdelen.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $revenuesKwhController = new RevenuesKwhController();
        //process revenues kwh
        $revenuesKwhController->processRevenuesKwhJob(RevenueDistributionKwh::whereIn('id', $this->distributionIds)->get(), $this->datePayout);

        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verdelen verwerkt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Exception $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verdelen mislukt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Opbrengst Kwh verdelen mislukt:" . $exception->getMessage());
    }
}