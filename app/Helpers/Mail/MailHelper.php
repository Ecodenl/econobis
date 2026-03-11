<?php

namespace App\Helpers\Mail;

class MailHelper
{
    public static function to($users): PendingMailHelper
    {
        return (new PendingMailHelper())->to($users);
    }

    public static function fromMailbox($mailbox): PendingMailHelper
    {
        return (new PendingMailHelper())->fromMailbox($mailbox);
    }

    public static function shouldSendTo(?string $email): bool
    {
        if (!$email) {
            return false;
        }

        $email = mb_strtolower(trim($email));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        $parts = explode('@', $email);
        $domain = $parts[1] ?? null;

        if (!$domain) {
            return false;
        }

        return !in_array(
            $domain,
            config('mail.blocked_recipient_domains', []),
            true
        );
    }
}