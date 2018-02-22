<?php

namespace App\Eco\Intake;

use App\Eco\Address\Address;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Intake extends Model
{

    protected $table = 'intakes';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'address_id', 'status_id',
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
        return $this->belongsToMany(IntakeSource::class, 'intake_source', 'intake_id', 'source_id');
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
        return $this->hasMany(Task::class)->where('finished', false);
    }

    // A finished task is a note. An unfinished task is a task.
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }
}
