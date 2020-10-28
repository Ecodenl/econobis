<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Valuestore\Valuestore;

class AddHeaderPortalIconColorToPortalSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $portalSettings = Valuestore::make(storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        $portalSettings->put('headerPortalIconColor', "#ffffff");
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
