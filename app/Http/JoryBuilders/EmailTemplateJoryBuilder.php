<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class EmailTemplateJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('name')->filterable()->sortable();

        $config->field('subject')->filterable()->sortable();
        $config->field('created_by_id')->filterable()->sortable();
        $config->field('created_at')->filterable()->sortable();
        $config->field('updated_at')->filterable()->sortable();
        $config->field('deleted_at')->filterable()->sortable();
        $config->field('html_body')->filterable()->sortable();
    }
}