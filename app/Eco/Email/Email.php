<?php

namespace App\Eco\Email;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Intake\Intake;
use App\Eco\Invoice\Invoice;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Order\Order;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Task\Task;
use App\Eco\Team\Team;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Email extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'date_sent' => 'datetime',
        'date_closed' => 'datetime',
        'date_removed' => 'datetime',
        'to' => 'array',
        'cc' => 'array',
        'bcc' => 'array',
        'replyTypeId' => 'string',
    ];

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }

    public function attachments()
    {
        return $this->hasMany(EmailAttachment::class);
    }

    public function contacts()
    {
        return $this->belongsToMany(Contact::class);
    }

    public function closedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function removedBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getStatus()
    {
        if(!$this->status) return null;

        return EmailStatus::get($this->status);
    }

    public function intake()
    {
        return $this->belongsTo(Intake::class);
    }

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function quotationRequest()
    {
        return $this->belongsTo(QuotationRequest::class);
    }

    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function groupEmailAddresses(){
        return $this->belongsToMany(EmailAddress::class, 'email_group_email_addresses');
    }

    public function sentByUser(){
        return $this->belongsTo(User::class, 'sent_by_user_id');
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
}
