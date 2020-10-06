<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Valuestore\Valuestore;

class AddPcrCapacityOneSolorPanelToPortalSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $portalSettings = Valuestore::make(storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        $portalSettings->put('pcrPowerKwhConsumptionPercentage', 0.8);
        $portalSettings->put('pcrGeneratingCapacityOneSolorPanel', 250);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
