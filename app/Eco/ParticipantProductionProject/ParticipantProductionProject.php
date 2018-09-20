<?php

namespace App\Eco\ParticipantProductionProject;

use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\ParticipantTransaction\ParticipantTransaction;
use App\Eco\ProductionProject\ProductionProject;
use App\Eco\ProductionProject\ProductionProjectRevenueDistribution;
use App\Eco\Task\Task;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class ParticipantProductionProject extends Model
{
    use RevisionableTrait, Encryptable, SoftDeletes;

    protected $table = 'participation_production_project';

    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $encryptable = [
        'iban_payed',
        'iban_payout'
    ];

    protected $appends = [
            'participations_worth_total',
            'participations_current',
        ];

    //relations
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function productionProject()
    {
        return $this->belongsTo(ProductionProject::class);
    }

    public function participantProductionProjectStatus()
    {
        return $this->belongsTo(ParticipantProductionProjectStatus::class, 'status_id');
    }

    public function participantProductionProjectPayoutType()
    {
        return $this->belongsTo(ParticipantProductionProjectPayoutType::class, 'type_id');
    }

    public function giftedByContact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function legalRepContact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function productionProjectRevenueDistributions()
    {
        return $this->hasMany(ProductionProjectRevenueDistribution::class, 'participation_id');
    }

    public function transactions()
    {
        return $this->hasMany(ParticipantTransaction::class, 'participation_id')->orderBy('date_transaction', 'desc');
    }

    public function obligationNumbers()
    {
        return $this->hasMany(ObligationNumber::class, 'participation_id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'participation_production_project_id')->orderBy('documents.id', 'desc');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'participation_production_project_id');
    }

    //appends
    public function getParticipationsWorthTotalAttribute()
    {
        return $this->participations_current * $this->productionProject->participation_worth;
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
}
