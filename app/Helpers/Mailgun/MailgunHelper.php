<?php

namespace App\Helpers\Mailgun;


use App\Eco\Cooperation\Cooperation;
use App\Eco\Mailbox\Mailbox;
use App\Eco\Mailbox\MailgunDomain;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MailgunHelper
{

    /**
     * Check of de aanmeldgegevens van Mailgun geldig zijn.
     *
     * @param $domain
     * @param $secret
     * @return bool
     */
    public function checkCredentials($domain, $secret)
    {
        // Deze url geeft een 401 terug als de logingegevens niet kloppen
        $endpoint = config('services.mailgun.endpoint');
        $url = 'https://api:' . $secret . '@' . $endpoint . '/v3/' . $domain . '/log';

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        return $httpCode === 200;
    }

    public function createInboundForwardRoute(Mailbox $mailbox)
    {
        if (!app()->environment('production')) {
            Log::info('Skipping Mailgun route creation outside production.', [
                'mailbox_id' => $mailbox->id,
            ]);

            return;
        }

        $mailgunDomain = MailgunDomain::where('is_verified', true)->first();

        if (!$mailgunDomain) {
            Log::warning('No verified Mailgun domain found. Mailgun inbound forward route not created.', [
                'mailbox_id' => $mailbox->id,
                'mailbox_name' => $mailbox->name,
            ]);

            return;
        }

        $inboundMailgunEmail = Str::random(24) . '@mailforward.econobis.nl';
        $inboundMailgunPostToken = Str::random(32);

        $response = (new Client())->post('https://api.eu.mailgun.net/v3/routes', [
            'auth' => [
                'api',
                $mailgunDomain->secret,
            ],
            'form_params' => [
                'priority' => 0,
                'description' => optional(Cooperation::first())->name . ':' . $mailbox->name . ' mail forwarder',
                'expression' => 'match_recipient("' . $inboundMailgunEmail . '")',
                'action' => 'forward("' . config('app.url') . '/mailgun/mail/' . $inboundMailgunPostToken . '")',
            ],
        ]);

        $mailbox->inbound_mailgun_email = $inboundMailgunEmail;
        $mailbox->inbound_mailgun_post_token = $inboundMailgunPostToken;
        $mailbox->inbound_mailgun_route_id = json_decode($response->getBody()->getContents())->route->id;
        $mailbox->valid = true;
        $mailbox->save();
    }

    public function deleteInboundForwardRoute(Mailbox $mailbox, ?string $routeId = null)
    {
        if (!app()->environment('production')) {
            Log::info('Skipping Mailgun route deletion outside production.', [
                'mailbox_id' => $mailbox->id,
            ]);

            return;
        }

        $routeId = $routeId ?: $mailbox->inbound_mailgun_route_id;

        if ($routeId) {
            (new Client())->delete('https://api.eu.mailgun.net/v3/routes/' . $routeId, [
                'auth' => [
                    'api',
                    config('services.mailgun.secret'),
                ],
            ]);
        }

        $mailbox->inbound_mailgun_route_id = null;
        $mailbox->inbound_mailgun_email = null;
        $mailbox->inbound_mailgun_post_token = null;
        $mailbox->save();
    }
}