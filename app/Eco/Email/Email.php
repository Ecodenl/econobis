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
use App\Helpers\Email\EmailGeneratorService;
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

    /**
     * Bijlages met cid zijn de inline images.
     */
    public function inlineImageAttachments()
    {
        return $this->hasMany(EmailAttachment::class)->whereNotNull('cid');
    }

    /**
     * De bijlages zonder cid zijn de bijlages die als "echte" bijlage worden meegestuurd.
     */
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

    public function getCcAddresses()
    {
        return collect($this->cc)->map(function ($idOrEmailAddress) {
            return $this->mapIdOrEmailAddressToValueObject($idOrEmailAddress);
        })->filter(function ($value) {
            return $value !== null;
        })->values()
            ->toArray();
    }

    public function getToAddresses()
    {
        return collect($this->to)->map(function ($idOrEmailAddress) {
            return $this->mapIdOrEmailAddressToValueObject($idOrEmailAddress);
        })->filter(function ($value) {
            return $value !== null;
        })->values()
            ->toArray();
    }

    public function getBccAddresses()
    {
        return collect($this->bcc)->map(function ($idOrEmailAddress) {
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
                'name' => $emailAddress->contact->full_name,
                'email' => $emailAddress->email,
                'id' => $emailAddress->id,
            ];
        }

        return [
            'name' => $idOrEmailAddress,
            'email' => $idOrEmailAddress,
            'id' => $idOrEmailAddress, // Het AsyncSelectSet React component gebruikt emailadres ook in 'id', dus dit ook zo teruggeven vanuit api.
        ];
    }

    public function getResponsibleName()
    {
        if ($this->responsibleUser) {
            return $this->responsibleUser->present()->fullName();
        }

        if ($this->responsibleTeam) {
            return $this->responsibleTeam->name;
        }

        return null;
    }

    public function generator()
    {
        return new EmailGeneratorService($this);
    }

    public function copyEmailAddressToContacts()
    {
        if (Mailbox::where('email', $this->from)->exists()) {
            return;
        }

        if ($this->mailbox->ignoresEmailAddress($this->from)) {
            return;
        }

        foreach ($this->contacts as $contact) {
            if ($contact->emailAddresses()->where('email', $this->from)->exists()) {
                continue;
            }

            $emailAddress = new EmailAddress();
            $emailAddress->email = $this->from;
            $emailAddress->type_id = 'general';
            $emailAddress->contact_id = $contact->id;
            $emailAddress->save();
        }
    }
}
