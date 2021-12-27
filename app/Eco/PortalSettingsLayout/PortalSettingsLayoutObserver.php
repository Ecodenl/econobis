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
        if($portalSettingsLayout->is_default != $portalSettingsLayout->getOriginal('is_default') && $portalSettingsLayout->is_default == true && $portalSettingsLayout->portal_logo_file_name != 'conversion.png'){

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
                Storage::disk('customer_portal_app_public_local')->put('images/logo.png' , Storage::disk('customer_portal_app_public_local')->get('images/' . $layoutLogoName));
            } else {
                Storage::disk('public_portal')->put('images/logo.png' , Storage::disk('public_portal')->get('images/' . $layoutLogoName));
            }

            // Maak logo-header.png opnieuw voor default logo-header
            $layoutLogoHeaderName = 'logo-header-' . $portalSettingsLayout->id . '.png';
            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->put('images/logo-header.png' , Storage::disk('public_portal_local')->get('images/' . $layoutLogoHeaderName));
                Storage::disk('customer_portal_app_public_local')->put('images/logo-header.png' , Storage::disk('customer_portal_app_public_local')->get('images/' . $layoutLogoHeaderName));
            } else {
                Storage::disk('public_portal')->put('images/logo-header.png' , Storage::disk('public_portal')->get('images/' . $layoutLogoHeaderName));
            }

            // Maak background-login.png opnieuw voor default background-login
            $layoutImageBgLoginName = 'background-login-' . $portalSettingsLayout->id . '.png';
            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->put('images/background-login.png' , Storage::disk('public_portal_local')->get('images/' . $layoutImageBgLoginName));
                Storage::disk('customer_portal_app_public_local')->put('images/background-login.png' , Storage::disk('customer_portal_app_public_local')->get('images/' . $layoutImageBgLoginName));
            } else {
                Storage::disk('public_portal')->put('images/background-login.png' , Storage::disk('public_portal')->get('images/' . $layoutImageBgLoginName));
            }

            // Maak background-header.png opnieuw voor default background-header
            $layoutImageBgHeaderName = 'background-header-' . $portalSettingsLayout->id . '.png';
            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->put('images/background-header.png' , Storage::disk('public_portal_local')->get('images/' . $layoutImageBgHeaderName));
                Storage::disk('customer_portal_app_public_local')->put('images/background-header.png' , Storage::disk('customer_portal_app_public_local')->get('images/' . $layoutImageBgHeaderName));
            } else {
                Storage::disk('public_portal')->put('images/background-header.png' , Storage::disk('public_portal')->get('images/' . $layoutImageBgHeaderName));
            }
        }

    }

}