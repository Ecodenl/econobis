<?php

namespace App\Http\JoryResources;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Http\JoryResources\Base\JoryResource;

class PortalSettingsLayoutJoryResource extends JoryResource
{
    protected $modelClass = PortalSettingsLayout::class;

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
        $this->field('is_default')->filterable()->sortable();
        $this->field('portal_logo_file_name')->filterable()->sortable();
        $this->field('portal_favicon_file_name')->filterable()->sortable();
        $this->field('portal_background_color')->filterable()->sortable();
        $this->field('portal_background_text_color')->filterable()->sortable();
        $this->field('login_header_background_color')->filterable()->sortable();
        $this->field('login_header_background_text_color')->filterable()->sortable();
        $this->field('header_icons_color')->filterable()->sortable();
        $this->field('login_field_background_color')->filterable()->sortable();
        $this->field('login_field_background_text_color')->filterable()->sortable();
        $this->field('button_color')->filterable()->sortable();
        $this->field('button_text_color')->filterable()->sortable();

        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();
//        $this->field('deleted_at')->filterable()->sortable();

    }

    protected function configureForPortal(): void
    {
    }
}
