<?php

namespace App\Eco\Address;

use App\Eco\Contact\Contact;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Measure\Measure;
use App\Eco\BuildingType\BuildingType;
use App\Eco\Measure\MeasureRequested;
use App\Eco\Measure\MeasureTaken;
use App\Eco\Intake\Intake;
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

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function housingFile()
    {
        return $this->hasOne(HousingFile::class);
    }

    public function intake()
    {
        return $this->hasOne(Intake::class);
    }

    public function measuresTaken()
    {
        return $this->belongsToMany(Measure::class, 'measure_taken_address')->withPivot('measure_date');
    }

    public function getType()
    {
        if (!$this->type_id) return null;

        return AddressType::get($this->type_id);
    }
}
