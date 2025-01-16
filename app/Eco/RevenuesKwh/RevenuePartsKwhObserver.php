<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 20-10-2017
 * Time: 10:00
 */

namespace App\Eco\RevenuesKwh;

class RevenuePartsKwhObserver
{

    public function saved(RevenuePartsKwh $revenuePartsKwh)
    {
        if($revenuePartsKwh->isDirty('status')){
            // Als status van een part is gewijzigd, kijk of we ook status van revenuesKwh moeten aanpassen.

            // Op moment dat 1e part op concept wordt gezet, ook revenuesKwh op concept.
            $revenuesKwh = $revenuePartsKwh->revenuesKwh;
            if($revenuesKwh->status == 'new' && $revenuePartsKwh->status == 'concept'){
                $revenuesKwh->status = 'concept';
                $revenuesKwh->save();
            }
            // Op moment dat een part op Definitief wordt gezet dan project (default) date_entry op null zetten.
            if($revenuePartsKwh->status == 'confirmed'){
                $revenuesKwh->project->date_entry = null;
                $revenuesKwh->project->save();
            }
            // Op moment dat laatste part op confirmed wordt gezet, ook revenuesKwh op confirmed.
            // Vooralsnog een aparte actie vanuit revenuesKwh
//            $revenuesKwh = $revenuePartsKwh->revenuesKwh;
//            if($revenuesKwh->status == 'concept' && $revenuePartsKwh->status == 'confirmed'){
//                $latestRevenuePartsKwh = $revenuesKwh->partsKwh->orderBy('date_end', 'desc')->first()
//                if($latestRevenuePartsKwh->status == 'confirmed'){
//                    $revenuesKwh->status = 'confirmed';
//                    $revenuesKwh->save();
//                }
//            }
        }
    }
}