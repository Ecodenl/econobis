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
        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        return Valuestore::make($filePath);
    }

    public static function get(string $name)
    {
        return static::make()->get($name);
    }

    public function multiple(Request $request)
    {
        return static::make()->multiple($request);
    }

}