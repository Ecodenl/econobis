<?php

namespace App\Http\Controllers\Portal\Setting;

use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Controller;

class PortalSettingController extends Controller
{
    protected function getPortalActive()
    {
        return PortalSettings::get('portalActive');
    }
    protected function getCooperativeName()
    {
        return PortalSettings::get('cooperativeName');
    }
    protected function getPortalLoginInfoText()
    {
        return PortalSettings::get('portalLoginInfoText');
    }
    protected function getShowNewAtCooperativeLink()
    {
        return PortalSettings::get('showNewAtCooperativeLink') ? PortalSettings::get('showNewAtCooperativeLink') : false;
    }
    protected function getNewAtCooperativeLinkText()
    {
        $cooperativeName = PortalSettings::get('cooperativeName');
        $newAtCooperativeLinkText =  PortalSettings::get('newAtCooperativeLinkText') ? PortalSettings::get('newAtCooperativeLinkText') : '';
        $newAtCooperativeLinkText = str_replace('{cooperatie_naam}', $cooperativeName, $newAtCooperativeLinkText);

        return !empty($newAtCooperativeLinkText) ? $newAtCooperativeLinkText : false;
    }




}