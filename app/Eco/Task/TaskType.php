<?php

namespace App\Eco\Task;

use App\Eco\EmailTemplate\EmailTemplate;
use Illuminate\Database\Eloquent\Model;

class TaskType extends Model
{

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function emailTemplateWorkflowCompletedTask()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf_completed_task');
    }
    public function emailTemplateWorkflowExpiredTask()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf_expired_task');
    }
    public function emailTemplateWorkflowNewTask()
    {
        return $this->belongsTo(EmailTemplate::class, 'email_template_id_wf_new_task');
    }

}
