<?php

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Helpers\Settings\PortalSettings;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SeedDefaultPortalSettingsLayout extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        $portalSettingsExists = !empty(PortalSettings::get('portalUrl')) ? true : false;

        if($portalSettingsExists){
            $portalSettingsLayout = new PortalSettingsLayout();
            $portalSettingsLayout->description = 'Standaard portal instellingen layout';
            $portalSettingsLayout->is_default = true;
            $portalSettingsLayout->portal_logo_file_name = 'conversion.png';
            $portalSettingsLayout->portal_favicon_file_name = 'favicon.ico';
            $portalSettingsLayout->portal_background_color = PortalSettings::get('backgroundColor');
            $portalSettingsLayout->portal_background_text_color = PortalSettings::get('backgroundTextColor');
            $portalSettingsLayout->login_header_background_color = PortalSettings::get('backgroundImageColor');
            $portalSettingsLayout->login_header_background_text_color = PortalSettings::get('backgroundImageTextColor');
            $portalSettingsLayout->header_icons_color = PortalSettings::get('headerPortalIconColor');
            $portalSettingsLayout->login_field_background_color = PortalSettings::get('backgroundSecondaryColor');
            $portalSettingsLayout->login_field_background_text_color = PortalSettings::get('backgroundSecondaryTextColor');
            $portalSettingsLayout->button_color = PortalSettings::get('buttonColor');
            $portalSettingsLayout->button_text_color = PortalSettings::get('buttonTextColor');
            $portalSettingsLayout->save();

            try {
                if (config('app.env') == "local") {
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $portalSettingsLayout->portal_logo_file_name);
                } else {
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $portalSettingsLayout->portal_logo_file_name);
                }
            } catch (\Exception $exception) {
                Log::error('Copy logo.png mislukt : ' . $exception->getMessage());
            }

            try {
                if (config('app.env') == "local") {
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'favicon.ico', DIRECTORY_SEPARATOR . $portalSettingsLayout->portal_favicon_file_name);
                } else {
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'favicon.ico', DIRECTORY_SEPARATOR . $portalSettingsLayout->portal_favicon_file_name );
                }
            } catch (\Exception $exception) {
                Log::error('Copy favicon.ico mislukt : ' . $exception->getMessage());
            }

            $portalSettingsLayout->portal_logo_file_name = 'logo-' . $portalSettingsLayout->id . '.png';
            $portalSettingsLayout->portal_favicon_file_name = 'favicon-' . $portalSettingsLayout->id . '.ico';
            $portalSettingsLayout->save();

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
