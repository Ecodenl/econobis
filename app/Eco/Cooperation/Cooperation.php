<?php

namespace App\Eco\Cooperation;

use App\Eco\Campaign\Campaign;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailTemplate\EmailTemplate;
use App\Eco\Mailbox\Mailbox;
use App\Eco\User\User;
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
        'create_contacts_for_report_table' => 'bool',
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

    public function hoomCampaigns()
    {
        return $this->hasMany(CooperationHoomCampaign::class, );
    }

    public function emailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'hoom_email_template_id');
    }

    public function hoomMailbox()
    {
        return $this->belongsTo(Mailbox::class, 'hoom_mailbox_id');
    }

    // todo WM: opschonen inspection* velden
    public function inspectionPlannedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_planned_email_template_id');
    }
    public function inspectionRecordedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_recorded_email_template_id');
    }
    public function inspectionReleasedEmailTemplate()
    {
        return $this->belongsTo(EmailTemplate::class, 'inspection_released_email_template_id');
    }
    public function inspectionPlannedMailbox()
    {
        return $this->belongsTo(Mailbox::class, 'inspection_planned_mailbox_id');
    }

    public function getFontFamilyDefault()
    {
        return $this->font_family_default ? $this->font_family_default : 'Times';
    }

    public function getFontSizeDefault()
    {
        return $this->font_size_default ? $this->font_size_default : 16;
    }

    public function getFontColorDefault()
    {
        return $this->font_color_default ? $this->font_color_default : '#000000';
    }
}
