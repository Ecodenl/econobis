<?php

namespace App\Eco\Passport;

use Laravel\Passport\Client as PassportClient;

class Client extends PassportClient
{
    /**
     * Bepaal of het autorisatiescherm moet worden overgeslagen.
     *
     * @return bool
     */
    public function skipsAuthorization()
    {
        $allowedClientIds = [(int) config('app.oauth_client_id')];

        if (config('app.oauth_client_id_local')) {
            $allowedClientIds[] = (int) config('app.oauth_client_id_local');
        }

        return in_array($this->id, $allowedClientIds, true);
    }
}
