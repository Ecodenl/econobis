<?php

namespace App\Eco\Address;

use App\Eco\Contact\Contact;
use App\Eco\Country\Country;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Measure\Measure;
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

    public function getPostalCodeAttribute($postalCode){
        if(preg_match('/^\d{4}[A-Za-z]{2}$/', $postalCode)){
            $postalCode = substr_replace($postalCode, ' ', 4, 0);
        }

        return $postalCode;
    }
}
