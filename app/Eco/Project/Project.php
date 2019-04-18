<?php

namespace App\Eco\Project;

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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

    public function requiresContactGroups(){
        return $this->belongsToMany(ContactGroup::class, 'contact_group_participation', 'project_id', 'group_id');
    }

    //Appended fields
    public function getIssuedParticipations()
    {
        $amountOfParticipations = 0;

        $participationsIssued =  $this->participantsProject()->where('status_id', 2)->get();

        foreach ($participationsIssued as $participationIssued){
            $amountOfParticipations += ($participationIssued->participations_granted - $participationIssued->participations_sold);
        }
        return $amountOfParticipations;
    }

    public function getParticipationsInOption()
    {
        $amountOfParticipations = 0;

        $participationsInOption =  $this->participantsProject()->where('status_id', 1)->get();

        foreach ($participationsInOption as $participationInOption){
            $amountOfParticipations += ($participationInOption->participations_granted - $participationInOption->participations_sold);
        }
        return $amountOfParticipations;
    }

    public function getIssuableParticipations()
    {
        return $this->total_participations - $this->getIssuedParticipations();
    }

    public function getParticipationsWorthTotal()
    {
        return $this->getIssuedParticipations() * $this->participation_worth;
    }

    public function getIssuedParticipationsPercentage()
    {
        if(!$this->total_participations || $this->total_participations == 0){
            return 0;
        }
        return ($this->getIssuedParticipations() / $this->total_participations) * 100;
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
}
