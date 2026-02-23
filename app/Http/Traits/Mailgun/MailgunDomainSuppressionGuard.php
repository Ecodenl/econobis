<?php

namespace App\Http\Traits\Mailgun;

use App\Eco\Mailbox\MailgunDomain;

trait MailgunDomainSuppressionGuard
{
    /**
     * Abort if this Mailgun domain is marked as a system domain.
     * For system domains we never fetch/show Mailgun events/bounces/complaints.
     */
    protected function abortIfSystemMailgunDomain(MailgunDomain $mailgunDomain, string $message): void
    {
        if ($mailgunDomain->is_system_mailgun_domain) {
            abort(403, $message);
        }
    }
}