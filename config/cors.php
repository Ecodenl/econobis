<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Options
    |--------------------------------------------------------------------------
    |
    | The allowed_methods and allowed_headers options are case-insensitive.
    |
    | You don't need to provide both allowed_origins and allowed_origins_patterns.
    | If one of the strings passed matches, it is considered a valid origin.
    |
    | If ['*'] is provided to allowed_methods, allowed_origins or allowed_headers
    | all methods / origins / headers are allowed.
    |
    */

    'paths' => ['api/*', 'oauth/*', 'portal/*', 'frontend-config', 'client-version'],
    'supports_credentials' => false,
    'allowed_origins' => [],
    'allowed_origins_patterns' => json_decode(env('CORS_ORIGIN_PATTERNS', '[]')),
    'allowed_headers' => ['*'],
    'allowed_methods' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
];
