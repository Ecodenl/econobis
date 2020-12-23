<?php

namespace App\Http\Controllers\Portal\PortalSettingsLayout;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Http\Controllers\Controller;

class PortalSettingsLayoutController extends Controller
{
    protected function getDefault()
    {
        $defaultPortalSettingsLayout = PortalSettingsLayout::where('is_default', true)->first();
        if(!$defaultPortalSettingsLayout){
//toDo hier wellicht initiele waarden vullen voor $defaultPortalSettingsLayout ?! voor als er geen default gevonden kan worden?
        }
        return $defaultPortalSettingsLayout;
    }

}