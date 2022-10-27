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

    // Nog niet nodig. Per cooperatie is er altijd 1 record die bij installatie al wordt aangemaakt
    public function store(RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);
    }

    public function update(PortalSettingsDashboard $portalSettingsDashboard, RequestInput $input, Request $request)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);

        $data = $input->string('welcomeTitle')->whenMissing('')->onEmpty('')->alias('welcome_title')->next()
            ->string('welcomeMessage')->whenMissing('')->onEmpty('')->alias('welcome_message')->next()
            ->string('defaultWidgetBackgroundColor')->whenMissing('#ffffff')->onEmpty('#ffffff')->alias('default_widget_background_color')->next()
            ->string('defaultWidgetTextColor')->whenMissing('#000000')->onEmpty('#000000')->alias('default_widget_text_color')->next()
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

    // Nog niet nodig. Per cooperatie is er altijd 1 record die bij installatie al wordt aangemaakt
    public function destroy(PortalSettingsDashboard $portalSettingsDashboard)
    {
        $this->authorize('manage', PortalSettingsDashboard::class);
    }
}