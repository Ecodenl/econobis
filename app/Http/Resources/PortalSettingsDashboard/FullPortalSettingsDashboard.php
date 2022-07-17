<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\PortalSettingsDashboard;


use Illuminate\Http\Resources\Json\JsonResource;

class FullPortalSettingsDashboard extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'welcomeTitle' => $this->welcome_title,
            'welcomeMessage' => $this->welcome_message,
            'defaultWidgetBackgroundColor' => $this->default_widget_background_color,
            'defaultWidgetTextColor' => $this->default_widget_text_color,
            'widgets' => GridPortalSettingsDashboardWidget::collection($this->whenLoaded('widgets')),
        ];
    }
}