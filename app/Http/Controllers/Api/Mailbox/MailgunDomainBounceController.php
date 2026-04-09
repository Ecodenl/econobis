<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\MailgunDomain;
use App\Http\Traits\Mailgun\MailgunDomainSuppressionGuard;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Mailgun\Mailgun;

class MailgunDomainBounceController
{
    use AuthorizesRequests, MailgunDomainSuppressionGuard;

    public function index(MailgunDomain $mailgunDomain)
    {
        $this->authorize('update', MailgunDomain::class);

        $this->abortIfSystemMailgunDomain(
            $mailgunDomain,
            'Bounces worden niet getoond voor dit Mailgun-domein omdat het is ingesteld als systeemdomein.'
        );

        $mailgunClient = Mailgun::create(
            $mailgunDomain->secret,
            'https://' . config('services.mailgun.endpoint')
        );

        $fetchedBounces = $mailgunClient
            ->suppressions()
            ->bounces()
            ->index($mailgunDomain->domain, 1000)
            ->getItems();

        return collect($fetchedBounces)
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

        $this->abortIfSystemMailgunDomain($mailgunDomain, 'System mailgun domain bounces are not managed here.');

        $address = (string) $request->input('address');

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->create($mailgunDomain->domain, $address, [
            'error' => $request->error,
        ]);
    }

    public function delete(MailgunDomain $mailgunDomain, $address)
    {
        $this->authorize('update', MailgunDomain::class);

        $this->abortIfSystemMailgunDomain($mailgunDomain, 'System mailgun domain bounces are not managed here.');

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->delete($mailgunDomain->domain, $address);
    }

}