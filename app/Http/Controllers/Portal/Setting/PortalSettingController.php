<?php

namespace App\Http\Controllers\Portal\Setting;

use App\Helpers\Settings\PortalSettings;
use App\Http\Controllers\Controller;

class PortalSettingController extends Controller
{
    protected function getCooperativeName()
    {
        return PortalSettings::get('cooperativeName');
    }
    protected function getShowNewAtCooperativeLink()
    {
        return PortalSettings::get('showNewAtCooperativeLink') ? 'true' : 'false';
    }



}