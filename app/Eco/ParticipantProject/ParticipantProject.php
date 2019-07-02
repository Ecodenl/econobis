<?php

namespace App\Eco\ParticipantProject;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationStatus;
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

    public function mutations()
    {
        return $this->hasMany(ParticipantMutation::class, 'participation_id')->orderBy('id', 'desc');
    }

    public function mutationsDefinitive()
    {
        $mutationStatusFinal = (ParticipantMutationStatus::where('code_ref', 'final')->first())->id;

        return $this->hasMany(ParticipantMutation::class, 'participation_id')->where('status_id', $mutationStatusFinal)->orderBy('date_entry', 'asc');
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

    // Return collection with unique mutation statuses
    public function getUniqueMutationStatusesAttribute()
    {
        $mutationStatuses = [];

        foreach($this->mutations->unique('status_id')->sortBy('status_id') as $mutation) {
            if(!$mutation->status) continue;

            $mutationStatuses[] = $mutation->status;
        }

        return $mutationStatuses;
    }

    public function getParticipationsReturnsTotalAttribute()
    {
        $total = 0;

        foreach($this->mutations as $mutation) {
            $total += $mutation->returns;
        }

        return $total;
    }

    public function getParticipationsReturnsKwhTotalAttribute()
    {
        $total = 0;

        foreach($this->mutations as $mutation) {
            $total += $mutation->payout_kwh;
        }

        return $total;
    }

    public function getParticipationsIndicationOfRestitutionEnergyTaxTotalAttribute()
    {
        $total = 0;

        foreach($this->mutations as $mutation) {
            $total += $mutation->indication_of_restitution_energy_tax;
        }

        return $total;
    }
}
