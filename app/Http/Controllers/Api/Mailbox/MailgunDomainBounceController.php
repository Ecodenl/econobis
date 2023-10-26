<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\MailgunDomain;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Mailgun\Mailgun;

class MailgunDomainBounceController
{
    use AuthorizesRequests;

    public function index(MailgunDomain $mailgunDomain)
    {
        $this->authorize('update', MailgunDomain::class);

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $fetchedBounces = $mailgunClient->suppressions()->bounces()->index($mailgunDomain->domain)->getItems();

        return collect($fetchedBounces)->map(function ($bounce) {
            return [
                'address' => $bounce->getAddress(),
                'error' => $bounce->getError(),
                'date' => Carbon::instance($bounce->getCreatedAt())->setTimezone('Europe/Amsterdam')->format('d-m-Y H:i:s'),
            ];
        });
    }

    public function create(MailgunDomain $mailgunDomain, Request $request)
    {
        $this->authorize('update', MailgunDomain::class);

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->create($mailgunDomain->domain, $request->input('address'), [
            'error' => $request->error,
        ]);
    }

    public function delete(MailgunDomain $mailgunDomain, $address)
    {
        $this->authorize('update', MailgunDomain::class);

        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->delete($mailgunDomain->domain, $address);
    }
}