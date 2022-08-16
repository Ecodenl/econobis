<?php
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Access environment through the config helper
// This will avoid issues when using Laravel's config caching
// https://laravel.com/docs/8.x/configuration#configuration-caching
return [
  'appId'             => env('MICROSOFT_OAUTH_CLIENT_ID', ''),
  'appSecret'         => env('MICROSOFT_OAUTH_CLIENT_SECRET', ''),
  'authTenant'        => env('MICROSOFT_OAUTH_TENANT_ID', ''),
  'redirectUri'       => env('MICROSOFT_OAUTH_REDIRECT_URI', ''),
  'scopes'            => env('MICROSOFT_OAUTH_USER_SCOPES', ''),
  'authority'         => env('MICROSOFT_OAUTH_AUTHORITY', 'https://login.microsoftonline.com/common'),
  'authorizeEndpoint' => env('MICROSOFT_OAUTH_AUTHORIZE_ENDPOINT', '/oauth2/v2.0/authorize'),
  'tokenEndpoint'     => env('MICROSOFT_OAUTH_TOKEN_ENDPOINT', '/oauth2/v2.0/token'),
];

