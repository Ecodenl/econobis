<?php

namespace App\Eco\HousingFile;

use App\Eco\Address\Address;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class HousingFile extends Model
{

    protected $table = 'housing_files';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function buildingType()
    {
        return $this->hasOne(BuildingType::class);
    }

    public function roofType()
    {
        return $this->hasOne(RoofType::class);
    }

    public function energyLabel(){
        return $this->hasOne(EnergyLabel::class);
    }

    public function energyLabelStatus(){
        return $this->hasOne(EnergyLabelStatus::class);
    }

    public function measuresTaken(){
        return $this->belongsToMany(Measure::class);
    }

    public function notes(){
        //todo
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

}
