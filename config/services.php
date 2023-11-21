<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.eu.mailgun.net'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
        'test' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => \App\Eco\User\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],

    'twinfield' => [
        'verkoop_dagboek_code'         => 'VRK',
        'verkoop_default_currency'     => 'EUR',
        'verkoop_grootboek_debiteuren' => '1300',
    ],

    'google' => [
        're_captcha_server_side_url' => env('RE_CAPTCHA_SERVER_SIDE_URL', 'https://www.google.com/recaptcha/api/siteverify'),
        're_captcha_server_side_key' => env('RE_CAPTCHA_SERVER_SIDE_KEY'),
    ],

    'msoauthapi' => [
        'mailbox_id' => null,
    ],
];
