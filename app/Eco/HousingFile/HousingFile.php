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
        return $this->belongsTo(Address::class);
    }

    public function buildingType()
    {
        return $this->belongsTo(BuildingType::class);
    }

    public function roofType()
    {
        return $this->belongsTo(RoofType::class);
    }

    public function energyLabel(){
        return $this->belongsTo(EnergyLabel::class);
    }

    public function energyLabelStatus(){
        return $this->belongsTo(EnergyLabelStatus::class);
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
