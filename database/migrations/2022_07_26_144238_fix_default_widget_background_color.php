<?php

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixDefaultWidgetBackgroundColor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $portalSettingsDashboard = PortalSettingsDashboard::find(1);
        if($portalSettingsDashboard && $portalSettingsDashboard->default_widget_background_color == '#f5f5f5'){
            $portalSettingsDashboard->default_widget_background_color = '#ffffff';
            $portalSettingsDashboard->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
