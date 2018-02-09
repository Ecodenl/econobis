<?php

namespace App\Eco\Task;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Intake\Intake;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;
use Carbon\Carbon;

class Task extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = [
        'date_planned',
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
     * required
     */
    public function getStatus()
    {
        return TaskStatus::getById($this->status_id);
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
    public function createdBy()
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
    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    /**
     *
     */
    public function properties()
    {
        return $this->hasMany(TaskPropertyValue::class);
    }

    /**
     *
     */
    public function datePlannedWithStartTime()
    {
        $datePlanned = new Carbon($this->date_planned);

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
        $datePlanned = new Carbon($this->date_planned);

        if($this->end_time_planned) {
            $endTimePlanned = new Carbon($this->end_time_planned);

            $datePlanned->setTime($endTimePlanned->hour, $endTimePlanned->minute);
        }

        return $datePlanned;
    }
}
