<?php

namespace App\Http\Controllers\Api\PortalSettingsLayout;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Helpers\Delete\Models\DeletePortalSettingsLayout;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
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
            ->string('portalFaviconFileName')->whenMissing('')->onEmpty('')->alias('portal_favicon_file_name')->next()
            ->string('portalBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('portal_background_color')->next()
            ->string('portalBackgroundTextColor')->whenMissing('#000')->onEmpty('#000')->alias('portal_background_text_color')->next()
            ->string('loginHeaderBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('login_header_background_color')->next()
            ->string('loginHeaderBackgroundTextColor')->whenMissing('#000')->onEmpty('#000')->alias('login_header_background_text_color')->next()
            ->string('headerIconsColor')->whenMissing('#000')->onEmpty('#000')->alias('header_icons_color')->next()
            ->string('loginFieldBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('login_field_background_color')->next()
            ->string('loginFieldBackgroundTextColor')->whenMissing('#000')->onEmpty('#000')->alias('login_field_background_text_color')->next()
            ->string('buttonColor')->whenMissing('#000')->onEmpty('#000')->alias('button_color')->next()
            ->string('buttonTextColor')->whenMissing('#fff')->onEmpty('#fff')->alias('button_text_color')->next()
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
            ->string('portalFaviconFileName')->whenMissing('favicon.ico')->onEmpty('favicon.ico')->alias('portal_favicon_file_name')->next()
            ->string('portalBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('portal_background_color')->next()
            ->string('portalBackgroundTextColor')->whenMissing('#000')->onEmpty('#000')->alias('portal_background_text_color')->next()
            ->string('loginHeaderBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('login_header_background_color')->next()
            ->string('loginHeaderBackgroundTextColor')->whenMissing('#000')->onEmpty('#000')->alias('login_header_background_text_color')->next()
            ->string('headerIconsColor')->whenMissing('#000')->onEmpty('#000')->alias('header_icons_color')->next()
            ->string('loginFieldBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('login_field_background_color')->next()
            ->string('loginFieldBackgroundTextColor')->whenMissing('#000')->onEmpty('#000')->alias('login_field_background_text_color')->next()
            ->string('buttonColor')->whenMissing('#000')->onEmpty('#000')->alias('button_color')->next()
            ->string('buttonTextColor')->whenMissing('#fff')->onEmpty('#fff')->alias('button_text_color')->next()
            ->get();

        $portalSettingsLayout->fill($data);
        $portalSettingsLayout->save();

        $this->storeLogoAndFavicon($request, $portalSettingsLayout);

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
    protected function storeLogoAndFavicon(Request $request, PortalSettingsLayout $portalSettingsLayout)
    {
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
                    $portalSettingsLayout->portal_logo_file_name = $layoutLogoName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->putFileAs('images', $request->file('attachmentLogo'), 'logo.png');
                    }
                } else {
                    Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentLogo'), $layoutLogoName);
                    $portalSettingsLayout->portal_logo_file_name = $layoutLogoName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->putFileAs('images', $request->file('attachmentLogo'), 'logo.png');
                    }
                }
            } catch (Exception $exception) {
                Log::error('Opslaan gewijzigde logo.png mislukt : ' . $exception->getMessage());
            }

        }

        //get favicon
        $favicon = $request->file('attachmentFavicon')
            ? $request->file('attachmentFavicon') : false;

        if ($favicon) {
            //store favicon
            if (!$favicon->isValid()) {
                abort('422', 'Error uploading file favicon');
            }
            try {
                $layoutFaviconName = 'logo-' . $portalSettingsLayout->id . '.png';
                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs('/', $request->file('attachmentFavicon'), $layoutFaviconName);
                    $portalSettingsLayout->portal_favicon_file_name = $layoutFaviconName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal_local')->putFileAs('/', $request->file('attachmentFavicon'), 'favicon.ico');
                    }
                } else {
                    Storage::disk('public_portal')->putFileAs('/', $request->file('attachmentFavicon'), $layoutFaviconName);
                    $portalSettingsLayout->portal_favicon_file_name = $layoutFaviconName;
                    $portalSettingsLayout->save();
                    if ($portalSettingsLayout->is_default) {
                        Storage::disk('public_portal')->putFileAs('/', $request->file('attachmentFavicon'), 'favicon.ico');
                    }
                }
            } catch (Exception $exception) {
                Log::error('Opslaan gewijzigde favicon.ico mislukt : ' . $exception->getMessage());
            }

        }
    }

}