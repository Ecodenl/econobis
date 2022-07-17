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

class GridPortalSettingsDashboardWidget
    extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'codeRef' => $this->welcome_title,
            'order' => $this->order,
            'title' => $this->title,
            'widgetImageFileName' => $this->widget_image_file_name,
            'active' => $this->active,
            'contactGroup' => ContactGroupPeek::make($this->whenLoaded('contactGroup')),
        ];
    }
}