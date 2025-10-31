<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AddPortalDashboardWidgetGroepenBeheer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $portalSettingsDashboard = App\Eco\PortalSettingsDashboard\PortalSettingsDashboard::first();

        if($portalSettingsDashboard) {
            try {
                //TODO doornemen met Wim hoe dit met de nieuwe portal tabellen opzet te doen, waar is de default-widget.png?
                if (config('app.env') == "local") {
//                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                    Log::info('Copy ' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png');
                    Log::info('Naar ' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                } else {
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                }
                Log::info('Copy logo.png gelukt ?');
            } catch (\Exception $exception) {
                Log::error('Copy logo.png mislukt : ' . $exception->getMessage());
            }

            try {
                DB::table('portal_settings_dashboard_widgets')->insert([
                        [
                            'portal_settings_dashboard_id' => $portalSettingsDashboard->id,
                            'code_ref' => 'groepen-beheer',
                            'order' => 999,
                            'title' => 'Groepen beheer',
                            'text' => 'Beheer hier de groepen waar je in zit',
                            'button_text' => 'Groepen',
                            'button_link' => 'groepen-beheer',
                            'widget_image_file_name' => 'groepen-beheer.png',
                            'active' => 0,
                            'created_at' => \Carbon\Carbon::now(),
                            'updated_at' => \Carbon\Carbon::now(),
                        ],
                    ]
                );
            } catch (\Exception $exception) {
                Log::error('Insert groepen beheer widget mislukt: ' . $exception->getMessage());
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        try {
            DB::table('portal_settings_dashboard_widgets')
            ->where('code_ref', 'groepen-beheer')
            ->delete();
        } catch (\Exception $exception) {
            Log::error('Delete groepen beheer widget mislukt: ' . $exception->getMessage());
        }
    }
}

