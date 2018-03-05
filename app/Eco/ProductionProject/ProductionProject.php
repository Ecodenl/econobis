<?php

namespace App\Eco\ProductionProject;

use App\Eco\Address\Address;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
use App\Eco\ParticipantProductionProject\ParticipantProductionProject;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class ProductionProject extends Model
{
    use RevisionableTrait;

    protected $table = 'production_projects';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $appends
        = [
            'issued_participations',
            'issued_participations_percentage',
            'participations_in_option',
            'issuable_participations',
            'participations_worth_total',
        ];

    protected $dates = [
        'date_start',
        'date_production',
        'date_start_registrations',
        'date_end_registrations'
    ];

    //relations
    public function productionProjectStatus(){
        return $this->belongsTo(ProductionProjectStatus::class);
    }

    public function productionProjectType(){
        return $this->belongsTo(ProductionProjectType::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false);
    }

    public function documents(){
        return $this->hasMany(Document::class);
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function ownedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function productionProjectValueCourses(){
        return $this->hasMany(ProductionProjectValueCourse::class);
    }

    public function productionProjectRevenues(){
        return $this->hasMany(ProductionProjectRevenue::class);
    }

    public function participantsProductionProject(){
        return $this->hasMany(ParticipantProductionProject::class);
    }

    //Appended fields
    public function getIssuedParticipationsAttribute()
    {
        $amountOfParticipations = 0;

        $participationsIssued =  $this->participantsProductionProject()->where('status_id', 2)->get();

        foreach ($participationsIssued as $participationIssued){
            $amountOfParticipations += ($participationIssued->participations_granted - $participationIssued->participations_sold);
        }
        return $amountOfParticipations;
    }

    public function getParticipationsInOptionAttribute()
    {
        $amountOfParticipations = 0;

        $participationsInOption =  $this->participantsProductionProject()->where('status_id', 1)->get();

        foreach ($participationsInOption as $participationInOption){
            $amountOfParticipations += ($participationInOption->participations_granted - $participationInOption->participations_sold);
        }
        return $amountOfParticipations;
    }

    public function getIssuableParticipationsAttribute()
    {
        return $this->total_participations - $this->issued_participations;
    }

    public function getParticipationsWorthTotalAttribute()
    {
        return $this->issued_participations * $this->participation_worth;
    }

    public function getIssuedParticipationsPercentageAttribute()
    {
        if(!$this->total_participations || $this->total_participations == 0){
            return 0;
        }
        return ($this->issued_participations / $this->total_participations) * 100;
    }
}
