<?php

namespace App\Eco\HousingFile;

use App\Eco\Address\Address;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class HousingFile extends Model
{

    use RevisionableTrait, SoftDeletes;

    protected $table = 'housing_files';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

//    protected $casts = [
//        'is_house_for_sale' => 'boolean',
//        'is_monument' => 'boolean',
//    ];

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

    public function frameType(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'frame_type', 'hoom_status_value')->where('external_hoom_short_name', 'frame-type');
    }
    public function cookType(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'cook_type', 'hoom_status_value')->where('external_hoom_short_name', 'cook-type');
    }
    public function heatSource(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'heat_source', 'hoom_status_value')->where('external_hoom_short_name', 'heat-source');
    }
    public function waterComfort(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'water_comfort', 'hoom_status_value')->where('external_hoom_short_name', 'water-comfort');
    }

    public function pitchedRoofHeating(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'pitched_roof_heating', 'hoom_status_value')->where('external_hoom_short_name', 'pitched-roof-heating');
    }
    public function flatRoofHeating(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'flat_roof_heating', 'hoom_status_value')->where('external_hoom_short_name', 'flat-roof-heating');
    }
    public function hr3pGlassFrameCurrentGlass(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'hr3p_glass_frame_current_glass', 'hoom_status_value')->where('external_hoom_short_name', 'hr3p-glass-frame-current-glass');
    }
    public function glassInLeadReplaceRoomsHeated(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'glass_in_lead_replace_rooms_heated', 'hoom_status_value')->where('external_hoom_short_name', 'glass-in-lead-replace-rooms-heated');
    }
    public function boilerSettingComfortHeat(){
        return $this->belongsTo(HousingFileHoomHousingStatus::class, 'boiler_setting_comfort_heat', 'hoom_status_value')->where('external_hoom_short_name', 'boiler-setting-comfort-heat');
    }

    public function housingFileHousingStatuses()
    {
        return $this->hasMany(HousingFileHousingStatus::class);
    }

    public function housingFileSpecifications()
    {
        return $this->hasMany(HousingFileSpecification::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
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
