<?php

namespace App\Eco\EnergySupplier;

use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\RevenuesKwh\RevenuePartsKwh;
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

    public function revenuePartsKwh()
    {
        return $this->hasMany(RevenuePartsKwh::class, 'es_id');
    }


}
