<?php

namespace App\Eco\Passport;

use Illuminate\Support\Facades\Log;
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
        $allowedClientIds = [config('app.oauth_client_id')];
        Log::info('allowedClientIds 1', $allowedClientIds);

        if (config('app.oauth_client_id_local')) {
            Log::info('aparte oauth_client_id_local');
            $allowedClientIds[] = config('app.oauth_client_id_local');
        }
        Log::info('allowedClientIds 2', $allowedClientIds);

        return in_array($this->id, $allowedClientIds, true);
    }
}
