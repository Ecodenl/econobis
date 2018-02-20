<?php

namespace App\Eco\Opportunity;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Measure\Measure;
use App\Eco\Intake\Intake;
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
    public function measure()
    {
        return $this->belongsTo(Measure::class);
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

    // Only unfinished task is a task. A finished task is a note
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', 0);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
