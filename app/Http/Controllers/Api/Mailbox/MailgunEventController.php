<?php

namespace App\Http\Controllers\Api\Mailbox;

use App\Eco\Mailbox\MailgunDomain;
use App\Jobs\Mailgun\FetchMailgunEvents;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Log;

class MailgunEventController
{
    use AuthorizesRequests;

    public function fetchFromMailgun()
    {
        $user = auth()->user();

        $mailgunDomains = MailgunDomain::whereHas('mailboxes.users', function($query) use ($user){
            $query->where('users.id', $user->id);
        })->get();

        foreach ($mailgunDomains as $mailgunDomain) {
            /**
             * Haal alle events op vanaf middernacht.
             *
             * De cronjob draait om 01:25, daarmee bouwen we nog wat overlap in om zeker te zijn dat we alles binnen halen. (eerder opgehaalde events worden niet nogmaals opgeslagen)
             * Zie: https://documentation.mailgun.com/en/latest/api-events.html#event-polling
             */
            $minutes = Carbon::now()->diffInMinutes(Carbon::now()->startOfDay(), true);

            try {
                FetchMailgunEvents::dispatchSync($mailgunDomain, $minutes);
            }catch (\Exception $e){
                /**
                 * Als er iets mis gaat met het ophalen van de events, loggen we dit en gaan we door naar de volgende mailbox.
                 */
                Log::error('Error fetching events from Mailgun: ' . $e->getMessage());
            }
        }
    }
}