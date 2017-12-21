<?php

namespace App\Eco\Measure;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\EnergyLabel\EnergyLabel;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use Illuminate\Database\Eloquent\Model;

class Measure extends Model
{
    protected $table = 'measures';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function energy_label()
    {
        return $this->belongsTo(EnergyLabel::class);
    }

    public function addresses()
    {
        return $this->belongsToMany(Address::class);
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
}
