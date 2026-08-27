<?php

namespace App\Helpers\Mail;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PendingMailHelper
{
    protected $mailbox = null;
    protected array $to = [];
    protected array $cc = [];
    protected array $bcc = [];
    protected ?string $locale = null;
    protected ?array $from = null;

    public function fromMailbox($mailbox): self
    {
        $this->mailbox = $mailbox;

        return $this;
    }

    public function to($users): self
    {
        $this->to = array_merge($this->to, $this->normalizeRecipients($users));

        return $this;
    }

    public function cc($users): self
    {
        $this->cc = array_merge($this->cc, $this->normalizeRecipients($users));

        return $this;
    }

    public function bcc($users): self
    {
        $this->bcc = array_merge($this->bcc, $this->normalizeRecipients($users));

        return $this;
    }

    public function locale($locale): self
    {
        $this->locale = $locale;

        return $this;
    }

    public function from($address, $name = null): self
    {
        $this->from = [
            'address' => $address,
            'name' => $name,
        ];

        return $this;
    }

    public function send($mailable = null)
    {
        $filteredRecipients = $this->getFilteredRecipients();
        $skipReason = $this->getSkipReason($filteredRecipients);

        if ($this->hasBlockedRecipients($filteredRecipients)) {
            $this->logBlockedRecipients('send', $mailable, $filteredRecipients);
        }

        if ($skipReason !== null) {
            $this->logSkipped('send', $mailable, [
                'reason' => $skipReason,
                'blocked_to' => $filteredRecipients['blocked_to'],
                'blocked_cc' => $filteredRecipients['blocked_cc'],
                'blocked_bcc' => $filteredRecipients['blocked_bcc'],
            ]);

            return true;
        }

        $pendingMail = $this->buildPendingMail($filteredRecipients);

        return $pendingMail->send($mailable);
    }

    public function queue($mailable = null)
    {
        $filteredRecipients = $this->getFilteredRecipients();
        $skipReason = $this->getSkipReason($filteredRecipients);

        if ($this->hasBlockedRecipients($filteredRecipients)) {
            $this->logBlockedRecipients('queue', $mailable, $filteredRecipients);
        }

        if ($skipReason !== null) {
            $this->logSkipped('queue', $mailable, [
                'reason' => $skipReason,
                'blocked_to' => $filteredRecipients['blocked_to'],
                'blocked_cc' => $filteredRecipients['blocked_cc'],
                'blocked_bcc' => $filteredRecipients['blocked_bcc'],
            ]);

            return true;
        }

        $pendingMail = $this->buildPendingMail($filteredRecipients);

        return $pendingMail->queue($mailable);
    }

    public function later($delay, $mailable = null)
    {
        $filteredRecipients = $this->getFilteredRecipients();
        $skipReason = $this->getSkipReason($filteredRecipients);

        if ($this->hasBlockedRecipients($filteredRecipients)) {
            $this->logBlockedRecipients('later', $mailable, $filteredRecipients);
        }

        if ($skipReason !== null) {
            $this->logSkipped('later', $mailable, [
                'reason' => $skipReason,
                'delay' => $delay,
                'blocked_to' => $filteredRecipients['blocked_to'],
                'blocked_cc' => $filteredRecipients['blocked_cc'],
                'blocked_bcc' => $filteredRecipients['blocked_bcc'],
            ]);

            return true;
        }

        $pendingMail = $this->buildPendingMail($filteredRecipients);

        return $pendingMail->later($delay, $mailable);
    }

    /**
     * @return \Illuminate\Mail\PendingMail|\Illuminate\Mail\Mailer
     */
    protected function buildPendingMail(array $filteredRecipients)
    {
        /** @var \Illuminate\Mail\PendingMail|\Illuminate\Mail\Mailer $pendingMail */
        $pendingMail = $this->mailbox
            ? Mail::fromMailbox($this->mailbox)
            : Mail::mailer();

        if (!empty($filteredRecipients['to'])) {
            $pendingMail = $pendingMail->to($filteredRecipients['to']);
        }

        if (!empty($filteredRecipients['cc'])) {
            $pendingMail = $pendingMail->cc($filteredRecipients['cc']);
        }

        if (!empty($filteredRecipients['bcc'])) {
            $pendingMail = $pendingMail->bcc($filteredRecipients['bcc']);
        }

        if ($this->locale) {
            $pendingMail = $pendingMail->locale($this->locale);
        }

        if ($this->from) {
            $pendingMail = $pendingMail->from($this->from['address'], $this->from['name']);
        }

        return $pendingMail;
    }

    protected function normalizeRecipients($users): array
    {
        if (empty($users)) {
            return [];
        }

        if (!is_array($users)) {
            $users = [$users];
        }

        $result = [];

        foreach ($users as $user) {
            if (is_string($user)) {
                $result[] = $user;
                continue;
            }

            if (is_object($user) && method_exists($user, 'getEmail')) {
                $result[] = $user->getEmail();
                continue;
            }

            if (is_array($user) && isset($user['email'])) {
                $result[] = $user['email'];
            }
        }

        return array_values(array_filter($result));
    }

    protected function getSkipReason(array $filteredRecipients): ?string
    {
        $allAllowedRecipients = array_merge(
            $filteredRecipients['to'],
            $filteredRecipients['cc'],
            $filteredRecipients['bcc']
        );

        if (empty($allAllowedRecipients)) {
            return 'no_allowed_recipients';
        }

        return null;
    }

    protected function filterRecipientList(array $recipients): array
    {
        $allowed = [];
        $blocked = [];

        foreach ($recipients as $email) {
            if (MailHelper::shouldSendTo($email)) {
                $allowed[] = $email;
            } else {
                $blocked[] = $email;
            }
        }

        return [$allowed, $blocked];
    }

    protected function getFilteredRecipients(): array
    {
        [$allowedTo, $blockedTo] = $this->filterRecipientList($this->to);
        [$allowedCc, $blockedCc] = $this->filterRecipientList($this->cc);
        [$allowedBcc, $blockedBcc] = $this->filterRecipientList($this->bcc);

        return [
            'to' => $allowedTo,
            'cc' => $allowedCc,
            'bcc' => $allowedBcc,
            'blocked_to' => $blockedTo,
            'blocked_cc' => $blockedCc,
            'blocked_bcc' => $blockedBcc,
        ];
    }

    protected function logBlockedRecipients(string $method, $mailable = null, array $filteredRecipients = []): void
    {
        Log::info('Geblokkeerde ontvangers verwijderd uit mailverzending.', [
            'mailbox_id' => $this->mailbox->id ?? null,
            'subject' => method_exists($mailable, 'subject') ? $mailable->subject : null,
            'method' => $method,
            'to' => $filteredRecipients['to'] ?? [],
            'cc' => $filteredRecipients['cc'] ?? [],
            'bcc' => $filteredRecipients['bcc'] ?? [],
            'blocked_to' => $filteredRecipients['blocked_to'] ?? [],
            'blocked_cc' => $filteredRecipients['blocked_cc'] ?? [],
            'blocked_bcc' => $filteredRecipients['blocked_bcc'] ?? [],
            'mailable' => is_object($mailable) ? get_class($mailable) : null,
        ]);
    }
    protected function logSkipped(string $method, $mailable = null, array $extra = []): void
    {
        Log::info('Mail niet verzonden.', array_merge([
            'method' => $method,
            'mailbox_id' => $this->mailbox->id ?? null,
            'to' => $this->to,
            'cc' => $this->cc,
            'bcc' => $this->bcc,
            'mailable' => is_object($mailable) ? get_class($mailable) : null,
        ], $extra));
    }

    protected function hasBlockedRecipients(array $filteredRecipients): bool
    {
        return !empty($filteredRecipients['blocked_to'])
            || !empty($filteredRecipients['blocked_cc'])
            || !empty($filteredRecipients['blocked_bcc']);
    }
}