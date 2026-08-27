<?php

return [

    /*
    |--------------------------------------------------------------------------
    | INSTALLATIE instructies voor lokaal
    |--------------------------------------------------------------------------
    |
    |  1) Maak een director aan: D:\framework\bigstorage\econobis
    |       via Homestead.yaml is deze dan lokaal gemapt aan:
    |        folders:
    |            - map: D:/framework
    |              to: /home/vagrant/code
    |  2) Maak symlink:
    |       Ga naar cd ~/code/econobis
    |       ln -s ~/code/bigstorage/econobis bigstorage
    |
    */

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

//        Deze logo's zaten in storage/app/administrations, Deze zijn nu verplaatst naar storage/app-intern/administration-logos.
        'administration-logos' => [
            'driver' => 'local',
            'root' => storage_path('app-intern' . DIRECTORY_SEPARATOR . 'administration-logos'),
        ],
        // hebben we deze wellicht nog nodig? Een aparte temp directory dus ?
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
//        Hierin zaten alleen logo's maar werden nergens gebruikt. Deze disk configuratie voorlopig opgeheven
//        'cooperation' => [
//            'driver' => 'local',
//            'root' => storage_path('app' . DIRECTORY_SEPARATOR . 'cooperation'),
//        ],

//        'documents' => [
//            'driver' => 'local',
//            'root' => base_path('bigstorage/' . env('APP_COOP_NAME') . '/app/documents'),
//        ],
        'documents' => [
            'driver' => 'local',
            'root' => (env('APP_ENV') === 'local'
                ? '/home/vagrant/code/econobis/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name')
                : '/home/econobis/domains/econobis.nl/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name'))  . '/app/documents',
        ],

        'mail_attachments' => [
            'driver' => 'local',
            'root' => (env('APP_ENV') === 'local'
                ? '/home/vagrant/code/econobis/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name')
                : '/home/econobis/domains/econobis.nl/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name')) . '/app/mails',
        ],

        'administrations' => [
            'driver' => 'local',
            'root' => (env('APP_ENV') === 'local'
                    ? '/home/vagrant/code/econobis/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name')
                    : '/home/econobis/domains/econobis.nl/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name'))  . '/app/administrations',
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],
//        'public' => [
//            'driver' => 'local',
//            'root' => (env('APP_ENV') === 'local'
//                    ? '/home/vagrant/code/econobis/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name')
//                   : '/home/econobis/domains/econobis.nl/bigstorage/' . env('APP_COOP_NAME', 'missing_coop_name'))  . '/app/public',
//            'url' => env('APP_URL').'/storage',
//            'visibility' => 'public',
//        ],

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
