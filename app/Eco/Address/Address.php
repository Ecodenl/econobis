<?php

namespace App\Eco\Address;

use App\Eco\Contact\Contact;
use App\Eco\Measure\Measure;
use App\Eco\BuildingFeature\BuildingFeature;
use App\Eco\Registration\Registration;
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

    public function registration()
    {
        return $this->hasOne(Registration::class);
    }

    public function measures_taken()
    {
        return $this->belongsToMany(Measure::class,
            'measure_taken_address', 'address_id', 'measure_id');
    }

    public function measures_requested()
    {
        return $this->belongsToMany(Measure::class,
            'measure_requested_address', 'address_id', 'measure_id');
    }

    public function building_features()
    {
        return $this->hasMany(BuildingFeature::class);
    }

    public function notes()
    {
        return $this->hasMany(ContactNote::class);
    }

    public function getType()
    {
        if(!$this->type_id) return null;

        return AddressType::get($this->type_id);
    }
}
