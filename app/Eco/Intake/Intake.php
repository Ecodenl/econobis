<?php

namespace App\Eco\Intake;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Intake extends Model
{
    use RevisionableTrait, SoftDeletes, HasFactory;

    protected $table = 'intakes';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function status()
    {
        return $this->belongsTo(IntakeStatus::class,'intake_status_id');
    }

    public function sources()
    {
        return $this->belongsToMany(IntakeSource::class, 'intake_source', 'intake_id', 'source_id')
            ->orderBy('id');
    }

    public function reasons()
    {
        return $this->belongsToMany(IntakeReason::class, 'intake_reason', 'intake_id', 'reason_id');
    }

    public function measuresRequested(){
        return $this->belongsToMany(MeasureCategory::class, 'intake_measure_requested');
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    // Only unfinished task is a task. A finished task is a note
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    // A finished task is a note. An unfinished task is a task.
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true)->orderBy('tasks.id', 'desc');
    }

    public function documents()
    {
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails()
    {
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function setStatusToInBehandeling()
    {
        $statusIdToUse = IntakeStatus::where('code_ref', 'in_progress')->first()->id;
        $this->intake_status_id = $statusIdToUse;
        $this->save();
    }

    public function updateStatusToAfgeslotenMetKans()
    {
        $statusIdToUse = IntakeStatus::where('code_ref', 'closed_with_opportunity')->first()->id;

        if($this->checkIfAllMeasureRequestedHaveOpportunity()){
            $this->intake_status_id = $statusIdToUse;
            $this->save();
        }
    }

    public function getName()
    {
        return 'Intake: ' . $this->id . ' voor ' . $this->contact->full_name;
    }

    private function checkIfAllMeasureRequestedHaveOpportunity()
    {
        $canUpdateStatus = true;

        $intakeOpportunities = $this->opportunities;
        $intakeMeasuresRequested = $this->measuresRequested;
        $measurementCategories = $intakeMeasuresRequested->modelKeys();

        foreach ($measurementCategories as $categoryId){
            if(count($intakeOpportunities->where('measure_category_id', $categoryId)->all()) == 0) $canUpdateStatus = false;
        }

        return $canUpdateStatus;
    }

    public function newEloquentBuilder($query)
    {
        return new IntakeBuilder($query);
    }

    public function getCampaignsToSelect()
    {
        return Campaign::where('status_id', '!=', Campaign::STATUS_CLOSED)->orWhere('id', $this->campaign_id)->get();
    }
}
