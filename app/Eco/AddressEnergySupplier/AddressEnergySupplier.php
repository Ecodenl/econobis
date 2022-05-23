<?php

namespace App\Eco\AddressEnergySupplier;

use App\Eco\Address\Address;
use App\Eco\EnergySupplier\EnergySupplier;
use App\Eco\EnergySupplier\EnergySupplierStatus;
use App\Eco\EnergySupplier\EnergySupplierType;
use App\Eco\User\User;
use Carbon\Carbon;
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

    public function getEndDatePreviousAttribute()
    {
        $filterTypeIdArray = [1, 2, 3];
        if($this->energy_supply_type_id == 1 ){
            $filterTypeIdArray = [1, 3];
        }
        if($this->energy_supply_type_id == 2 ){
            $filterTypeIdArray = [2, 3];
        }
        $previousAddressEnergySuppliers = AddressEnergySupplier::where('address_id', $this->address_id)
            ->whereIn('energy_supply_type_id', $filterTypeIdArray )
            ->whereNotNull('member_since')
            ->where('member_since', '<', $this->member_since)
            ->orderBy('member_since', 'desc');
        if($previousAddressEnergySuppliers->exists()){
            $previousAddressEnergySupplier = $previousAddressEnergySuppliers->first();
            $endDatePrevious = Carbon::parse( $previousAddressEnergySupplier->end_date)->format('Y-m-d');
        } else {
            $endDatePrevious = Carbon::parse('1900-01-01')->format('Y-m-d');
        }

        return $endDatePrevious;
    }
    public function getMemberSinceNextAttribute()
    {
        $filterTypeIdArray = [1, 2, 3];
        if($this->energy_supply_type_id == 1 ){
            $filterTypeIdArray = [1, 3];
        }
        if($this->energy_supply_type_id == 2 ){
            $filterTypeIdArray = [2, 3];
        }
        $nextAddressEnergySuppliers = AddressEnergySupplier::where('address_id', $this->address_id)
            ->whereIn('energy_supply_type_id', $filterTypeIdArray )
            ->whereNotNull('member_since')
            ->where('member_since', '>', $this->member_since)
            ->orderBy('member_since', 'asc');
        if($nextAddressEnergySuppliers->exists()){
            $nextAddressEnergySupplier = $nextAddressEnergySuppliers->first();
            $memberSinceNext = Carbon::parse($nextAddressEnergySupplier->member_since)->format('Y-m-d');
        } else {
            $memberSinceNext = Carbon::parse('9999-12-31')->format('Y-m-d');
        }

        return $memberSinceNext;
    }

}
