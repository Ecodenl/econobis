<?php

namespace App\Http\Controllers\Portal\PortalSettingsDashboard;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortalSettingsDashboard\FullPortalSettingsDashboard;
use Illuminate\Support\Facades\Log;

class PortalSettingsDashboardController extends Controller
{

    public function get(PortalSettingsDashboard $portalSettingsDashboard){

        $portalSettingsDashboard->load('widgets');
        Log::info("test ophalen $portalSettingsDashboard");
        Log::info($portalSettingsDashboard);

        return FullPortalSettingsDashboard::make($portalSettingsDashboard);
    }

}