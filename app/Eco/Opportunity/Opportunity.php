<?php

namespace App\Eco\Opportunity;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Measure\Measure;
use App\Eco\Registration\Registration;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Opportunity extends Model
{
    use RevisionableTrait;

    protected $table = 'opportunities';

    protected $guarded = ['id'];
    //Relations
    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function reaction()
    {
        return $this->belongsTo(OpportunityReaction::class);
    }

    public function status()
    {
        return $this->belongsTo(OpportunityStatus::class);
    }

    public function quotations(){
        return $this->hasMany(OpportunityQuotation::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function ownedBy(){
        return $this->belongsTo(User::class);
    }

    //custom methods
    public function relatedOpportunities(){
        $opportunities = $this->contact->opportunities()->with(['measure', 'status'])->where('id', '!=', $this->id)->get();

        return $opportunities;
    }
}
