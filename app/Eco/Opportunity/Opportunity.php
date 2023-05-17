<?php

namespace App\Eco\Opportunity;

use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\HousingFile\HousingFileSpecification;
use App\Eco\Intake\Intake;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Opportunity extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'opportunities';

    protected $appends = ['measuresDashSeperated'];

    protected $guarded = ['id'];
    //Relations
    public function measureCategory()
    {
        return $this->belongsTo(MeasureCategory::class);
    }

    public function measures()
    {
        return $this->belongsToMany(Measure::class);
    }

    public function intake()
    {
        return $this->belongsTo(Intake::class);
    }

    public function status()
    {
        return $this->belongsTo(OpportunityStatus::class);
    }

    public function evaluationRealised()
    {
        return $this->belongsTo(OpportunityEvaluationStatus::class,'evaluation_is_realised');
    }

    public function evaluationStatisfied()
    {
        return $this->belongsTo(OpportunityEvaluationStatus::class,'evaluation_is_statisfied');
    }

    public function housingFileSpecification()
    {
        return $this->belongsTo(HousingFileSpecification::class);
    }

    public function evaluationRecommendOrganisation()
    {
        return $this->belongsTo(OpportunityEvaluationStatus::class,'evaluation_would_recommend_organisation');
    }

    public function quotationRequests(){
        return $this->hasMany(QuotationRequest::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class);
    }

    public function updatedBy(){
        return $this->belongsTo(User::class);
    }

    // Only an unfinished task is a task
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    // A finished task is a note
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true)->orderBy('tasks.id', 'desc');
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails(){
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function getMeasuresDashSeperatedAttribute()
    {
        return implode('-', $this->measures->pluck('name' )->toArray() );
    }

    public function getName()
    {
        return $this->measureCategory->name . ' - ' . $this->status->name;
    }

    public function newEloquentBuilder($query)
    {
        return new OpportunityBuilder($query);
    }
}
