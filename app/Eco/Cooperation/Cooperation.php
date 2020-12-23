<?php

namespace App\Eco\Cooperation;

use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailTemplate\EmailTemplate;
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
        'created_at' => 'date',
        'updated_at' => 'date',
        'deleted_at' => 'date',
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
}
