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

    public function participantsProjectDefinitive(){
        return $this->hasMany(ParticipantProject::class, 'project_id')->where(function ($query) {
            $query->where('participations_definitive', '>', 0)
                ->orWhere('amount_definitive', '>', 0);
        });
    }

    public function requiresContactGroups(){
        return $this->belongsToMany(ContactGroup::class, 'contact_group_participation', 'project_id', 'group_id');
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

    /**
     * Scope voor filteren van projecten voor portal users.
     *
     * Een portal user mag alleen projecten ophalen, waarbij
     * vandaag binnen de registratie start en eind datum ligt
     */
    public function scopeWhereAuthorizedForPortalUser($query)
    {
        $query->where(function ($query) {
            $query->whereDate('date_start_registrations', '<=', Carbon::today());
            $query->whereDate('date_end_registrations', '>=', Carbon::today());
        });
    }
}
