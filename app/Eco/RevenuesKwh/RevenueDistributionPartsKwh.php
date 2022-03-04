<?php

namespace App\Eco\RevenuesKwh;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\EnergySupplier\EnergySupplier;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
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
    public function getRemarksAttribute()
    {
        $remarks = [];
        if($this->distributionKwh->participation->date_terminated == $this->partsKwh->date_end){
            $remarks[] = "Deze deelname is beeindigd op " . Carbon::parse($this->distributionKwh->participation->date_terminated)->format('d-m-Y');
        }
        if(AddressEnergySupplier::where('address_id', $this->distributionKwh->participation->address_id)->where('energy_supplier_id', $this->es_id)->where('end_date', $this->partsKwh->date_end)->exists()){
            $remarks[] = "Deze energie leverancier bij deze deelname is beeinidigd op " . Carbon::parse($this->partsKwh->date_end)->format('d-m-Y');
        }
        if( $this->partsKwh->date_end && Carbon::parse($this->partsKwh->date_end)->day == 31 && Carbon::parse($this->partsKwh->date_end)->month == 12 ){
            $remarks[] = "Einde jaar";
        }
        return implode('<br/>', $remarks);
    }

    public function getKwhReturnAttribute(){
        $deliveredTotal = $this->delivered_kwh ? $this->delivered_kwh : 0;
        $payoutKwh = $this->partsKwh->payout_kwh ? $this->partsKwh->payout_kwh : 0;
        return $deliveredTotal * $payoutKwh;
    }

}
