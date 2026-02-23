<?php

namespace App\Http\Traits\Mailgun;

use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailgunDomain;

trait SystemMailboxSuppressionGuard
{
    /**
     * Cache per request/controller instance: [mailgun_domain_id => [emails...]]
     */
    private array $systemRecipientsCache = [];

    /**
     * Returns active system mailbox email addresses for a Mailgun domain (lowercased).
     */
    protected function getSystemRecipients(MailgunDomain $mailgunDomain): array
    {
        $key = (int) $mailgunDomain->id;

        if (array_key_exists($key, $this->systemRecipientsCache)) {
            return $this->systemRecipientsCache[$key];
        }

        return $this->systemRecipientsCache[$key] = Mailbox::query()
            ->where('mailgun_domain_id', $mailgunDomain->id)
            ->where('is_system_mailbox', true)
            ->pluck('email')
            ->map(fn ($e) => mb_strtolower($e))
            ->all();
    }

    /**
     * Abort if the given address belongs to an active system mailbox for this Mailgun domain.
     */
    protected function abortIfSystemRecipient(MailgunDomain $mailgunDomain, ?string $address, string $message): void
    {
        $address = mb_strtolower(trim((string) $address));

        if ($address === '') {
            // Validatie hoort elders; hier niet blokkeren.
            return;
        }

        if (in_array($address, $this->getSystemRecipients($mailgunDomain), true)) {
            abort(403, $message);
        }
    }
}