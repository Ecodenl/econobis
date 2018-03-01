<?php

namespace App\Eco\Opportunity;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Intake\Intake;
use App\Eco\Measure\MeasureCategory;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Opportunity extends Model
{
    use RevisionableTrait;

    protected $table = 'opportunities';

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
        return $this->hasMany(Task::class)->where('finished', false);
    }

    // A finished task is a note
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function opportunityEvaluation()
    {
        return $this->hasOne(OpportunityEvaluation::class);
    }
}
