<?php

namespace App\Eco\EnergySupplier;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenueDistributionPartsKwh;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class EnergySupplier extends Model
{
    protected $table = 'energy_suppliers';

    use RevisionableTrait;

    protected $guarded = ['id'];

    public function addressEnergySuppliers()
    {
        return $this->hasMany(AddressEnergySupplier::class);
    }

    public function distributionPartsKwh()
    {
        return $this->hasMany(RevenueDistributionPartsKwh::class, 'es_id');
    }


}
