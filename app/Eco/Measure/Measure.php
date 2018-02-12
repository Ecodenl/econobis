<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\EnergyLabel\EnergyLabel;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Intake\Intake;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Measure extends Model
{
    use RevisionableTrait;

    protected $table = 'measures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function housingFiles()
    {
        return $this->belongsToMany(HousingFile::class, 'measure_taken_address');
    }

    public function intakes()
    {
        return $this->belongsToMany(Intake::class, 'intake_measure_requested');
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class);
    }

    public function deliveredByOrganisations()
    {
        return $this->belongsToMany(Organisation::class, 'organisation_delivers_measure');
    }

    public function faqs()
    {
        return $this->hasMany(MeasureFaq::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }
}
