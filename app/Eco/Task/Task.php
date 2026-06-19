<?php

namespace App\Eco\Task;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Invoice\Invoice;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Intake\Intake;
use App\Eco\Order\Order;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Project\Project;
use App\Eco\Team\Team;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;
use Carbon\Carbon;

class Task extends Model
{
    use RevisionableTrait, PresentableTrait, SoftDeletes, HasFactory;

    protected $presenter = TaskPresenter::class;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * required
     */
    public function type()
    {
        return $this->belongsTo(TaskType::class);
    }

    /**
     * optional
     */
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    /**
     * optional
     */
    public function intake()
    {
        return $this->belongsTo(Intake::class);
    }

    /**
     * optional
     */
    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    /**
     * optional
     */
    public function housingFile()
    {
        return $this->belongsTo(HousingFile::class);
    }

    /**
     * optional
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * optional
     */
    public function participant()
    {
        return $this->belongsTo(ParticipantProject::class, 'participation_project_id', 'id');
    }

    /**
     * optional
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * optional
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    /**
     * optional
     */
    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    /**
     * optional
     */
    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }

    /**
     * optional
     */
    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * optional
     */
    public function responsibleTeam()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * required
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * required
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * optional
     */
    public function finishedBy()
    {
        return $this->belongsTo(User::class);
    }

    /**
     *
     */
    public function properties()
    {
        return $this->hasMany(TaskPropertyValue::class);
    }

    public function documents(){
        return $this->hasMany(Document::class)->orderBy('documents.id', 'desc');
    }

    public function emails(){
        return $this->hasMany(Email::class)->orderBy('emails.id', 'desc');
    }

    // Tasks can relate to another task. Only an unfinished task is a task
    public function tasks()
    {
        return $this->hasMany(Task::class)->where('finished', false)->orderBy('tasks.id', 'desc');
    }

    // A finished task is a note
    public function notes()
    {
        return $this->hasMany(Task::class)->where('finished', true)->orderBy('tasks.id', 'desc');
    }

    /**
     *
     */
    public function datePlannedWithStartTime()
    {
        $datePlanned = new Carbon($this->date_planned_start);

        if($this->start_time_planned) {
            $startTimePlanned = new Carbon($this->start_time_planned);

            $datePlanned->setTime($startTimePlanned->hour, $startTimePlanned->minute);
        }

        return $datePlanned;
    }

    /**
     *
     */
    public function datePlannedWithEndTime()
    {
        // With no date planned finish, date planned is equal to date planned start
        if($this->date_planned_finish) {
            $datePlanned = new Carbon($this->date_planned_finish);
        } else {
            $datePlanned = new Carbon($this->date_planned_start);
        }

        // With end time planned, end time is equal to end time
        if($this->end_time_planned) {
            $endTimePlanned = new Carbon($this->end_time_planned);

            $datePlanned->setTime($endTimePlanned->hour, $endTimePlanned->minute);
        } else {
            // With no end time planned, end time is equal to start time
            if($this->start_time_planned) {
                $endTimePlanned = new Carbon($this->start_time_planned);

                $datePlanned->setTime($endTimePlanned->hour, $endTimePlanned->minute);
            // end_time_planned and start_time_planned empty, date_planned_start and date_planned_finished not empty and not equal
            } else if ($this->date_planned_start != $this->date_planned_finish && $this->date_planned_finish != null) {
                    $datePlanned->setTime(01, 00);
            }
        }

        return $datePlanned;
    }

    public function newEloquentBuilder($query)
    {
        return new TaskBuilder($query);
    }
}
