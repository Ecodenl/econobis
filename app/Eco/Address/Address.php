<?php

namespace App\Eco\Address;

use App\Eco\Contact\Contact;
use App\Eco\Country\Country;
use App\Eco\AddressEnergySupplier\AddressEnergySupplier;
use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsFieldRecord;
use App\Eco\FreeFields\FreeFieldsTable;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\ParticipantProject\ParticipantProject;
use App\EcoShared\SharedPostalCodesHouseNumber\SharedPostalCodesHouseNumber;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Address extends Model
{
    use PresentableTrait, RevisionableTrait, SoftDeletes, HasFactory;
    protected $presenter = AddressPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
    ];

    public function addressEnergySuppliers()
    {
        return $this->hasMany(AddressEnergySupplier::class)->orderByDesc('member_since')->orderByDesc('id');
    }

    // currentAddressEnergySupplierElectricity: only for Electricity ! (type 2 or 3)
    public function currentAddressEnergySupplierElectricity()
    {
        return $this->hasOne(AddressEnergySupplier::class)->where('is_current_supplier', true)->whereIn('energy_supply_type_id', [2, 3] );
    }
    // currentAddressEnergySupplierGas: only for Gas ! (type 1 or 3)
    public function currentAddressEnergySupplierGas()
    {
        return $this->hasOne(AddressEnergySupplier::class)->where('is_current_supplier', true)->whereIn('energy_supply_type_id', [1, 3] );
    }
    // currentAddressEnergySupplierElectricityAndGas
    public function currentAddressEnergySupplierElectricityAndGas()
    {
        return $this->hasMany(AddressEnergySupplier::class)->where('is_current_supplier', true);
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

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function addressEnergyConsumptionGasPeriods()
    {
        return $this->hasMany(AddressEnergyConsumptionGas::class)->orderBy('date_begin')->orderBy('id');
    }

    public function addressEnergyConsumptionElectricityPeriods()
    {
        return $this->hasMany(AddressEnergyConsumptionElectricity::class)->orderBy('date_begin')->orderBy('id');
    }

    public function freeFieldsFieldRecords()
    {
        $fieldTableContact = FreeFieldsTable::where('table', 'addresses')->first();
        $contactFieldIds = FreeFieldsField::where('table_id', ($fieldTableContact->id ?? '$#@') )->get()->pluck('id')->toArray();
        return $this->hasMany(FreeFieldsFieldRecord::class, 'table_record_id')->whereIn('field_id', $contactFieldIds);
    }

    public function getType()
    {
        if (!$this->type_id) return null;

        return AddressType::get($this->type_id);
    }

    public function getPostalCodeNumberAdditionAttribute(){
        return str_replace(' ', '', $this->postal_code) . ' ' . $this->number . ($this->addition ? ('-' . $this->addition) : '');
    }

    public function getPostalCodeNumberAdditionForDoubleCheckAttribute(){
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

    public function getfullAddressAttribute(){
        $fullAddress = $this->street . ' ' . $this->number;
        return $fullAddress;
    }

    public function getPostalCodeAttribute($postalCode){
        if(preg_match('/^\d{4}[A-Za-z]{2}$/', $postalCode)){
            $postalCode = substr_replace($postalCode, ' ', 4, 0);
        }

        return $postalCode;
    }

//    public function getUsedInActiveParticipationAttribute()
//    {
//        return $this->participations->whereNull('date_terminated')->count() > 0;
//    }

    public function getUsedInActiveParticipationInSceOrPcrProjectAttribute()
    {
        return $this->participations->where('participant_in_sce_or_pcr_project', true)->count() > 0;
    }

    public function getUsedInActiveParticipationNotInSceOrPcrProjectAttribute()
    {
        return $this->participations->where('participant_not_in_sce_or_pcr_project', true)->count() > 0;
    }

    public function getMemberSinceGasDisabledBeforeAttribute()
    {
        $filterTypeIdArray = [1, 3];
        return $this->determineMemberSinceDisabledBefore($filterTypeIdArray);
    }

    public function getMemberSinceElectricityDisabledBeforeAttribute()
    {
        $filterTypeIdArray = [2, 3];
        return $this->determineMemberSinceDisabledBefore($filterTypeIdArray);
    }

    public function getMemberSinceGasAndElectricityDisabledBeforeAttribute()
    {
        $filterTypeIdArray = [1, 2, 3];
        return $this->determineMemberSinceDisabledBefore($filterTypeIdArray);
    }

    /**
     * @param array $filterTypeIdArray
     * @return string
     */
    private function determineMemberSinceDisabledBefore(array $filterTypeIdArray): string
    {
        $latestAddressEnergySuppliers = AddressEnergySupplier::where('address_id', $this->id)
            ->whereIn('energy_supply_type_id', $filterTypeIdArray)
            ->orderBy('member_since', 'desc');
        if ($latestAddressEnergySuppliers->exists()) {
            $latestAddressEnergySupplier = $latestAddressEnergySuppliers->first();
            $memberSinceDisabledBefore = Carbon::parse($latestAddressEnergySupplier->member_since)->format('Y-m-d');
        } else {
            $memberSinceDisabledBefore = Carbon::parse('1900-01-01')->format('Y-m-d');
        }
        return $memberSinceDisabledBefore;
    }

    public function getSharedPostalCodesHouseNumber(){
        return SharedPostalCodesHouseNumber::where('postal_code', str_replace(' ', '', $this->postal_code))->where('house_number', $this->number)->first();
    }
}
