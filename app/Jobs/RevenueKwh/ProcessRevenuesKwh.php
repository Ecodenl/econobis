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
use App\Eco\RevenuesKwh\RevenuePartsKwh;
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
    private $dateConfirmed;
    private $datePayout;
    private $upToPartsKwhIds;
    private $userId;

    public function __construct($distributionIds, $dateConfirmed, $datePayout, $upToPartsKwhIds, $userId)
    {
        $this->distributionIds = $distributionIds;
        $this->dateConfirmed = $dateConfirmed;
        $this->datePayout = $datePayout;
        $this->upToPartsKwhIds = $upToPartsKwhIds;
        $this->userId = $userId;

        $partsKwh = RevenuePartsKwh::whereIn('id', $upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {
            if ($partKwh->status === 'concept' || $partKwh->status === 'confirmed') {
                $partKwh->status = 'in-progress-process';
                $partKwh->save();
            }
        }
        $distributionsKwh = RevenueDistributionKwh::whereIn('id', $distributionIds)->get();
        foreach ($distributionsKwh as $distributionKwh) {
            if ($distributionKwh->status === 'concept') {
                $distributionKwh->status = 'in-progress-process-concept';
                $distributionKwh->save();
            }
            if ($distributionKwh->status === 'confirmed') {
                $distributionKwh->status = 'in-progress-process';
                $distributionKwh->save();
            }

            $distributionsPartsKwh = $distributionKwh->distributionPartsKwh->whereIn('parts_id', $upToPartsKwhIds);
            foreach($distributionsPartsKwh as $distributionPartsKwh) {
                if ($distributionPartsKwh->status === 'concept' || $distributionPartsKwh->status === 'confirmed') {
                    $distributionPartsKwh->status = 'in-progress-process';
                    $distributionPartsKwh->save();
                }
            }
            $distributionsValuesKwh = $distributionKwh->distributionValuesKwh->whereIn('parts_id', $upToPartsKwhIds);
            foreach($distributionsValuesKwh as $distributionValuesKwh) {
                if ($distributionValuesKwh->status === 'concept' || $distributionValuesKwh->status === 'confirmed') {
                    $distributionValuesKwh->status = 'in-progress-process';
                    $distributionValuesKwh->save();
                }
            }
        }

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
        $revenuesKwhController->processRevenuesKwhJob(RevenueDistributionKwh::whereIn('id', $this->distributionIds)->get(), $this->dateConfirmed, $this->datePayout, $this->upToPartsKwhIds);

        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verdelen verwerkt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed($exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verdelen mislukt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Opbrengst Kwh verdelen mislukt:" . $exception->getMessage());
    }
}