<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\RevenueKwh;

use App\Eco\Jobs\JobsLog;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UpdateRevenuePartsKwh implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $revenuePartsKwh;
    private $userId;
    private $projectName;
    private $period;

    public function __construct(RevenuePartsKwh $revenuePartsKwh, $userId)
    {
        $this->revenuePartsKwh = $revenuePartsKwh;
        $this->userId = $userId;

        $project = $this->revenuePartsKwh->revenuesKwh->project;
        $this->projectName = $project ? $project->name : '???';
        $this->period = Carbon::parse($this->revenuePartsKwh->date_begin)->format('d-m-Y') . " t/m " . Carbon::parse($this->revenuePartsKwh->date_end)->format('d-m-Y');

        if ($revenuePartsKwh->status === 'concept') {
            $revenuePartsKwh->status = 'in-progress-update';
            $revenuePartsKwh->save();
        }

        $jobLog = new JobsLog();
        $jobLog->value = "Start Opbrengst Kwh bijwerken voor project " . $this->projectName. " periode " . $this->period . ".";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $this->revenuePartsKwh->calculator()->runRevenuePartsKwh();

        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh bijgewerkt voor project " . $this->projectName. " periode " . $this->period . ".";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh bijwerken mislukt.";
        $jobLog->value = "Opbrengst Kwh bijwerken voor project " . $this->projectName. " periode " . $this->period . " mislukt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Opbrengst Kwh bijwerken voor project " . $this->projectName. " periode " . $this->period . " mislukt: " . $exception->getMessage());
    }
}