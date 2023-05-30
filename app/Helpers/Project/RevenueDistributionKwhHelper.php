<?php

namespace App\Helpers\Project;


use App\Eco\RevenuesKwh\RevenueDistributionKwh;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use App\Eco\RevenuesKwh\RevenuePartsKwh;

class RevenueDistributionKwhHelper
{
    public function getDistributionForReportEnergySupplierIds(RevenuePartsKwh $revenuePartsKwh)
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<=', $revenuePartsKwh->date_end)->pluck('id')->toArray();
        $distributionKwhCollection = RevenueDistributionPartsKwh::whereIn('parts_id', $upToPartsKwhIds)->where('is_visible', 1)->whereNull('date_energy_supplier_report')->whereNotNull('es_id')->where('status', 'confirmed')->get();
        $distributionKwhIds = $distributionKwhCollection->filter(function($model){
//            return ($model->delivered_kwh_from_till_visible != 0 || $model->partsKwh->date_end == $model->partsKwh->revenuesKwh->date_end);
            return ($model->delivered_kwh_from_till_visible != 0 && ($model->is_energy_supplier_switch == true || $model->is_end_participation == true || $model->is_end_total_period == true) );
        })
            ->pluck('distribution_id')->toArray();
        return $distributionKwhIds;
    }

    public function getDistributionSetProcessedEnergySupplierIds(RevenuePartsKwh $revenuePartsKwh)
    {
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<=', $revenuePartsKwh->date_end)->pluck('id')->toArray();
        $isLastPart = $revenuePartsKwh->date_end && $revenuePartsKwh->date_end == $revenuePartsKwh->revenuesKwh->date_end;
        $distributionKwhCollection = RevenueDistributionPartsKwh::whereIn('parts_id', $upToPartsKwhIds)->where('is_visible', 1)->whereNull('date_energy_supplier_report')->where('status', 'confirmed')->get();
        $distributionKwhIds = $distributionKwhCollection->filter(function($model) use($isLastPart) {
            return ($model->delivered_kwh_from_till_visible == 0 && $isLastPart );
        })
            ->pluck('distribution_id')->toArray();
        return $distributionKwhIds;
    }

    public function getDistributionForReportEnergySupplier(RevenuePartsKwh $revenuePartsKwh)
    {
        $isLastPart = $revenuePartsKwh->date_end && $revenuePartsKwh->date_end == $revenuePartsKwh->revenuesKwh->date_end;
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<=', $revenuePartsKwh->date_end)->pluck('id')->toArray();
        $distributionKwhCollection = RevenueDistributionPartsKwh::whereIn('parts_id', $upToPartsKwhIds)->where('is_visible', 1)->whereNull('date_energy_supplier_report')->whereNotNull('es_id')->where('status', 'confirmed')->get();
        $distributionKwhCollectionParts = $distributionKwhCollection->filter(function($model) {
            return ($model->delivered_kwh_from_till_visible != 0 && ($model->is_energy_supplier_switch == true || $model->is_end_participation == true || $model->is_end_total_period == true) );
        });
        $distributionKwhIds = array_unique( $distributionKwhCollectionParts->pluck('distribution_id')->toArray() );
        if(count($distributionKwhIds) == 0){
            return [];
        }
        $distributionPartsKwhIds = $distributionKwhCollectionParts->pluck('id')->toArray();

        $distributions = new RevenueDistributionKwh();
        foreach(array_chunk($distributionKwhIds,900) as $chunk){
            $distributions = $distributions->orWhereIn('id', $chunk);
        }
        $distributionsPeek = [];
        foreach($distributions->get() as $distribution){
            $distributionsPeek[] = [
                'id' => $distribution->id,
                'contactName' => $distribution->contact->full_name,
                'deliveredKwhUpTo' => $distribution->distributionPartsKwh->whereIn('id', $distributionPartsKwhIds)->sum('delivered_kwh_from_till_visible'),
                'isLastPart' => $isLastPart,
            ];
        }

        return $distributionsPeek;
    }

    public function getDistributionSetProcessedEnergySupplier(RevenuePartsKwh $revenuePartsKwh)
    {
        $isLastPart = $revenuePartsKwh->date_end && $revenuePartsKwh->date_end == $revenuePartsKwh->revenuesKwh->date_end;
        $upToPartsKwhIds = RevenuePartsKwh::where('revenue_id', $revenuePartsKwh->revenue_id)->where('date_end', '<=', $revenuePartsKwh->date_end)->pluck('id')->toArray();
        $distributionKwhCollection = RevenueDistributionPartsKwh::whereIn('parts_id', $upToPartsKwhIds)->where('is_visible', 1)->whereNull('date_energy_supplier_report')->where('status', 'confirmed')->get();
        $distributionKwhCollectionParts = $distributionKwhCollection->filter(function($model) use($isLastPart){
            return ($model->delivered_kwh_from_till_visible == 0 && $isLastPart);
        });
        $distributionKwhIds = array_unique( $distributionKwhCollectionParts->pluck('distribution_id')->toArray() );
        if(count($distributionKwhIds) == 0){
            return [];
        }
        $distributionPartsKwhIds = $distributionKwhCollectionParts->pluck('id')->toArray();

        $distributions = new RevenueDistributionKwh();
        foreach(array_chunk($distributionKwhIds,900) as $chunk){
            $distributions = $distributions->orWhereIn('id', $chunk);
        }
        $distributionsPeek = [];
        foreach($distributions->get() as $distribution){
            $distributionsPeek[] = [
                'id' => $distribution->id,
                'contactName' => $distribution->contact->full_name,
                'deliveredKwhUpTo' => $distribution->distributionPartsKwh->whereIn('id', $distributionPartsKwhIds)->sum('delivered_kwh_from_till_visible'),
                'isLastPart' => $isLastPart,
            ];
        }

        return $distributionsPeek;
    }

}
