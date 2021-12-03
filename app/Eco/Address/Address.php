<?php

namespace App\Eco\Address;

use App\Eco\Contact\Contact;
use App\Eco\Country\Country;
use App\Eco\EnergySupplier\AddressEnergySupplier;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Measure\Measure;
use App\Eco\ParticipantProject\ParticipantProject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Address extends Model
{
    use PresentableTrait, RevisionableTrait, SoftDeletes;
    protected $presenter = AddressPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
    ];

    public function addressEnergySuppliers()
    {
        return $this->hasMany(AddressEnergySupplier::class)->orderByDesc('member_since')->orderByDesc('id');
    }

    // primaryAddressEnergySupplier: only for Electricity ! (type 2 or 3)
    public function primaryAddressEnergySupplier()
    {
        return $this->hasOne(AddressEnergySupplier::class)->where('is_current_supplier', true)->whereIn('energy_supply_type_id', [2, 3] );
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function participations()
    {
        return $this->hasMany(ParticipantProject::class);
    }

    public function housingFile()
    {
        return $this->hasOne(HousingFile::class)->latest();
    }

    public function housingFiles()
    {
        return $this->hasMany(HousingFile::class);
    }

    public function intakes()
    {
        return $this->hasMany(Intake::class);
    }

    public function measuresTaken()
    {
        return $this->belongsToMany(Measure::class, 'housing_file_measure_taken')->withPivot('measure_date');
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function getType()
    {
        if (!$this->type_id) return null;

        return AddressType::get($this->type_id);
    }

    public function getPostalCodeNumberAdditionAttribute(){
        return $this->postal_code . '-' . $this->number . '-' . $this->addition;
    }

    public function getStreetPostalCodeCityAttribute(){
        $streetPostalCodeCity = $this->street . ' ' . $this->number;
        $streetPostalCodeCity .= $this->addition ? '-' . $this->addition : '';
        $streetPostalCodeCity .= $this->postal_code ? ', ' . $this->postal_code : '';
        $streetPostalCodeCity .= $this->city ? ', ' . $this->city : '';
        return $streetPostalCodeCity;
    }
    public function getTypeAndPrimaryAttribute(){
        $typeAndPrimary = $this->getType() ? $this->getType()->name : '';
        $typeAndPrimary .= $this->primary ? ($this->getType() ? ' - ' : '') . 'primair' : '';
        return $typeAndPrimary;
    }


    public function getPostalCodeAttribute($postalCode){
        if(preg_match('/^\d{4}[A-Za-z]{2}$/', $postalCode)){
            $postalCode = substr_replace($postalCode, ' ', 4, 0);
        }

        return $postalCode;
    }

    public function getIsInRevenueDistributionAttribute()
    {
        if($this->participations && $this->participations->count() > 0){
            foreach ($this->participations as $participation){
                if($participation->projectRevenueDistributions && $participation->projectRevenueDistributions->count() > 0){
                    return true;
                }
            }
        }

        return false;
    }

    // previousAddressEnergySupplierId: only for Electricity ! (type 2 or 3)
    public function getPreviousAddressEnergySupplierIdAttribute()
    {
        if(!$this->primaryAddressEnergySupplier) {
            return 0;
        }
        $addressEnergySuppliers = $this->addressEnergySuppliers
            ->whereNotNull('member_since')
            ->whereIn('energy_supply_type_id', [2, 3] )
            ->where('member_since', '<', $this->primaryAddressEnergySupplier->member_since)
            ->sortByDesc('member_since');
        if(count($addressEnergySuppliers) == 0){
            return 0;
        }
        return $addressEnergySuppliers->first()->id;
    }
}
