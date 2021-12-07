<?php

namespace App\Eco\EnergySupplier;

use App\Eco\Address\Address;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class AddressEnergySupplier extends Model
{
    protected $table = 'address_energy_suppliers';

    use RevisionableTrait;

    protected $guarded = ['id'];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function energySupplier()
    {
        return $this->belongsTo(EnergySupplier::class);
    }

    public function energySupplyStatus()
    {
        return $this->belongsTo(EnergySupplierStatus::class);
    }

    public function energySupplyType()
    {
        return $this->belongsTo(EnergySupplierType::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

}
