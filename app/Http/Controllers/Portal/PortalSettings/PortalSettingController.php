<?php

namespace App\Http\Controllers\Portal\PortalSettings;

use App\Eco\PortalSettings\PortalSettings;
use App\Http\Controllers\Controller;

class PortalSettingsController extends Controller
{
    protected function getPortalActive()
    {
        return PortalSettings::first()?->portal_active;;
    }
    protected function getCooperativeName()
    {
        return PortalSettings::first()?->cooperative_name;
    }
    protected function getShowNewAtCooperativeLink()
    {
        return PortalSettings::first()?->show_new_at_cooperative_link ? PortalSettings::first()?->show_new_at_cooperative_link : false;
    }
    protected function getNewAtCooperativeLinkText()
    {
        $cooperativeName = PortalSettings::first()?->cooperative_name;
        $newAtCooperativeLinkText =  PortalSettings::first()?->new_at_cooperative_link_text ? PortalSettings::first()?->new_at_cooperative_link_text : '';
        $newAtCooperativeLinkText = str_replace('{cooperatie_naam}', $cooperativeName, $newAtCooperativeLinkText);

        return !empty($newAtCooperativeLinkText) ? $newAtCooperativeLinkText : false;
    }




}