<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * Het verwijderen van deze class geeft problemen bij installatie omdat
 * deze dan nog wordt aangeroepen vanuit de cache, daarom blijft deze
 * nog even als lege class bestaan.
 *
 * Bij een volgende installatie staat de verwijzing naar deze class
 * niet meer in de config en cache en kan deze class dus wel
 * worden verwijderd.
 */
class JoryServiceProvider extends ServiceProvider
{
    public function boot()
    {
    }
}
