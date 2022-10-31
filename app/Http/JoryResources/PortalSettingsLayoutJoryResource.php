<?php

namespace App\Http\JoryResources;

use App\Eco\PortalSettingsLayout\PortalSettingsLayout;
use App\Http\Controllers\Api\PortalSettingsLayout\PortalSettingsLayoutController;
use App\Http\JoryResources\Base\JoryResource;

class PortalSettingsLayoutJoryResource extends JoryResource
{
    protected $modelClass = PortalSettingsLayout::class;

    protected function checkAuthorize(): void
    {
//todo WM: Hiervoor moet nog een aparte permission view_portal_settings komen
// en in PortalSettingsLayoutPolicy moeten we dan wellicht ook nog rekening houden met verschil
// User en PortalUser ?!
//        $portalSettingsLayoutController = new PortalSettingsLayoutController();
//        $portalSettingsLayoutController->authorize('view', PortalSettingsLayout::class);
    }

    protected function configureForApp(): void
    {
        // Fields
        $this->field('id')->filterable()->sortable();
        $this->field('description')->filterable()->sortable();
        $this->field('is_default')->filterable()->sortable();
        $this->field('portal_logo_file_name')->filterable()->sortable();
        $this->field('portal_logo_file_name_header')->filterable()->sortable();
        $this->field('portal_image_bg_file_name_login')->filterable()->sortable();
        $this->field('use_transparent_background_login')->filterable()->sortable();
        $this->field('portal_image_bg_file_name_header')->filterable()->sortable();
        $this->field('use_transparent_background_header')->filterable()->sortable();
        $this->field('portal_favicon_file_name')->filterable()->sortable();
        $this->field('portal_main_background_color')->filterable()->sortable();
        $this->field('portal_main_text_color')->filterable()->sortable();
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
