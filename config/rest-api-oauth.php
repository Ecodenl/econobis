<?php

return [

    /*
     * redirect voor rest api auth code
     */
    'redirect_url' => 'https://econobisbuurtaanpak.nl/wp-admin/admin.php?gcapi_oauth2_redirect=1',

    /*
     * Alleen deze gebruikers mogen de REST API OAuth autoriseren
     */
    'allowed_emails' => [
        'support@econobis.nl',
        'software@xaris.nl',
        'bar@mossy.nl',
        'wim-test@mosmania.nl',
        // evt later meer:
    ],
    // oauth client naming:
    'client_names' => [
        'client_credentials' => 'Rest-API ClientCredentials Grant Client',
        'auth_code'          => 'Rest-API AuthCode Client',
    ],

];
