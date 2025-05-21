<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 04-01-2018
 * Time: 14:20
 */

namespace App\Http\Resources\PortalSettingsDashboard;

use App\Http\Resources\ContactGroup\ContactGroupPeek;
use Illuminate\Http\Resources\Json\JsonResource;

class FullPortalSettingsDashboardWidget
    extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'codeRef' => $this->code_ref,
            'order' => $this->order,
            'title' => $this->title,
            'text' => $this->text,
            'widgetImageFileName' => $this->widget_image_file_name,
            'active' => $this->active,
            'buttonText' => $this->button_text,
            'buttonLink' => $this->button_link,
            'backgroundColor' => $this->background_color,
            'textColor' => $this->text_color,
            'backgroundColorUsed' => $this->background_color_used,
            'textColorUsed' => $this->text_color_used,
            'showGroupId' => $this->show_group_id,
            'hideGroupId' => $this->hide_group_id,
            'contactGroup' => ContactGroupPeek::make($this->whenLoaded('contactGroup')),
            'hideForContactGroup' => ContactGroupPeek::make($this->whenLoaded('hideForContactGroup')),
        ];
    }
}