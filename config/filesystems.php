<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'administration-logos' => [
            'driver' => 'local',
            'root' => storage_path('app-intern' . DIRECTORY_SEPARATOR . 'administration-logos'),
        ],
        // hebben we deze wellicht nog nodig?
        'documents-temp' => [
            'driver' => 'local',
            'root' => storage_path('app-intern' . DIRECTORY_SEPARATOR . 'documents-temp'),
        ],

//        'documents' => [
//            'driver' => 'local',
//            'root' => storage_path('app' . DIRECTORY_SEPARATOR . 'documents'),
//        ],
//        'mail_attachments' => [
//            'driver' => 'local',
//            'root' => storage_path('app' . DIRECTORY_SEPARATOR . 'mails'),
//        ],
//
//        'administrations' => [
//            'driver' => 'local',
//            'root' => storage_path('app' . DIRECTORY_SEPARATOR . 'administrations'),
//        ],
//        'cooperation' => [
//            'driver' => 'local',
//            'root' => storage_path('app' . DIRECTORY_SEPARATOR . 'cooperation'),
//        ],
//        'public' => [
//            'driver' => 'local',
//            'root' => storage_path('app/public'),
//            'url' => env('APP_URL').'/storage',
//            'visibility' => 'public',
//        ],
        'documents' => [
            'driver' => 'local',
            'root' => '/mnt/bigstorage/econobis/' . env('APP_COOP_NAME') . '/documents',
        ],

        'mail_attachments' => [
            'driver' => 'local',
            'root' => '/mnt/bigstorage/econobis/' . env('APP_COOP_NAME') . '/mails',
        ],

        'administrations' => [
            'driver' => 'local',
            'root' => '/mnt/bigstorage/econobis/' . env('APP_COOP_NAME') . '/administrations',
        ],

        'public' => [
            'driver' => 'local',
            'root' => '/mnt/bigstorage/econobis/' . env('APP_COOP_NAME') . '/public',
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        // lokaal is public_path iets in trant van '/home/vagrant/code/econobis/public/'
        // afhankelijk van hoe je vagrant/homestead hebt ingericht.
        'public_portal_local' => [
            'driver' => 'local',
            'root' => base_path('public/portal'),
        ],
        'customer_portal_app_build_local' => [
            'driver' => 'local',
            'root' => base_path('customer-portal-app/build'),
        ],
        'customer_portal_app_public_local' => [
            'driver' => 'local',
            'root' => base_path('customer-portal-app/public'),
        ],

        'public_portal' => [
            'driver' => 'local',
            'root' => '/home/econobis/domains/econobis.nl/public_html/'.env('APP_COOP_NAME').'/portal',
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_KEY'),
            'secret' => env('AWS_SECRET'),
            'region' => env('AWS_REGION'),
            'bucket' => env('AWS_BUCKET'),
        ],

    ],

];
