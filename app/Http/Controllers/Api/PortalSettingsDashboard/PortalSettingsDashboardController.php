<?php

namespace App\Http\Controllers\Api\PortalSettingsDashboard;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortalSettingsDashboard\FullPortalSettingsDashboard;
use Illuminate\Http\Request;
use JosKolenberg\LaravelJory\Facades\Jory;
use Config;
use Exception;

class PortalSettingsDashboardController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettingsDashboard::class);
    }

// todo WM: opschonen
//
//    public function get(PortalSettingsDashboard $portalSettingsDashboard){
//
//Log::info($portalSettingsDashboard);
//        $portalSettingsDashboard->load('widgets');
//
//        return FullPortalSettingsDashboard::make($portalSettingsDashboard);
//    }

// todo WM: is deze nodig? Per cooperatie is er altijd 1 record die bij installatie al wordt aangemaakt
    public function store(RequestInput $input, Request $request)
    {
// todo WM: opschonen
//
//        $this->authorize('manage', PortalSettingsDashboard::class);
//
//        $data = $input->string('welcomeTitle')->whenMissing('')->onEmpty('')->alias('welcome_title')->next()
//                ->string('welcomeMessage')->whenMissing('')->onEmpty('')->alias('welcome_message')->next()
//                ->string('defaultWidgetBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('default_widget_background_color')->next()
//                ->string('defaultWidgetTextColor')->whenMissing('#000')->onEmpty('#000')->alias('default_widget_text_color')->next()
//                ->get();
//
//        $portalSettingsDashboard = new PortalSettingsDashboard($data);
//        $portalSettingsDashboard->save();
//
//        return Jory::on($portalSettingsDashboard);
    }

    public function update(PortalSettingsDashboard $portalSettingsDashboard, RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);

        $data = $input->string('welcomeTitle')->whenMissing('')->onEmpty('')->alias('welcome_title')->next()
            ->string('welcomeMessage')->whenMissing('')->onEmpty('')->alias('welcome_message')->next()
            ->string('defaultWidgetBackgroundColor')->whenMissing('#fff')->onEmpty('#fff')->alias('default_widget_background_color')->next()
            ->string('defaultWidgetTextColor')->whenMissing('#000')->onEmpty('#000')->alias('default_widget_text_color')->next()
            ->get();

        $portalSettingsDashboard->fill($data);
        $portalSettingsDashboard->save();

        if($request->input('widgets')){
            foreach ($request->input('widgets') as $inputWidget) {
                $widget = PortalSettingsDashboardWidget::find($inputWidget['id']);
                if($widget){
                    $widget->order = $inputWidget['order'];
                    $widget->save();
                }
            }
        }
        return FullPortalSettingsDashboard::make($portalSettingsDashboard->load('widgets'));
    }

// todo WM: is deze nodig? Per cooperatie is er altijd 1 record die bij installatie al wordt aangemaakt
    public function destroy(PortalSettingsDashboard $portalSettingsDashboard)
    {
//        $this->authorize('manage', PortalSettingsDashboard::class);
//
//        try {
//            DB::beginTransaction();
//
//            $deletePortalSettingsDashboard = new DeletePortalSettingsDashboard($portalSettingsDashboard);
//            $result = $deletePortalSettingsDashboard->delete();
//
//            if(count($result) > 0){
//                DB::rollBack();
//                abort(412, implode(";", array_unique($result)));
//            }
//
//            DB::commit();
//        } catch (\PDOException $e) {
//            DB::rollBack();
//            Log::error($e->getMessage());
//            abort(501, 'Er is helaas een fout opgetreden.');
//        }
    }
}