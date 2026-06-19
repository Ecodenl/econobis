<?php

namespace App\Http\Controllers\Portal\PortalSettingsDashboard;

use App\Eco\Contact\Contact;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Helpers\Template\TemplateVariableHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\PortalSettingsDashboard\FullPortalSettingsDashboard;

class PortalSettingsDashboardController extends Controller
{

    public function get(PortalSettingsDashboard $portalSettingsDashboard, Contact $contact){

        $portalSettingsDashboard->load('widgets');

        $validatedWidgets = $portalSettingsDashboard->widgets->reject(function ($widget) use($contact) {
            if($widget->contactGroup){
                $allContacts = (array_unique($widget->contactGroup->getAllContacts()->pluck('id')->toArray()));
                if(!in_array($contact->id, $allContacts)) {
                    return true;
                }
            }

            if($widget->hideForContactGroup){
                $hideForContacts = (array_unique($widget->hideForContactGroup->getAllContacts()->pluck('id')->toArray()));
                if(in_array($contact->id, $hideForContacts)) {
                    return true;
                }
            }

            return false;
        });

        // buttonLink placeholders vervangen
        $validatedWidgets->transform(function ($widget) use ($contact) {
            if (!empty($widget->button_link)) {
                $widget->button_link = TemplateVariableHelper::replaceTemplateVariables($widget->button_link,'contact', $contact);
            }
            return $widget;
        });

        $portalSettingsDashboard->widgets = $validatedWidgets;
        return FullPortalSettingsDashboard::make($portalSettingsDashboard);
    }

}