<?php

namespace App\Eco\Project;

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Email\Email;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewProject;
use App\Eco\Measure\Measure;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Portal\PortalUser;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Venturecraft\Revisionable\RevisionableTrait;

class Project extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'projects';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    //relations

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function projectStatus(){
        return $this->belongsTo(ProjectStatus::class)->withTrashed();
    }

    public function projectType(){
        return $this->belongsTo(ProjectType::class)->withTrashed();
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails()
    {
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function ownedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }

    public function projectValueCourses(){
        return $this->hasMany(ProjectValueCourse::class)->orderBy('date');
    }

    public function projectRevenues(){
        return $this->hasMany(ProjectRevenue::class);
    }

    public function participantsProject(){
        return $this->hasMany(ParticipantProject::class, 'project_id');
    }

    public function financialOverviewProjects()
    {
        return $this->hasMany(FinancialOverviewProject::class);
    }

    public function participantsProjectDefinitive(){
        $projectType = $this->projectType;
        $mutationType = ParticipantMutationType::where('code_ref', 'first_deposit')->where('project_type_id', $projectType->id)->first()->id;
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;
        return $this->hasMany(ParticipantProject::class, 'project_id')->whereNull('date_terminated')
            ->where(function ($query) use($mutationType, $mutationStatusFinal) {
            $query->whereHas('mutations', function ($query) use($mutationType, $mutationStatusFinal) {
                $query->where('type_id', $mutationType)->where('status_id', $mutationStatusFinal);
            });
        });
    }

    public function requiresContactGroups(){
        return $this->belongsToMany(ContactGroup::class, 'contact_group_participation', 'project_id', 'group_id');
    }

    public function documentTemplateAgreement(){
        return $this->belongsTo(DocumentTemplate::class, 'document_template_agreement_id');
    }

    public function emailTemplateAgreement(){
        return $this->belongsTo(EmailTemplate::class, 'email_template_agreement_id');
    }

    public function questionAboutMembershipGroup(){
        return $this->belongsTo(ContactGroup::class, 'question_about_membership_group_id');
    }

    public function memberGroup(){
        return $this->belongsTo(ContactGroup::class, 'member_group_id');
    }

    public function noMemberGroup(){
        return $this->belongsTo(ContactGroup::class, 'no_member_group_id');
    }

    public function getTransactionCostsCodeRef()
    {
        if (!$this->transaction_costs_code_ref) return null;

        return TransactionCostsCodeRef::get($this->transaction_costs_code_ref);
    }


    public function getCurrentParticipations(){
        $participants = $this->participantsProject()->get();

        $totalParticipations = 0;

        foreach ($participants as $participant) {
            $totalParticipations += $participant->participations_current;
        }

        return $totalParticipations;
    }

    public function getHasPaymentInvoices(){

        foreach($this->projectRevenues as $revenue){
            foreach ($revenue->distribution as $distribution) {
                if($distribution->paymentInvoices()->count() > 0){
                    return true;
                }
            }
        }

        return false;
    }

    public function participantMutations()
    {
        return $this->hasManyThrough(ParticipantMutation::class ,ParticipantProject::class, 'project_id', 'participation_id');
    }

    public function calculator()
    {
        return new ProjectCalculator($this);
    }

    public function currentBookWorth()
    {
        $activeProjectValueCourse = $this->projectValueCourses()->where('active', 1)->first();
        if(!$activeProjectValueCourse) return null;

        return $activeProjectValueCourse->book_worth;
    }

    public function getcurrentBookWorthAttribute(){
        return $this->currentBookWorth();
    }

    public function getLastYearFinancialOverviewDefinitiveAttribute()
    {
        $financialOverviewProjectIds = $this->financialOverviewProjects()->where('definitive', true)->pluck('financial_overview_id')->toArray();;
        $financialOverviews = FinancialOverview::whereIn('id', $financialOverviewProjectIds)->get()->sortByDesc('year')->first();
        return $financialOverviews ? $financialOverviews->year : null;
    }

}
