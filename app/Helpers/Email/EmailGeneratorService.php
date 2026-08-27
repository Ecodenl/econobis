<?php

namespace App\Helpers\Email;

use App\Eco\Email\Email;
use App\Eco\EmailAddress\EmailAddress;

class EmailGeneratorService
{
    public function __construct(protected Email $email)
    {
    }

    public function reply(array $attributes = []): Email
    {
        $email = $this->getBaseReplyOrForwardEmail();
        $email->to = $this->matchEmailAddressesToIds([$this->email->from]);
        $email->cc = [];
        $email->reply_type_id = 'reply';
        $email->subject = 'Re: ' . $this->email->subject;
        $email->subject_for_filter = trim(mb_substr($email->subject ?? '', 0, 150));
        $email->fill($attributes);
        $email->save();

        $this->copyInlineImages($email);
        $this->attachPreviousContacts($email);

        return $email;
    }

    public function replyAll(array $attributes = []): Email
    {
        $to = collect($this->email->to)->filter(function ($toEmailAddress) {
            return $toEmailAddress !== $this->email->mailbox->email;
        })->push($this->email->from);

        $cc = collect($this->email->cc)->filter(function ($ccEmailAddress) {
            return $ccEmailAddress !== $this->email->mailbox->email;
        });

        $email = $this->getBaseReplyOrForwardEmail();
        $email->to = $this->matchEmailAddressesToIds($to->toArray());
        $email->cc = $this->matchEmailAddressesToIds($cc->toArray());
        $email->reply_type_id = 'reply-all';
        $email->subject = 'Re: ' . $this->email->subject;
        $email->subject_for_filter = trim(mb_substr($email->subject ?? '', 0, 150));
        $email->fill($attributes);
        $email->save();

        $this->copyInlineImages($email);
        $this->attachPreviousContacts($email);

        return $email;
    }

    public function forward(array $attributes = []): Email
    {
        $email = $this->getBaseReplyOrForwardEmail();
        $email->to = [];
        $email->cc = [];
        $email->bcc = [];
        $email->reply_type_id = 'forward';
        $email->subject = 'Fwd: ' . $this->email->subject;
        $email->subject_for_filter = trim(mb_substr($email->subject ?? '', 0, 150));
        $email->fill($attributes);
        $email->save();

        $this->copyAttachments($email);
        $this->copyInlineImages($email);
        $this->attachPreviousContacts($email);

        return $email;
    }

    protected function getBaseReplyOrForwardEmail()
    {
        return new Email([
            'from' => $this->email->mailbox->email,
            'bcc' => [],
            'old_email_id' => $this->email->id,
            'html_body' => $this->getHeaderInfoOldEmail() . $this->email->html_body,
            'mailbox_id' => $this->email->mailbox_id,
            'folder' => 'concept',
        ]);
    }

    protected function getHeaderInfoOldEmail(): string
    {
        return view('emails.old_email_header_info', [
            'email' => $this->email,
        ])->render();
    }

    protected function matchEmailAddressesToIds(array $emailAddresses)
    {
        $toMixed = [];

        foreach ($emailAddresses as $emailAddress) {
            $emailAddressesModel = null;

            /**
             * Als een email binnenkomt kan deze gekoppeld zijn aan meerdere contacten, door de gebruiker wordt dit dan meestal opgeschoond naar 1 contact.
             * Op het moment dat zo'n email wordt beantwoord, dan willen we deze email koppelen aan dit contact.
             *
             * Dus het emailadres eerst opzoeken in de gekoppelde contacten.
             * Mocht deze niet worden gevonden dan zoeken we binnen als fallback in alle contact emailadressen.
             */
            $contactModel = $this->email->contacts()->whereHas('emailAddresses', function ($query) use ($emailAddress) {
                $query->where('email', $emailAddress);
            })->first();

            if($contactModel){
                $emailAddressesModel = $contactModel->emailAddresses()->where('email', $emailAddress)->first();
            }

            if(!$emailAddressesModel){
                $emailAddressesModel = EmailAddress::where('email', $emailAddress)->first();
            }

            $toMixed[] = $emailAddressesModel ? $emailAddressesModel->id : $emailAddress;
        }

        return $toMixed;
    }

    protected function copyAttachments(Email $email)
    {
        foreach ($this->email->attachmentsWithoutCids as $attachment) {
            EmailAttachmentCopyService::copy($attachment, $email);
        }
    }

    protected function copyInlineImages(Email $email)
    {
        foreach ($this->email->inlineImageAttachments as $inlineImage) {
            EmailAttachmentCopyService::copy($inlineImage, $email);
        }
    }

    protected function attachPreviousContacts(Email $email)
    {
        $email->contacts()->sync($this->email->contacts()->pluck('contacts.id'));
    }
}