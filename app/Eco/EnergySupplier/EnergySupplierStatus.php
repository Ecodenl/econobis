<?php

namespace App\Eco\EnergySupplier;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class EnergySupplierStatus extends Model
{
    protected $table = 'energy_supply_statuses';

    use RevisionableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function addressEnergySuppliers()
    {
        return $this->hasMany(AddressEnergySupplier::class);
    }
}
