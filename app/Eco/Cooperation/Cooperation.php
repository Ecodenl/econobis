<?php

namespace App\Eco\Cooperation;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\User\User;
use App\Http\Resources\Mailbox\MailboxPeek;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Cooperation extends Model
{
    use RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $casts = [
        'send_email' => 'boolean',
        'use_laposta' => 'bool',
        'use_export_address_consumption' => 'bool',
        'created_at' => 'date',
        'updated_at' => 'date',
        'deleted_at' => 'date',
        'require_two_factor_authentication' => 'bool',
    ];

    protected $encryptable = [
        'iban',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class, 'hoom_group_id');
    }

    public function emailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'hoom_email_template_id');
    }

    public function inspectionPlannedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_planned_email_template_id');
    }

    public function inspectionRecordedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_recorded_email_template_id');
    }

    public function inspectionPlannedMailbox()
    {
        return $this->belongsTo(Mailbox::class, 'inspection_planned_mailbox_id');
    }
}
