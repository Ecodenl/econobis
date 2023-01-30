<?php

namespace App\Eco\QuotationRequest;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class QuotationRequest extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'quotation_requests';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'duration_minutes' => 'integer',
        'uses_planning' => 'boolean',
    ];

   public function organisationOrCoach()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

   public function projectManager()
    {
        return $this->belongsTo(Contact::class, 'project_manager_id');
    }

   public function externalParty()
    {
        return $this->belongsTo(Contact::class, 'external_party_id');
    }

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function status()
    {
        return $this->belongsTo(QuotationRequestStatus::class);
    }

    public function opportunityAction()
    {
        return $this->belongsTo(OpportunityAction::class);
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails(){
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function actionsLog(){
        return $this->hasMany(QuotationRequestActionsLog::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getOrganisastionsOrCoachsToSelect()
    {
        return Contact::whereIn('id', $this->opportunity->intake->campaign->organisationsOrCoachesIds())
            ->orWhere('id', $this->contact_id)->orderBy('full_name')->get();
    }
    public function getProjectManagersToSelect()
    {
        return Contact::whereIn('id', $this->opportunity->intake->campaign->projectManagersIds())
            ->orWhere('id', $this->project_manager_id)->orderBy('full_name')->get();
    }
    public function getExternalPartiesToSelect()
    {
        return Contact::whereIn('id', $this->opportunity->intake->campaign->externalPartiesIds())
            ->orWhere('id', $this->external_party_id)->orderBy('full_name')->get();
    }

    public function newEloquentBuilder($query)
    {
        return new QuotationRequestBuilder($query);
    }
}
