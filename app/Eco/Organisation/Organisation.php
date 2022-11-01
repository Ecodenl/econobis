<?php

namespace App\Eco\Organisation;

use App\Eco\Campaign\Campaign;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\OrganisationType\OrganisationType;
use App\Eco\Contact\Contact;
use App\Eco\Industry\Industry;
use App\Eco\Person\Person;
use App\Eco\QuotationRequest\QuotationRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Organisation extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function type()
    {
        return $this->belongsTo(OrganisationType::class);
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }

    public function campaigns(){
        return $this->belongsToMany(Campaign::class);
    }

    public function quotationRequests(){
        // 20221031; Jos; deze relatie bestaat niet meer?
        return $this->hasMany(QuotationRequest::class);
    }

    public function people()
    {
        return $this->hasMany(Person::class);
    }

    public function deliversMeasures()
    {
        return $this->belongsToMany(Measure::class, 'organisation_delivers_measure');
    }

    public function measureCategories()
    {
        return $this->hasMany(MeasureCategory::class, 'organisation_id_wf_create_quotation_request');
    }
}
