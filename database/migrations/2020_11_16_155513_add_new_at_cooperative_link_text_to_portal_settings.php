<?php

use App\Helpers\Settings\PortalSettings;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Valuestore\Valuestore;

class AddNewAtCooperativeLinkTextToPortalSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $cooperativeName = PortalSettings::get('cooperativeName');

        $portalSettings = Valuestore::make(storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings.json'));
        $portalSettings->put('newAtCooperativeLinkText', "Nieuw bij " . $cooperativeName);
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
