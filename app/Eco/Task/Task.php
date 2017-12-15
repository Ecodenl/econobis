<?php

namespace App\Eco\Task;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Registration\Registration;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Task extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = [
        'date_planned',
        'date_started',
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
    public function registration()
    {
        return $this->belongsTo(Registration::class);
    }

    /**
     * optional
     */
    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
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
}
