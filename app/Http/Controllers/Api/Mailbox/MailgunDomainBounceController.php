<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\MailgunDomain;
use App\Http\Traits\Mailgun\SystemMailboxSuppressionGuard;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Mailgun\Mailgun;

class MailgunDomainBounceController
{
    use AuthorizesRequests, SystemMailboxSuppressionGuard;

    public function index(MailgunDomain $mailgunDomain)
    {
        $this->authorize('update', MailgunDomain::class);

        $mailgunClient = Mailgun::create(
            $mailgunDomain->secret,
            'https://' . config('services.mailgun.endpoint')
        );

        $systemRecipients = $this->getSystemRecipients($mailgunDomain);

        $fetchedBounces = $mailgunClient
            ->suppressions()
            ->bounces()
            ->index($mailgunDomain->domain, 1000)
            ->getItems();

        return collect($fetchedBounces)
            ->filter(function ($bounce) use ($systemRecipients) {
                return !in_array(
                    mb_strtolower($bounce->getAddress()),
                    $systemRecipients,
                    true
                );
            })
            ->map(function ($bounce) {
                return [
                    'address' => $bounce->getAddress(),
                    'error' => $bounce->getError(),
                    'date' => Carbon::instance($bounce->getCreatedAt())
                        ->setTimezone('Europe/Amsterdam')
                        ->format('d-m-Y H:i:s'),
                ];
            })
            ->values();
    }

    public function create(MailgunDomain $mailgunDomain, Request $request)
    {
        $this->authorize('update', MailgunDomain::class);

        $address = (string) $request->input('address');
        $this->abortIfSystemRecipient($mailgunDomain, $address, 'System or not active mailbox bounces are not managed here.');

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->create($mailgunDomain->domain, $address, [
            'error' => $request->error,
        ]);
    }

    public function delete(MailgunDomain $mailgunDomain, $address)
    {
        $this->authorize('update', MailgunDomain::class);

        $this->abortIfSystemRecipient($mailgunDomain, (string) $address, 'System or not active mailbox bounces are not managed here.');

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->delete($mailgunDomain->domain, $address);
    }

}