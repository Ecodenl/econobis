<?php

namespace App\Eco\EnergySupplier;

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
}
