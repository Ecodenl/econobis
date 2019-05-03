<?php

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Eco\Project\Project;
use App\Eco\Project\ProjectRevenueDistribution;
use App\Eco\Task\Task;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantProject extends Model
{
    use RevisionableTrait, Encryptable, SoftDeletes;

    protected $table = 'participation_project';

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $encryptable = [
        'iban_payout'
    ];

    //relations
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function participantProjectStatus()
    {
        return $this->belongsTo(ParticipantProjectStatus::class, 'status_id');
    }

    public function participantProjectPayoutType()
    {
        return $this->belongsTo(ParticipantProjectPayoutType::class, 'type_id');
    }

    public function giftedByContact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function legalRepContact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function projectRevenueDistributions()
    {
        return $this->hasMany(ProjectRevenueDistribution::class, 'participation_id');
    }

    public function transactions()
    {
        return $this->hasMany(ParticipantTransaction::class, 'participation_id')->orderBy('date_transaction', 'desc');
    }

    public function mutations()
    {
        return $this->hasMany(ParticipantMutation::class, 'participation_id')->orderBy('id', 'desc');
    }

    public function obligationNumbers()
    {
        return $this->hasMany(ObligationNumber::class, 'participation_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'participation_project_id')->orderBy('documents.id', 'desc');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'participation_project_id');
    }

    //appends
    public function getParticipationsWorthTotalAttribute()
    {
        return $this->participations_current * $this->project->participation_worth;
    }

    public function getParticipationsCurrentAttribute()
    {
        //also change observer
        if ($this->status_id === 2) {
            return $this->participations_granted - $this->participations_sold;
        } else {
            return 0;
        }
    }

    public function calculator()
    {
        return new ParticipantProjectCalculator($this);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }
}
