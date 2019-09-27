<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 27-9-2019
 * Time: 15:20
 */

namespace App\Helpers\Settings;


use Spatie\Valuestore\Valuestore;

class PortalSettings
{
    public static function make()
    {
        return Valuestore::make(database_path('settings.json'));
    }

    public static function get(string $name)
    {
        return static::make()->get($name);
    }
}