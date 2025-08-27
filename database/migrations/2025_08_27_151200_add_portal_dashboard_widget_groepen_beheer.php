<?php

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddPortalDashboardWidgetGroepenBeheer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $portalSettingsLayout = PortalSettingsLayout::where('is_default', true)->first();

        if($portalSettingsLayout) {
            try {
                //TODO doornemen met Wim hoe dit met de nieuwe portal tabellen opzet te doen, waar is de default-widget.png?
                if (config('app.env') == "local") {
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                    Storage::disk('customer_portal_app_build_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                } else {
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'default-widget.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'groepen-beheer.png');
                }
            } catch (\Exception $exception) {
                Log::error('Copy logo.png mislukt : ' . $exception->getMessage());
            }
        }

        try {
            DB::table('portal_settings_dashboard_widgets')->insert([
                    [
                        'portal_settings_dashboard_id' => $portalSettingsLayout->id,
                        'code_ref' => 'groepen-beheer',
                        'order' => 999,
                        'title' => 'Groepen beheer',
                        'text' => 'Beheer hier de groepen waar je in zit',
                        'button_text' => 'Groepen',
                        'button_link' => 'groepen-beheer',
                        'widget_image_file_name' => 'groepen-beheer.png',
                        'active' => 1,
                        'created_at' => \Carbon\Carbon::now(),
                        'updated_at' => \Carbon\Carbon::now(),
                    ],
                ]
            );
        } catch (\Exception $exception) {
            Log::error('Insert groepen beheer widget mislukt: ' . $exception->getMessage());
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

