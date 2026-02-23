<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\MailgunDomain;
use App\Http\Traits\Mailgun\MailgunDomainSuppressionGuard;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Mailgun\Mailgun;

class MailgunDomainComplaintController
{
    use AuthorizesRequests, MailgunDomainSuppressionGuard;

    public function index(MailgunDomain $mailgunDomain)
    {
        $this->authorize('update', MailgunDomain::class);

        $this->abortIfSystemMailgunDomain(
            $mailgunDomain,
            'System mailgun domain suppressions are not available.'
        );

        $mailgunClient = Mailgun::create(
            $mailgunDomain->secret,
            'https://' . config('services.mailgun.endpoint')
        );

        $fetchedComplaints = $mailgunClient
            ->suppressions()
            ->complaints()
            ->index($mailgunDomain->domain)
            ->getItems();

        return collect($fetchedComplaints)
            ->map(function ($complaint) {
                return [
                    'address' => $complaint->getAddress(),
                    'date' => Carbon::instance($complaint->getCreatedAt())
                        ->setTimezone('Europe/Amsterdam')
                        ->format('d-m-Y H:i:s'),
                ];
            })
            ->values();
    }

    public function create(MailgunDomain $mailgunDomain, Request $request)
    {
        $this->authorize('update', MailgunDomain::class);

        $this->abortIfSystemMailgunDomain($mailgunDomain, 'System mailgun domain complaints are not managed here.');

        $address = (string) $request->input('address');

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->complaints()->create($mailgunDomain->domain, $address);
    }

    public function delete(MailgunDomain $mailgunDomain, $address)
    {
        $this->authorize('update', MailgunDomain::class);

        $this->abortIfSystemMailgunDomain($mailgunDomain, 'System mailgun domain complaints are not managed here.');

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->complaints()->delete($mailgunDomain->domain, $address);
    }


}