<?php

namespace App\Eco\Administration;

use App\Eco\Contact\Contact;
use App\Eco\Country\Country;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Measure\Measure;
use App\Eco\BuildingType\BuildingType;
use App\Eco\Measure\MeasureRequested;
use App\Eco\Measure\MeasureTaken;
use App\Eco\Intake\Intake;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class Administration extends Model
{
    use PresentableTrait, RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'IBAN'
    ];

    //Dont boot softdelete scopes. We handle this ourselves
    public static function bootSoftDeletes()
    {
        return false;
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

}
