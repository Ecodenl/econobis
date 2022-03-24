<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 16:06
 */

namespace App\Jobs\RevenueKwh;

use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\Jobs\JobsLog;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
use App\Eco\RevenuesKwh\RevenuesKwh;
use App\Eco\User\User;
use App\Http\Controllers\Api\Project\RevenuePartsKwhController;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ReportEnergySupplierExcel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $revenuesKwh;
    private $revenuePartsKwh;
    private $upToPartsKwhIds;
    private $distributions;
    private $templateId;
    private $documentName;
    private $counter;
    private $userId;

    public function __construct(
        $documentName,
        $revenuePartsKwh,
        $userId
    ) {
        $this->documentName = $documentName;
        $this->revenuePartsKwh = $revenuePartsKwh;
        $this->revenuesKwh = $revenuePartsKwh->revenuesKwh;
        $this->userId = $userId;

        $this->upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<=', $revenuePartsKwh->date_end)->pluck('id')->toArray();

        $this->revenuesKwh = $revenuePartsKwh->revenuesKwh;
        $this->distributions = $revenuePartsKwh->revenuesKwh->distributionKwh()->whereIn('id', $revenuePartsKwh->distribution_kwh_for_report_energy_supplier)->get();

        if($this->distributions->count() == 0){
            return;
        }

        $partsKwh = RevenuePartsKwh::whereIn('id', $this->upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {
            if ($partKwh->status === 'confirmed') {
                $partKwh->status = 'in-progress-report';
                $partKwh->save();
            }
        }
        foreach ($this->distributions as $distributionKwh) {
            if ($distributionKwh->status === 'concept') {
                $distributionKwh->status = 'in-progress-report-concept';
                $distributionKwh->save();
            }
            if ($distributionKwh->status === 'confirmed') {
                $distributionKwh->status = 'in-progress-report';
                $distributionKwh->save();
            }
        }

        $jobLog = new JobsLog();
        $jobLog->value = "Start Opbrengst Kwh verwerken en rapportage energieleverancier maken.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $userId;
        $jobLog->save();
    }

    public function handle()
    {
        //user voor observer
        Auth::setUser(User::find($this->userId));

        $upToRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $this->revenuePartsKwh->revenue_id)->where('date_end', '<=', $this->revenuePartsKwh->date_end)->get();

        $energySupplierIds = [];
        foreach ($upToRevenuePartsKwh as $partItem){
            $partItemEnergySupplierIds = $partItem->distributionPartsKwh()->whereNull('date_energy_supplier_report')->where('is_visible', 1)->whereNotNull('es_id')->where('delivered_kwh', '!=', 0)->pluck('es_id')->toArray();
            $energySupplierIds = array_merge($partItemEnergySupplierIds, $energySupplierIds);
        }

        $revenuepartsKwhController = new RevenuePartsKwhController();

        $energySupplierIds = array_unique($energySupplierIds);

        foreach ($energySupplierIds as $energySupplierId) {
            $energySupplier = EnergySupplier::find($energySupplierId);

            $revenuepartsKwhController->reportEnergySupplierJob($this->documentName, $this->revenuePartsKwh, $energySupplier, $this->upToPartsKwhIds);
        }

        foreach ($this->distributions as $distributionKwh) {
            if ($distributionKwh->revenuesKwh->partsKwh->where('status', '==', 'new')->count() > 0) {
                $distributionKwh->status = 'concept';
            } else {
                if ($distributionKwh->distributionValuesKwh->where('status', '!=', 'processed')->count() == 0
                    && $distributionKwh->distributionValuesKwh->where('status', '==', 'processed')->count() > 0
                ) {
                    $distributionKwh->status = 'processed';
                } else {
                    if ($distributionKwh->distributionValuesKwh->whereNotIn('status', ['confirmed', 'processed'])->count() == 0
                        && $distributionKwh->distributionValuesKwh->where('status', '==', 'confirmed')->count() > 0
                    ) {
                        $distributionKwh->status = 'confirmed';
                    } else {
                        $distributionKwh->status = 'concept';
                    }
                }
            }
            $distributionKwh->save();
        }
        $partsKwh = RevenuePartsKwh::whereIn('id', $this->upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {

            if ($partKwh->status === 'in-progress-report') {

                if($partKwh->distributionPartsKwh->where('status', '!=', 'processed')->count() == 0
                    && $partKwh->distributionPartsKwh->where('status', '==', 'processed')->count() > 0
                ){
                    $partKwh->status = 'processed';
                }else{
                    $partKwh->status = 'confirmed';
                }
                $partKwh->save();
                $partKwh->calculator()->runCountingsRevenuesKwh();
            }
        }

        // Reload revenuesKwh
        $revenuesKwh = RevenuesKwh::find($this->revenuePartsKwh->revenue_id);
        if($revenuesKwh->distributionKwh->where('status', '!=', 'processed')->count() == 0
            && $revenuesKwh->distributionKwh->where('status', '==', 'processed')->count() > 0
            && $revenuesKwh->partsKwh->where('status', '!=', 'processed')->count() == 0
            && $revenuesKwh->partsKwh->where('status', '==', 'processed')->count() > 0
        ){
            $revenuesKwh->status = 'processed';
            $revenuesKwh->save();
        }

        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verdelen verwerkt en rapportage energieleverancier gemaakt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();
    }

    public function failed($exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verwerken en rapportage energieleverancier maken mislukt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Opbrengst Kwh verwerken en rapportage energieleverancier maken mislukt:" . $exception->getMessage());
    }
}