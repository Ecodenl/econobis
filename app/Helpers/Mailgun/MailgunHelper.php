<?php

namespace App\Helpers\Mailgun;


use App\Eco\Cooperation\Cooperation;
use App\Eco\Mailbox\Mailbox;
use GuzzleHttp\Client;
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

    public function updateMailgunForwarding(Mailbox $mailbox)
    {
        if($mailbox->incoming_server_type == 'mailgun'){
            $this->createInboundForwardRoute($mailbox);
        }elseif($mailbox->inbound_mailgun_email != null){
            $this->deleteInboundForwardRoute($mailbox);
        }
    }

    protected function createInboundForwardRoute(Mailbox $mailbox)
    {
        $mailbox->inbound_mailgun_email = Str::random(24) . '@mailforward.econobis.nl'; // Iedereen gebruikt zelfde domein dus kan nog hardcoded
        $mailbox->inbound_mailgun_post_token = Str::random(32);

        $response = (new Client())->post('https://api.eu.mailgun.net/v3/routes', [
            'auth' => [
                'api',
                config('services.mailgun.secret')
            ],
            'form_params' => [
                'priority' => 0,
                'description' => optional(Cooperation::first())->name . ':' . $mailbox->name . ' mail forwarder',
                'expression' => 'match_recipient("' . $mailbox->inbound_mailgun_email . '")',
                'action' => 'forward("' . config('app.url') . '/mailgun/mail/' . $mailbox->inbound_mailgun_post_token . '")',
            ]
        ]);

        $mailbox->inbound_mailgun_route_id = json_decode($response->getBody()->getContents())->route->id;
        $mailbox->valid = true;
        $mailbox->save();
    }

    protected function deleteInboundForwardRoute(Mailbox $mailbox)
    {
        $client = new Client();

        $client->delete('https://api.eu.mailgun.net/v3/routes/' . $mailbox->inbound_mailgun_route_id, [
            'auth' => [
                'api',
                config('services.mailgun.secret')
            ],
        ]);

        $mailbox->inbound_mailgun_route_id = null;
        $mailbox->inbound_mailgun_email = null;
        $mailbox->inbound_mailgun_post_token = null;
        $mailbox->save();
    }
}