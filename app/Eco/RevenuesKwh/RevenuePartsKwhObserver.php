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
            // Als status van een part is gewijzigd, kijk of we ook status van revenueKwh moeten aanpassen.

            $revenuesKwh = $revenuePartsKwh->revenuesKwh;
            if($revenuesKwh->status == 'new' && $revenuePartsKwh->status != 'new'){
                $revenuesKwh->status = 'concept';
                $revenuesKwh->save();
            }
        }
    }
}