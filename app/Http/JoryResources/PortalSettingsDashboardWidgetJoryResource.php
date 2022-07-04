<?php

namespace App\Http\JoryResources;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
use App\Http\JoryResources\Base\JoryResource;

class PortalSettingsDashboardWidgetJoryResource extends JoryResource
{
    protected $modelClass = PortalSettingsDashboardWidget::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('portal_settings_dashboard_id')->filterable()->sortable();
        $this->field('code_ref')->filterable()->sortable();
        $this->field('order')->filterable()->sortable();
        $this->field('title')->filterable()->sortable();
        $this->field('widget_image_file_name')->filterable()->sortable();
        $this->field('active')->filterable()->sortable();
//        $this->field('text')->filterable()->sortable();
//        $this->field('button_text')->filterable()->sortable();
//        $this->field('button_link')->filterable()->sortable();
//        $this->field('show_group_id')->filterable()->sortable();
//        $this->field('background_color')->filterable()->sortable();
//        $this->field('text_color')->filterable()->sortable();
//        $this->field('created_at')->filterable()->sortable();
//        $this->field('updated_at')->filterable()->sortable();
//        $this->field('deleted_at')->filterable()->sortable();
    }

    protected function configureForPortal(): void
    {
        // Fields
//        $this->field('id')->filterable()->sortable();
//        $this->field('portal_settings_dashboard_id')->filterable()->sortable();
//        $this->field('code_ref')->filterable()->sortable();
//        $this->field('order')->filterable()->sortable();
//        $this->field('title')->filterable()->sortable();
//        $this->field('widget_image_file_name')->filterable()->sortable();
//        $this->field('active')->filterable()->sortable();
//        $this->field('text')->filterable()->sortable();
//        $this->field('button_text')->filterable()->sortable();
//        $this->field('button_link')->filterable()->sortable();
//        $this->field('show_group_id')->filterable()->sortable();
//        $this->field('background_color')->filterable()->sortable();
//        $this->field('text_color')->filterable()->sortable();
//        $this->field('created_at')->filterable()->sortable();
//        $this->field('updated_at')->filterable()->sortable();
//        $this->field('deleted_at')->filterable()->sortable();
    }
}
