<?php

namespace App\Http\Controllers\Api\PortalSettingsDashboard;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use App\Helpers\Delete\Models\DeletePortalSettingsDashboardWidget;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortalSettingsDashboard\FullPortalSettingsDashboard;
use App\Http\Resources\PortalSettingsDashboard\FullPortalSettingsDashboardWidget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use JosKolenberg\LaravelJory\Facades\Jory;
use Ramsey\Uuid\Uuid;
use Config;
use Exception;

class PortalSettingsDashboardWidgetController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettingsDashboardWidget::class);
    }

    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);

        $data = $input->integer('portalSettingsDashboardId')->alias('portal_settings_dashboard_id')->next()
            ->string('code_ref')->whenMissing('')->onEmpty('')->alias('codeRef')->next()
            ->integer('order')->whenMissing(999)->onEmpty(999)->next()
            ->string('title')->whenMissing('')->onEmpty('')->next()
            ->string('text')->whenMissing('')->onEmpty('')->next()
            ->string('buttonText')->whenMissing('')->onEmpty('')->alias('button_text')->next()
            ->string('buttonLink')->whenMissing('')->onEmpty('')->alias('button_link')->next()
            ->string('backgroundColor')->whenMissing('')->onEmpty('')->alias('background_color')->next()
            ->string('textColor')->whenMissing('')->onEmpty('')->alias('text_color')->next()
//            ->string('widgetImageFileName')->whenMissing('')->onEmpty('')->alias('widget_image_file_name')->next()
            ->integer('showGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('show_group_id')->next()
            ->integer('hideGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('hide_group_id')->next()
            ->boolean('active')->whenMissing(true)->onEmpty(true)->next()
            ->get();

        $data['code_ref'] = Uuid::uuid1();

        $portalSettingsDashboardWidget = new PortalSettingsDashboardWidget($data);
        $portalSettingsDashboardWidget->save();

        $this->storeWidgetImage($request, $portalSettingsDashboardWidget, $request->input('widgetImageFileName'), null);

        return Jory::on($portalSettingsDashboardWidget);
    }

    public function update(PortalSettingsDashboardWidget $portalSettingsDashboardWidget, RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);

        $data = $input
//            ->integer('portalSettingsDashboardId')->alias('portal_settings_dashboard_id')->next()
            ->string('code_ref')->whenMissing('')->onEmpty('')->alias('codeRef')->next()
            ->integer('order')->whenMissing(999)->onEmpty(999)->next()
            ->string('title')->whenMissing('')->onEmpty('')->next()
            ->string('text')->whenMissing('')->onEmpty('')->next()
            ->string('buttonText')->whenMissing('')->onEmpty('')->alias('button_text')->next()
            ->string('buttonLink')->whenMissing('')->onEmpty('')->alias('button_link')->next()
            ->string('backgroundColor')->whenMissing('')->onEmpty('')->alias('background_color')->next()
            ->string('textColor')->whenMissing('')->onEmpty('')->alias('text_color')->next()
//            ->string('widgetImageFileName')->whenMissing('')->onEmpty('')->alias('widget_image_file_name')->next()
            ->integer('showGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('show_group_id')->next()
            ->integer('hideGroupId')->validate('nullable|exists:contact_groups,id')->onEmpty(null)->alias('hide_group_id')->next()
            ->boolean('active')->whenMissing(true)->onEmpty(true)->next()
            ->get();

        //bool als string? waarschijnlijk door formdata
        $active = $request->input('active');
        if($active == 'false' || $active == '0'){
            $active = false;
        }
        if($active == 'true' || $active == '1'){
            $active = true;
        }
        $data['active'] = $active;
        $oldWidgetImageFileName = $portalSettingsDashboardWidget->widget_image_file_name;

        $portalSettingsDashboardWidget->fill($data);
        $portalSettingsDashboardWidget->save();

        $this->storeWidgetImage($request, $portalSettingsDashboardWidget, $request->input('widgetImageFileName'), $oldWidgetImageFileName);

        return FullPortalSettingsDashboardWidget::make($portalSettingsDashboardWidget->load(['contactGroup', 'hideForContactGroup']));

    }

    public function destroy(PortalSettingsDashboardWidget $portalSettingsDashboardWidget)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);

        try {
            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->delete('images/' . $portalSettingsDashboardWidget->widget_image_file_name);
                Storage::disk('customer_portal_app_build_local')->delete('images/' . $portalSettingsDashboardWidget->widget_image_file_name);
                Storage::disk('customer_portal_app_public_local')->delete('images/' . $portalSettingsDashboardWidget->widget_image_file_name);
            } else {
                Storage::disk('public_portal')->delete('images/' . $portalSettingsDashboardWidget->widget_image_file_name);
            }

        } catch (\Exception $exception) {
            Log::error('Verwijderen widget afbeelding mislukt : ' . $exception->getMessage());
            abort('422', 'Verwijderen widget afbeelding mislukt : ' . $exception->getMessage());
        }

        try {
            DB::beginTransaction();

            $deletePortalSettingsDashboard = new DeletePortalSettingsDashboardWidget($portalSettingsDashboardWidget);
            $result = $deletePortalSettingsDashboard->delete();

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

        return FullPortalSettingsDashboard::make($portalSettingsDashboardWidget->portalSettingsDashboard->load('widgets'));
    }

    /**
     * @param Request $request
     * @param $portalSettingsDashboardWidget
     * @param $originalFileName
     * @param $oldWidgetImageFileName
     * @return void
     */
    protected function storeWidgetImage(Request $request, $portalSettingsDashboardWidget, $originalFileName, $oldWidgetImageFileName)
    {
        //get imageWidget
        $imageWidget = $request->file('image')
            ? $request->file('image') : false;

        if ($imageWidget) {
            //store imageWidget
            if (!$imageWidget->isValid()) {
                abort('422', 'Error uploading file background-login');
            }

            try {
                $fileExtensie = pathinfo($originalFileName, PATHINFO_EXTENSION);
                $newWidgetImageFileName = $portalSettingsDashboardWidget->code_ref . '.' . $fileExtensie;

                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs('images', $request->file('image'), $newWidgetImageFileName);
                    Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('image'), $newWidgetImageFileName);
                    Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('image'), $newWidgetImageFileName);
                } else {
                    Storage::disk('public_portal')->putFileAs('images', $request->file('image'), $newWidgetImageFileName);
                }

                if ($oldWidgetImageFileName !== $newWidgetImageFileName) {
                    if (Config::get('app.env') == "local") {
                        Storage::disk('public_portal_local')->delete('images/' . $oldWidgetImageFileName);
                        Storage::disk('customer_portal_app_build_local')->delete('images/' . $oldWidgetImageFileName);
                        Storage::disk('customer_portal_app_public_local')->delete('images/' . $oldWidgetImageFileName);
                    } else {
                        Storage::disk('public_portal')->delete('images/' . $oldWidgetImageFileName);
                    }
                    $portalSettingsDashboardWidget->widget_image_file_name = $newWidgetImageFileName;
                    $portalSettingsDashboardWidget->save();
                }

            } catch (\Exception $exception) {
                Log::error('Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
                abort('422', 'Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
            }
        }
    }


}