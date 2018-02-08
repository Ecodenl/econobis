<?php

namespace App\Eco\Organisation;

use App\Eco\Campaign\Campaign;
use App\Eco\Measure\Measure;
use App\Eco\Occupation\OccupationPerson;
use App\Eco\Opportunity\OpportunityQuotation;
use App\Eco\OrganisationType\OrganisationType;
use App\Eco\Contact\Contact;
use App\Eco\Industry\Industry;
use App\Eco\Person\Person;
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

    public function people()
    {
        return $this->hasMany(OccupationPerson::class);
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }

    public function campaigns(){
        return $this->belongsToMany(Campaign::class);
    }

    public function quotations(){
        return $this->hasMany(OpportunityQuotation::class);
    }

    public function deliversMeasures()
    {
        return $this->belongsToMany(Measure::class, 'organisation_delivers_measure');
    }

    public function amountOfWonQuotations()
    {
        $quotations = $this->quotations()->with('opportunity.status')->get();
        $count = 0;
        foreach ($quotations as $quotation) {
            if ($quotation->opportunity->status->name == 'Gewonnen'
                || $quotation->opportunity->status->name
                == 'Gewonnen, doe het zelf'
            ) {
                $count++;
            }
        }

        return $count;
    }
}
