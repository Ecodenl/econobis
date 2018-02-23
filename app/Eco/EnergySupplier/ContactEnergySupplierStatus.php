<?php

namespace App\Eco\EnergySupplier;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ContactEnergySupplierStatus extends Model
{
    protected $table = 'contact_energy_supply_status';

    use RevisionableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function contactEnergySuppliers()
    {
        return $this->hasMany(ContactEnergySupplier::class);
    }
}
