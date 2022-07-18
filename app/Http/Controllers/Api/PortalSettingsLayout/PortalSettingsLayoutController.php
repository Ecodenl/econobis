<?php

namespace App\Http\Controllers\Api\PortalSettingsLayout;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Helpers\Delete\Models\DeletePortalSettingsLayout;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use App\Jobs\Portal\GeneratePortalCss;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use JosKolenberg\LaravelJory\Facades\Jory;
use Config;
use Exception;

class PortalSettingsLayoutController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettingsLayout::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsLayout::class);

        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->boolean('isDefault')->onEmpty(false)->whenMissing(false)->alias('is_default')->next()
            ->string('portalLogoFileName')->whenMissing('')->onEmpty('')->alias('portal_logo_file_name')->next()
            ->string('portalLogoFileNameHeader')->whenMissing('')->onEmpty('')->alias('portal_logo_file_name_header')->next()
            ->string('portalImageBgFileNameLogin')->whenMissing('')->onEmpty('')->alias('portal_image_bg_file_name_login')->next()
            ->boolean('useTransparentBackgroundLogin')->whenMissing(false)->onEmpty(false)->alias('use_transparent_background_login')->next()
            ->string('portalImageBgFileNameHeader')->whenMissing('')->onEmpty('')->alias('portal_image_bg_file_name_header')->next()
            ->boolean('useTransparentBackgroundHeader')->whenMissing(false)->onEmpty(false)->alias('use_transparent_background_header')->next()
            ->string('portalFaviconFileName')->whenMissing('')->onEmpty('')->alias('portal_favicon_file_name')->next()
            ->string('portalMainBackgroundColor')->whenMissing('#f1eff0')->onEmpty('#f1eff0')->alias('portal_main_background_color')->next()
            ->string('portalMainTextColor')->whenMissing('#000000')->onEmpty('#000000')->alias('portal_main_text_color')->next()
            ->string('portalBackgroundColor')->whenMissing('#034b8c')->onEmpty('#034b8c')->alias('portal_background_color')->next()
            ->string('portalBackgroundTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('portal_background_text_color')->next()
            ->string('loginHeaderBackgroundColor')->whenMissing('rgba(3, 75, 140, 0.9)')->onEmpty('rgba(3, 75, 140, 0.9)')->alias('login_header_background_color')->next()
            ->string('loginHeaderBackgroundTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('login_header_background_text_color')->next()
            ->string('headerIconsColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('header_icons_color')->next()
            ->string('loginFieldBackgroundColor')->whenMissing('#3898EC')->onEmpty('#3898EC')->alias('login_field_background_color')->next()
            ->string('loginFieldBackgroundTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('login_field_background_text_color')->next()
            ->string('buttonColor')->whenMissing('#3898EC')->onEmpty('#3898EC')->alias('button_color')->next()
            ->string('buttonTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('button_text_color')->next()
            ->get();

        $portalSettingsLayout = new PortalSettingsLayout($data);
        $portalSettingsLayout->save();

        return Jory::on($portalSettingsLayout);
    }

    public function update(PortalSettingsLayout $portalSettingsLayout, RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsLayout::class);

        $data = $input->string('description')->whenMissing('')->onEmpty('')->next()
            ->boolean('isDefault')->onEmpty(false)->whenMissing(false)->alias('is_default')->next()
            ->string('portalLogoFileName')->whenMissing('logo.png')->onEmpty('logo.png')->alias('portal_logo_file_name')->next()
            ->string('portalLogoFileNameHeader')->whenMissing('')->onEmpty('')->alias('portal_logo_file_name_header')->next()
            ->string('portalImageBgFileNameLogin')->whenMissing('')->onEmpty('')->alias('portal_image_bg_file_name_login')->next()
            ->boolean('useTransparentBackgroundLogin')->whenMissing(false)->onEmpty(false)->alias('use_transparent_background_login')->next()
            ->string('portalImageBgFileNameHeader')->whenMissing('')->onEmpty('')->alias('portal_image_bg_file_name_header')->next()
            ->boolean('useTransparentBackgroundHeader')->whenMissing(false)->onEmpty(false)->alias('use_transparent_background_header')->next()
            ->string('portalFaviconFileName')->whenMissing('favicon.ico')->onEmpty('favicon.ico')->alias('portal_favicon_file_name')->next()
            ->string('portalMainBackgroundColor')->whenMissing('#f1eff0')->onEmpty('#f1eff0')->alias('portal_main_background_color')->next()
            ->string('portalMainTextColor')->whenMissing('#000000')->onEmpty('#000000')->alias('portal_main_text_color')->next()
            ->string('portalBackgroundColor')->whenMissing('#034b8c')->onEmpty('#034b8c')->alias('portal_background_color')->next()
            ->string('portalBackgroundTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('portal_background_text_color')->next()
            ->string('loginHeaderBackgroundColor')->whenMissing('rgba(3, 75, 140, 0.9)')->onEmpty('rgba(3, 75, 140, 0.9)')->alias('login_header_background_color')->next()
            ->string('loginHeaderBackgroundTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('login_header_background_text_color')->next()
            ->string('headerIconsColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('header_icons_color')->next()
            ->string('loginFieldBackgroundColor')->whenMissing('#3898EC')->onEmpty('#3898EC')->alias('login_field_background_color')->next()
            ->string('loginFieldBackgroundTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('login_field_background_text_color')->next()
            ->string('buttonColor')->whenMissing('#3898EC')->onEmpty('#3898EC')->alias('button_color')->next()
            ->string('buttonTextColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('button_text_color')->next()
            ->get();

        $portalSettingsLayout->fill($data);
        $portalSettingsLayout->save();

        // Generate portal css with default color settings
        if($portalSettingsLayout->is_default){
            GeneratePortalCss::dispatch();
        }

        $this->storeLogo($request, $portalSettingsLayout);
        $this->storeImageBg($request, $portalSettingsLayout);
        $this->storeFavicon($request, $portalSettingsLayout);

        return GenericResource::make($portalSettingsLayout);
    }

    public function destroy(PortalSettingsLayout $portalSettingsLayout)
    {
        $this->authorize('manage', PortalSettingsLayout::class);

        try {
            DB::beginTransaction();

            $deletePortalSettingsLayout = new DeletePortalSettingsLayout($portalSettingsLayout);
            $result = $deletePortalSettingsLayout->delete();

            if(count($result) > 0){
                DB::rollBack();
                abort(412, implode(";", array_unique($result)));
            }

            DB::commit();
        } catch (\PDOException $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            abort(501, 'Er is helaas een fout opgetreden.');
        }
    }

    /**
     * @param Request $request
     * @param PortalSettingsLayout $portalSettingsLayout
     */
    protected function storeLogo(Request $request, PortalSettingsLayout $portalSettingsLayout)
    {
        //get logo
        $logo = $request->file('attachmentLogo')
            ? $request->file('attachmentLogo') : false;

        if ($logo) {
            //store logo
            if (!$logo->isValid()) {
                abort('422', 'Error uploading file logo');
            }

            try {
                $layoutLogoName = 'logo-' . $portalSettingsLayout->id . '.png';
                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentLogo'), $layoutLogoName);
                    Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentLogo'), $layoutLogoName);
                    Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentLogo'), $layoutLogoName);
                    $portalSettingsLayout->portal_logo_file_name = $layoutLogoName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentLogo'), 'logo.png');
                        Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentLogo'), 'logo.png');
                        Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentLogo'), 'logo.png');
                    }
                } else {
                    Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentLogo'), $layoutLogoName);
                    $portalSettingsLayout->portal_logo_file_name = $layoutLogoName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentLogo'), 'logo.png');
                    }
                }
            } catch (\Exception $exception) {
                Log::error('Opslaan gewijzigde logo.png mislukt : ' . $exception->getMessage());
            }
        }
        //get logo header
        $logoHeader = $request->file('attachmentLogoHeader')
            ? $request->file('attachmentLogoHeader') : false;

        if ($logoHeader) {
            //store logo-header
            if (!$logoHeader->isValid()) {
                abort('422', 'Error uploading file logo-header');
            }

            try {
                $layoutLogoHeaderName = 'logo-header-' . $portalSettingsLayout->id . '.png';
                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentLogoHeader'), $layoutLogoHeaderName);
                    Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentLogoHeader'), $layoutLogoHeaderName);
                    Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentLogoHeader'), $layoutLogoHeaderName);
                    $portalSettingsLayout->portal_logo_file_name_header = $layoutLogoHeaderName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentLogoHeader'), 'logo-header.png');
                        Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentLogoHeader'), 'logo-header.png');
                        Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentLogoHeader'), 'logo-header.png');
                    }
                } else {
                    Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentLogoHeader'), $layoutLogoHeaderName);
                    $portalSettingsLayout->portal_logo_file_name_header = $layoutLogoHeaderName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentLogoHeader'), 'logo-header.png');
                    }
                }
            } catch (\Exception $exception) {
                Log::error('Opslaan gewijzigde logo-header.png mislukt : ' . $exception->getMessage());
            }
        }
    }
    /**
     * @param Request $request
     * @param PortalSettingsLayout $portalSettingsLayout
     */
    protected function storeImageBg(Request $request, PortalSettingsLayout $portalSettingsLayout)
    {
        if ($portalSettingsLayout->use_transparent_background_login){
            try {
                $layoutImageBgLoginName = 'background-login-' . $portalSettingsLayout->id . '.png';
                if (config('app.env') == "local") {
                    Storage::disk('public_portal_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                        Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                    }
                    Storage::disk('customer_portal_app_build_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    Storage::disk('customer_portal_app_build_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('customer_portal_app_build_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                        Storage::disk('customer_portal_app_build_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                    }
                    Storage::disk('customer_portal_app_public_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('customer_portal_app_public_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                        Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                    }
                } else {
                    Storage::disk('public_portal')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgLoginName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                        Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-login.png');
                    }
                }
            } catch (\Exception $exception) {
                Log::error('Opslaan gewijzigde background-login.png (1x1 transparant) mislukt : ' . $exception->getMessage());
            }

        } else {

            //get background login
            $imageBgLogin = $request->file('attachmentImageBgLogin')
                ? $request->file('attachmentImageBgLogin') : false;

            if ($imageBgLogin) {
                //store background-login
                if (!$imageBgLogin->isValid()) {
                    abort('422', 'Error uploading file background-login');
                }

                try {
                    $layoutImageBgLoginName = 'background-login-' . $portalSettingsLayout->id . '.png';
                    if (Config::get('app.env') == "local") {
                        Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentImageBgLogin'), $layoutImageBgLoginName);
                        Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentImageBgLogin'), $layoutImageBgLoginName);
                        Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentImageBgLogin'), $layoutImageBgLoginName);
                        $portalSettingsLayout->portal_image_bg_file_name_login = $layoutImageBgLoginName;
                        $portalSettingsLayout->save();
                        if ($portalSettingsLayout->is_default) {
                            Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentImageBgLogin'), 'background-login.png');
                            Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentImageBgLogin'), 'background-login.png');
                            Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentImageBgLogin'), 'background-login.png');
                        }
                    } else {
                        Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentImageBgLogin'), $layoutImageBgLoginName);
                        $portalSettingsLayout->portal_image_bg_file_name_login = $layoutImageBgLoginName;
                        $portalSettingsLayout->save();
                        if ($portalSettingsLayout->is_default) {
                            Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentImageBgLogin'), 'background-login.png');
                        }
                    }
                } catch (\Exception $exception) {
                    Log::error('Opslaan gewijzigde background-login.png mislukt : ' . $exception->getMessage());
                }
            }

        }

        if ($portalSettingsLayout->use_transparent_background_header){
            try {
                $layoutImageBgHeaderName = 'background-header-' . $portalSettingsLayout->id . '.png';
                if (config('app.env') == "local") {
                    Storage::disk('public_portal_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                        Storage::disk('public_portal_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                    }
                    Storage::disk('customer_portal_app_build_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    Storage::disk('customer_portal_app_build_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('customer_portal_app_build_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                        Storage::disk('customer_portal_app_build_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                    }
                    Storage::disk('customer_portal_app_public_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('customer_portal_app_public_local')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                        Storage::disk('customer_portal_app_public_local')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                    }
                } else {
                    Storage::disk('public_portal')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $layoutImageBgHeaderName);
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->delete(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                        Storage::disk('public_portal')->copy(DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . '1x1.png', DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'background-header.png');
                    }
                }
            } catch (\Exception $exception) {
                Log::error('Opslaan gewijzigde background-header.png (1x1 transparant) mislukt : ' . $exception->getMessage());
            }

        } else {

            //get background header
            $imageBgHeader = $request->file('attachmentImageBgHeader')
                ? $request->file('attachmentImageBgHeader') : false;

            if ($imageBgHeader) {
                //store background-header
                if (!$imageBgHeader->isValid()) {
                    abort('422', 'Error uploading file background-header');
                }

                try {
                    $layoutImageBgHeaderName = 'background-header-' . $portalSettingsLayout->id . '.png';
                    if (Config::get('app.env') == "local") {
                        Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentImageBgHeader'), $layoutImageBgHeaderName);
                        Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentImageBgHeader'), $layoutImageBgHeaderName);
                        Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentImageBgHeader'), $layoutImageBgHeaderName);
                        $portalSettingsLayout->portal_image_bg_file_name_header = $layoutImageBgHeaderName;
                        $portalSettingsLayout->save();
                        if ($portalSettingsLayout->is_default) {
                            Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentImageBgHeader'), 'background-header.png');
                            Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('attachmentImageBgHeader'), 'background-header.png');
                            Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('attachmentImageBgHeader'), 'background-header.png');
                        }
                    } else {
                        Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentImageBgHeader'), $layoutImageBgHeaderName);
                        $portalSettingsLayout->portal_image_bg_file_name_header = $layoutImageBgHeaderName;
                        $portalSettingsLayout->save();
                        if ($portalSettingsLayout->is_default) {
                            Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentImageBgHeader'), 'background-header.png');
                        }
                    }
                } catch (\Exception $exception) {
                    Log::error('Opslaan gewijzigde background-header.png mislukt : ' . $exception->getMessage());
                }
            }

        }
    }
    /**
     * @param Request $request
     * @param PortalSettingsLayout $portalSettingsLayout
     */
    protected function storeFavicon(Request $request, PortalSettingsLayout $portalSettingsLayout)
    {
        //get favicon
        $favicon = $request->file('attachmentFavicon')
            ? $request->file('attachmentFavicon') : false;

        if ($favicon) {
            //store favicon
            if (!$favicon->isValid()) {
                abort('422', 'Error uploading file favicon');
            }
            try {
                $layoutFaviconName = 'favicon-' . $portalSettingsLayout->id . '.ico';
                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs(DIRECTORY_SEPARATOR, $request->file('attachmentFavicon'), $layoutFaviconName);
                    Storage::disk('customer_portal_app_build_local')->putFileAs(DIRECTORY_SEPARATOR, $request->file('attachmentFavicon'), $layoutFaviconName);
                    Storage::disk('customer_portal_app_public_local')->putFileAs(DIRECTORY_SEPARATOR, $request->file('attachmentFavicon'), $layoutFaviconName);
                    $portalSettingsLayout->portal_favicon_file_name = $layoutFaviconName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->putFileAs(DIRECTORY_SEPARATOR, $request->file('attachmentFavicon'), 'favicon.ico');
                        Storage::disk('customer_portal_app_build_local')->putFileAs(DIRECTORY_SEPARATOR, $request->file('attachmentFavicon'), 'favicon.ico');
                        Storage::disk('customer_portal_app_public_local')->putFileAs(DIRECTORY_SEPARATOR, $request->file('attachmentFavicon'), 'favicon.ico');
                    }
                } else {
                    Storage::disk('public_portal')->putFileAs('/', $request->file('attachmentFavicon'), $layoutFaviconName);
                    $portalSettingsLayout->portal_favicon_file_name = $layoutFaviconName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->putFileAs('/', $request->file('attachmentFavicon'), 'favicon.ico');
                    }
                }
            } catch (\Exception $exception) {
                Log::error('Opslaan gewijzigde favicon.ico mislukt : ' . $exception->getMessage());
            }
        }
    }

}