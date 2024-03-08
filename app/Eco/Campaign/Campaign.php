<?php

namespace App\Eco\Campaign;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Opportunity\OpportunityAction;
use App\Eco\Organisation\Organisation;
use App\Eco\Intake\Intake;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Campaign extends Model
{
    use RevisionableTrait, SoftDeletes, HasFactory;

    const STATUS_CLOSED = 4;

    protected $table = 'campaigns';
     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [

    ];

    public function intakes()
    {
        return $this->hasMany(Intake::class);
    }

    public function opportunities()
    {
        return $this->hasManyThrough(Opportunity::class, Intake::class);
    }
    
    public function measureCategories()
    {
        return $this->belongsToMany(MeasureCategory::class);
    }

    public function status()
    {
        return $this->belongsTo(CampaignStatus::class);
    }

    public function type()
    {
        return $this->belongsTo(CampaignType::class);
    }

    public function inspectionPlannedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_planned_email_template_id');
    }

    public function inspectionRecordedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_recorded_email_template_id');
    }

    public function inspectionReleasedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_released_email_template_id');
    }

    public function inspectionPlannedMailbox()
    {
        return $this->belongsTo(Mailbox::class, 'inspection_planned_mailbox_id');
    }

    public function defaultWorkflowMailbox()
    {
        return $this->belongsTo(Mailbox::class, 'default_workflow_mailbox_id');
    }

    public function campaignWorkflows()
    {
        return $this->hasMany(CampaignWorkflow::class);
    }

    public function opportunityActions()
    {
        return $this->belongsToMany(OpportunityAction::class);
    }

    public function responses(){
        return $this->hasMany(CampaignResponse::class);
    }

    public function organisations(){
        return $this->belongsToMany(Organisation::class);
    }

    public function coaches(){
        return $this->belongsToMany(Contact::class, 'campaign_coach');
    }

    public function projectManagers(){
        return $this->belongsToMany(Contact::class, 'campaign_project_manager');
    }

    public function externalParties(){
        return $this->belongsToMany(Contact::class, 'campaign_external_party');
    }

    public function organisationsOrCoachesIds(){
        $contactIdsOrganisations = $this->organisations()->get()->pluck('contact_id')->toArray();
        $contactIdsCoaches = $this->coaches()->get()->pluck('id')->toArray();

        return array_unique(array_merge($contactIdsOrganisations, $contactIdsCoaches));
    }
    public function projectManagersIds(){
        return $this->projectManagers()->get()->pluck('id')->toArray();
    }
    public function externalPartiesIds(){
        return $this->externalParties()->get()->pluck('id')->toArray();
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function ownedBy(){
        return $this->belongsTo(User::class);
    }

    // Only unfinished tasks are a task
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    // A finished task is a note
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true)->orderBy('tasks.id', 'desc');
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }


    // simulategroup up-to-date?
    public function getNumberOfIntakesAttribute(){
        $numberOfIntakes = 0;
        if($this->intakes){
            $numberOfIntakes = $this->intakes->count();
        }
        return $numberOfIntakes;
    }
}
