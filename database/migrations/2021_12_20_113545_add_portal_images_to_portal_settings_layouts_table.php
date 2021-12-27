<?php

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPortalImagesToPortalSettingsLayoutsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('portal_settings_layouts', function (Blueprint $table) {
            $table->string('portal_logo_file_name_header')->after('portal_logo_file_name');
            $table->string('portal_image_bg_file_name_login')->after('portal_logo_file_name_header');
            $table->string('portal_image_bg_file_name_header')->after('portal_image_bg_file_name_login');
        });

        //
        $portalSettingsLayoutDefaultQuery = PortalSettingsLayout::where('is_default', true);

        if($portalSettingsLayoutDefaultQuery->exists()) {
            $portalSettingsLayoutDefault = $portalSettingsLayoutDefaultQuery->first();
            $portalSettingsLayoutDefaultId = $portalSettingsLayoutDefault->first()->id;

            try {
                if (config('app.env') == "local") {
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-header.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'over-ons.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'project-schrijf-je-in.png');
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'huidige-deelnames.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-header.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'over-ons.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'project-schrijf-je-in.png');
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'huidige-deelnames.png');
                } else {
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo-' . $portalSettingsLayoutDefaultId . '.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login-' . $portalSettingsLayoutDefaultId . '.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'over-ons.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'project-schrijf-je-in.png');
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'logo.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'huidige-deelnames.png');
                }
            } catch (\Exception $exception) {
                Log::error('Copy logo.png mislukt : ' . $exception->getMessage());
            }

            $portalSettingsLayoutDefault->portal_logo_file_name_header = 'logo-header-' . $portalSettingsLayoutDefaultId . '.png';
            $portalSettingsLayoutDefault->portal_image_bg_file_name_login = 'background-header-' . $portalSettingsLayoutDefaultId . '.png';
            $portalSettingsLayoutDefault->portal_image_bg_file_name_header = 'background-login-' . $portalSettingsLayoutDefaultId . '.png';
            $portalSettingsLayoutDefault->save();
        }


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('portal_settings_layouts', 'portal_image_bg_file_name_header')) {
            Schema::table('portal_settings_layouts', function (Blueprint $table) {
                $table->dropColumn('portal_image_bg_file_name_header');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'portal_image_bg_file_name_login')) {
            Schema::table('portal_settings_layouts', function (Blueprint $table) {
                $table->dropColumn('portal_image_bg_file_name_login');
            });
        }
        if (Schema::hasColumn('portal_settings_layouts', 'portal_logo_file_name_header')) {
            Schema::table('portal_settings_layouts', function (Blueprint $table) {
                $table->dropColumn('portal_logo_file_name_header');
            });
        }
    }
}
