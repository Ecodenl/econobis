<?php
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Access environment through the config helper
// This will avoid issues when using Laravel's config caching
// https://laravel.com/docs/8.x/configuration#configuration-caching
return [
//  'appId'             => instelbaar per mailbox
//  'appSecret'         => instelbaar per mailbox
//  'authTenant'        => hebben we deze nodig en zoja instelbaar per mailbox?
  'redirectUri'       => 'api/oauth/ms-azure/callback',
  'scopes'            => 'user.read mail.read mail.send offline_access',
  'authority'         => 'https://login.microsoftonline.com/common',
  'authorizeEndpoint' => '/oauth2/v2.0/authorize',
  'tokenEndpoint'     => '/oauth2/v2.0/token',
];

