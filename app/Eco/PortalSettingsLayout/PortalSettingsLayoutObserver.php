<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-10-2017
 * Time: 13:57
 */

namespace App\Eco\PortalSettingsLayout;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;

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
        if($portalSettingsLayout->isDirty('is_default') && $portalSettingsLayout->is_default == true){
            // Als er een andere layout standaard was dan deze niet meer standaard maken
            $oldPrimaryPortalSettingsLayout = PortalSettingsLayout::where('is_default', true)
                ->where('id', '<>', $portalSettingsLayout->id)
                ->first();

            if($oldPrimaryPortalSettingsLayout){
                $oldPrimaryPortalSettingsLayout->is_default = false;
                $oldPrimaryPortalSettingsLayout->save();
            }
        }
    }

}