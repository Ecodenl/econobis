<?php

namespace App\Eco\HousingFile;

use App\Eco\Address\Address;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class HousingFile extends Model
{

    use RevisionableTrait;

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

    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true)->orderBy('tasks.id', 'desc');
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
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
