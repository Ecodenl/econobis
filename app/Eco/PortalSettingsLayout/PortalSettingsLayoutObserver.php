<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:57
 */

namespace App\Eco\PortalSettingsLayout;

use Config;
use Illuminate\Support\Facades\Storage;

class PortalSettingsLayoutObserver
{

    public function creating(PortalSettingsLayout $portalSettingsLayout)
    {
        // Als dit het eerste record is dan altijd standaard
        if(PortalSettingsLayout::all()->count() == 0){
            $portalSettingsLayout->is_default = true;
        }
    }

    public function saved(PortalSettingsLayout $portalSettingsLayout)
    {
        if($portalSettingsLayout->isDirty('is_default') && $portalSettingsLayout->is_default == true && $portalSettingsLayout->portal_logo_file_name != 'conversion.png'){
            // Als er een andere layout standaard was dan deze niet meer standaard maken
            $oldPrimaryPortalSettingsLayout = PortalSettingsLayout::where('is_default', true)
                ->where('id', '<>', $portalSettingsLayout->id)
                ->first();

            if($oldPrimaryPortalSettingsLayout){
                $oldPrimaryPortalSettingsLayout->is_default = false;
                $oldPrimaryPortalSettingsLayout->save();
            }
            // Maak logo.png opnieuw voor default logo
            $layoutLogoName = 'logo-' . $portalSettingsLayout->id . '.png';
            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->put('images/logo.png' , Storage::disk('public_portal_local')->get('images/' . $layoutLogoName));
            } else {
                Storage::disk('public_portal')->put('images/logo.png' , Storage::disk('public_portal')->get('images/' . $layoutLogoName));
            }
        }

    }

}