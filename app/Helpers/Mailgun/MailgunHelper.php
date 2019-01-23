<?php

namespace App\Helpers\Mailgun;


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
        $url = 'https://api:' . $secret . '@api.mailgun.net/v3/' . $domain . '/log';

        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        return $httpCode === 200;
    }
}