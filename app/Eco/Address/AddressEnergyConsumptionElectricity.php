<?php

namespace App\Eco\Address;

use Illuminate\Database\Eloquent\Model;

class AddressEnergyConsumptionElectricity extends Model
{
    protected $table = 'address_energy_consumption_electricity';

    protected $guarded = ['id'];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

}
