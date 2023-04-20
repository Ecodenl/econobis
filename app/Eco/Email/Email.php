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
use App\Helpers\Email\EmailInlineImagesService;
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
        'oldEmailId' => 'integer',
        'contactGroupId' => 'integer',
    ];

    public function mailbox()
    {
        return $this->belongsTo(Mailbox::class);
    }

    public function attachments()
    {
        return $this->hasMany(EmailAttachment::class);
    }

    public function attachmentsWithoutCids()
    {
        return $this->hasMany(EmailAttachment::class)->whereNull('cid');
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
        if (!$this->status) return null;

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

    public function groupEmailAddresses()
    {
        return $this->belongsToMany(EmailAddress::class, 'email_group_email_addresses');
    }

    public function sentByUser()
    {
        return $this->belongsTo(User::class, 'sent_by_user_id');
    }

    public function oldEmail()
    {
        return $this->belongsTo(Email::class);
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

    public function inlineImagesService(): EmailInlineImagesService
    {
        return new EmailInlineImagesService($this);
    }

    public function getCcAdresses()
    {
        return collect($this->cc)->map(function ($idOrEmailAddress) {
            return $this->mapIdOrEmailAddressToValueObject($idOrEmailAddress);
        })->filter(function ($value) {
            return $value !== null;
        })->values()
            ->toArray();
    }

    protected function mapIdOrEmailAddressToValueObject(mixed $idOrEmailAddress)
    {
        if (is_numeric($idOrEmailAddress)) {
            $emailAddress = EmailAddress::find($idOrEmailAddress);

            if (!$emailAddress) {
                return null;
            }

            return [
                'id' => $emailAddress->id,
                'name' => $emailAddress->contact->full_name . ' (' . $emailAddress->email . ')',
            ];
        }

        return [
            'id' => $idOrEmailAddress,
            'name' => $idOrEmailAddress,
        ];
    }
}
