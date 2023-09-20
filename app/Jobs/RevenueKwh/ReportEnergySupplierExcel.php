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
use App\Helpers\Project\RevenueDistributionKwhHelper;
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
    private $distributionsForReport;
    private $distributionsSetProcessed;
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

        $revenueDistributionKwhHelper = new RevenueDistributionKwhHelper();

        $this->distributionsForReport = $revenuePartsKwh->revenuesKwh->distributionKwh()->whereIn('id', $revenueDistributionKwhHelper->getDistributionForReportEnergySupplierIds($revenuePartsKwh))->get();
        $distributionsForReportIds = $this->distributionsForReport->pluck('id')->toArray();
        $this->distributionsSetProcessed = $revenuePartsKwh->revenuesKwh
            ->distributionKwh()
            ->whereIn('id', $revenueDistributionKwhHelper->getDistributionSetProcessedEnergySupplierIds($revenuePartsKwh))
            ->whereNotin('id', $distributionsForReportIds)
            ->get();

        if($this->distributionsForReport->count() == 0 && $this->distributionsSetProcessed->count() == 0){
            return;
        }

        $partsKwh = RevenuePartsKwh::whereIn('id', $this->upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {
            if ($partKwh->status === 'confirmed') {
                $partKwh->status = 'in-progress-report';
                $partKwh->save();
            }
        }
        foreach ($this->distributionsForReport as $distributionKwh) {
            if ($distributionKwh->status === 'concept') {
                $distributionKwh->status = 'in-progress-report-concept';
                $distributionKwh->save();
            }
            if ($distributionKwh->status === 'confirmed') {
                $distributionKwh->status = 'in-progress-report';
                $distributionKwh->save();
            }
        }
       foreach ($this->distributionsSetProcessed as $distributionKwh) {
            if ($distributionKwh->status === 'confirmed') {
                $distributionKwh->status = 'in-progress-set-processed';
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

        $upToRevenuePartsKwh = RevenuePartsKwh::where('revenue_id', $this->revenuePartsKwh->revenue_id)->where('date_end', '<=', $this->revenuePartsKwh->date_end)->orderBy('date_begin')->get();
        $createReportEnergySupplierIds = [];
        foreach ($upToRevenuePartsKwh as $partItem){
            $distributionKwhCollectionForCreateReport = $partItem->distributionPartsKwh()->whereNull('date_energy_supplier_report')->where('is_visible', 1)->whereNotNull('es_id')->where('status', '!=', 'processed')->get();
            $partItemEnergySupplierForCreateReportIds = $distributionKwhCollectionForCreateReport->filter(function($model){
                return $model->delivered_kwh_from_till_visible != 0;
            })
                ->pluck('es_id')->toArray();
            $createReportEnergySupplierIds = array_merge($partItemEnergySupplierForCreateReportIds, $createReportEnergySupplierIds);
        }
        $revenuepartsKwhController = new RevenuePartsKwhController();

        $createReportEnergySupplierIds = array_unique($createReportEnergySupplierIds);
        foreach ($createReportEnergySupplierIds as $energySupplierId) {
            $energySupplier = EnergySupplier::find($energySupplierId);
            $revenuepartsKwhController->reportEnergySupplierJob($this->documentName, $this->revenuePartsKwh, $energySupplier, $this->upToPartsKwhIds);
        }

        $setProcessedEnergySupplierIds = [];
        $isLastPart = $this->revenuePartsKwh->date_end && $this->revenuePartsKwh->date_end == $this->revenuePartsKwh->revenuesKwh->date_end;
        foreach ($upToRevenuePartsKwh as $partItem){
            $distributionKwhCollectionToSetProcessed = $partItem->distributionPartsKwh()->whereNull('date_energy_supplier_report')->where('is_visible', 1)->where('status', '!=', 'processed')->get();
            $partItemEnergySupplierToSetProcessedIds = $distributionKwhCollectionToSetProcessed->filter(function($model) use($isLastPart){
                return ($model->delivered_kwh_from_till_visible == 0 && $isLastPart );
            })
                ->pluck('es_id')->toArray();
            $setProcessedEnergySupplierIds = array_merge($partItemEnergySupplierToSetProcessedIds, $setProcessedEnergySupplierIds);
        }

        $setProcessedEnergySupplierIds = array_unique($setProcessedEnergySupplierIds);
        foreach ($setProcessedEnergySupplierIds as $energySupplierId) {
            $energySupplier = EnergySupplier::find($energySupplierId);
            $revenuepartsKwhController->setProcessedEnergySupplierJob($this->revenuePartsKwh, $energySupplier, $this->upToPartsKwhIds);
        }

//        $revenuePartsKwhHasNotProcessed = $this->revenuesKwh->partsKwh()->where('status', '!=', 'processed')->exists();
        $revenuePartsKwhHasNotConfirmed = $this->revenuesKwh->partsKwh()->where('confirmed', false)->exists();

        foreach ($this->distributionsForReport as $distributionKwh) {
//            if ($distributionKwh->revenuesKwh->partsKwh->where('status', '==', 'new')->count() > 0) {
//                $distributionKwh->status = 'concept';
//            } else {
            if ($distributionKwh->distributionValuesKwh->whereIn('status', ['in-progress-report', 'in-progress-report-concept'])->count() > 0){
                // doe niets
            } elseif ($distributionKwh->distributionValuesKwh->where('status', '!=', 'processed')->count() == 0
                && $distributionKwh->distributionValuesKwh->where('status', '==', 'processed')->count() > 0
                && $revenuePartsKwhHasNotConfirmed == false
            ) {
                $distributionKwh->status = 'processed';
            } else {
                if ($distributionKwh->distributionValuesKwh->whereNotIn('status', ['confirmed', 'processed'])->count() == 0
                    && $distributionKwh->distributionValuesKwh->where('status', '==', 'confirmed')->count() > 0
                    && $revenuePartsKwhHasNotConfirmed == false
                ) {
                    $distributionKwh->status = 'confirmed';
                } else {
                    $distributionKwh->status = 'concept';
                }
            }
//            }
            $distributionKwh->save();
        }
        foreach ($this->distributionsSetProcessed as $distributionKwh) {
            if ($distributionKwh->distributionValuesKwh->where('status', '!=', 'processed')->count() == 0
                && $distributionKwh->distributionValuesKwh->where('status', '==', 'processed')->count() > 0
            ) {
                $distributionKwh->status = 'processed';
            } else {
                if ($distributionKwh->distributionValuesKwh->whereNotIn('status', ['confirmed', 'processed'])->count() == 0
                    && $distributionKwh->distributionValuesKwh->where('status', '==', 'confirmed')->count() > 0
                ) {
                    $distributionKwh->status = 'confirmed';
                }
            }
            $distributionKwh->save();
        }

        $partsKwh = RevenuePartsKwh::whereIn('id', $this->upToPartsKwhIds)->get();
        foreach ($partsKwh as $partKwh) {

            if ($partKwh->status === 'in-progress-report' || $partKwh->status === 'in-progress-set-processed') {

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

    public function failed(\Throwable $exception)
    {
        $jobLog = new JobsLog();
        $jobLog->value = "Opbrengst Kwh verwerken en rapportage energieleverancier maken mislukt.";
        $jobLog->job_category_id = 'process-revenues-kwh';
        $jobLog->user_id = $this->userId;
        $jobLog->save();

        Log::error("Opbrengst Kwh verwerken en rapportage energieleverancier maken mislukt:" . $exception->getMessage());
    }
}