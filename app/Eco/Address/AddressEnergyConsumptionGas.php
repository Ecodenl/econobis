<?php

namespace App\Eco\Address;

use Illuminate\Database\Eloquent\Model;

class AddressEnergyConsumptionGas extends Model
{
    protected $table = 'address_energy_consumption_gas';

    protected $guarded = ['id'];

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

}
