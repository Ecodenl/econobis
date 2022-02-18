<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Venturecraft\Revisionable\RevisionableTrait;

class RevenueDistributionPartsKwh extends Model
{
    use RevisionableTrait;

    protected $table = 'revenue_distribution_parts_kwh';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    //relations

    public function revenuesKwh()
    {
        return $this->belongsTo(RevenuesKwh::class, 'revenue_id');
    }
    public function partsKwh()
    {
        return $this->belongsTo(RevenuePartsKwh::class, 'parts_id');
    }
    public function distributionKwh()
    {
        return $this->belongsTo(RevenueDistributionKwh::class, 'distribution_id');
    }
    public function energySupplier()
    {
        return $this->belongsTo(EnergySupplier::class, 'es_id');
    }

    //Appended fields

    public function getDeliveredTotalStringAttribute()
    {
        return number_format( $this->delivered_kwh, '2',',', '.' );
    }

    public function getKwhReturnAttribute(){
        $deliveredTotal = $this->delivered_kwh ? $this->delivered_kwh : 0;
        $payoutKwh = $this->partsKwh->payout_kwh ? $this->partsKwh->payout_kwh : 0;
        return $deliveredTotal * $payoutKwh;
    }

}
