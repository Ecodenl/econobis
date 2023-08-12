<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\MailgunDomain;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mailgun\Mailgun;

class MailgunDomainBounceController
{
    public function index(MailgunDomain $mailgunDomain)
    {
        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $fetchedBounces = $mailgunClient->suppressions()->bounces()->index('mg.kolenberg.net')->getItems();

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
        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->create($mailgunDomain->domain, $request->input('address'), [
            'error' => $request->error,
        ]);
    }

    public function delete(MailgunDomain $mailgunDomain, $address)
    {
        $mailgunClient = Mailgun::create($mailgunDomain->secret, 'https://' . config('services.mailgun.endpoint'));

        $mailgunClient->suppressions()->bounces()->delete($mailgunDomain->domain, $address);
    }
}