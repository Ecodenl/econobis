<?php

namespace App\Eco\HousingFile;

use App\Eco\Campaign\Campaign;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class HousingFileSpecification extends Model
{

    use RevisionableTrait, SoftDeletes;

    protected $table = 'housing_file_specifications';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

//    protected $casts = [
//    ];

    public function housingFile()
    {
        return $this->belongsTo(HousingFile::class);
    }

    public function status()
    {
        return $this->belongsTo(HousingFileSpecificationStatus::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function floor()
    {
        return $this->belongsTo(HousingFileSpecificationFloor::class);
    }

    public function side()
    {
        return $this->belongsTo(HousingFileSpecificationSide::class);
    }

    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getHasOpportunitiesAttribute()
    {
        return $this->opportunities()->exists();
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
