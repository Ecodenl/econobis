<?php

namespace App\Eco\Task;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Document\Document;
use App\Eco\Email\Email;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Intake\Intake;
use App\Eco\Team\Team;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laracasts\Presenter\PresentableTrait;
use Venturecraft\Revisionable\RevisionableTrait;
use Carbon\Carbon;

class Task extends Model
{
    use RevisionableTrait, SoftDeletes, PresentableTrait;

    protected $presenter = TaskPresenter::class;

    protected $guarded = ['id'];

    protected $dates = [
        'date_planned_start',
        'date_planned_finish',
        'date_finished',
        'created_at',
        'updated_at',
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
     * required
     */
    public function responsibleUser()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * required
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
        return $this->hasMany(Document::class);
    }

    public function emailsIn(){
        return $this->hasMany(Email::class)->where('folder', '=', 'inbox');
    }

    public function emailsOut(){
        return $this->hasMany(Email::class)->where('folder', '=', 'sent');
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
            // With no end time planned and date planned start is not equal date planned finish add 1 hour
            } else if ($this->date_planned_start != $this->date_planned_finish && $this->date_planned_finish != null) {
                    $datePlanned->setTime(01, 00);
            }
        }

        return $datePlanned;
    }
}
