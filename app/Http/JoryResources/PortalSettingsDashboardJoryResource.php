<?php

namespace App\Http\JoryResources;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Http\JoryResources\Base\JoryResource;

class PortalSettingsDashboardJoryResource extends JoryResource
{
    protected $modelClass = PortalSettingsDashboard::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('welcome_title')->filterable()->sortable();
        $this->field('welcome_message')->filterable()->sortable();
        $this->field('default_widget_background_color')->filterable()->sortable();
        $this->field('default_widget_text_color')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
        $this->field('deleted_at')->filterable()->sortable();

        // Relations
        $this->relation('widgets');
    }

    protected function configureForPortal(): void
    {
        // Fields
//        $this->field('id')->filterable()->sortable();
//        $this->field('welcome_title')->filterable()->sortable();
//        $this->field('welcome_message')->filterable()->sortable();
//        $this->field('default_widget_background_color')->filterable()->sortable();
//        $this->field('default_widget_text_color')->filterable()->sortable();
//        $this->field('created_at')->filterable()->sortable();
//        $this->field('updated_at')->filterable()->sortable();
//        $this->field('deleted_at')->filterable()->sortable();

        // Relations
//        $this->relation('widgets');
    }
}
