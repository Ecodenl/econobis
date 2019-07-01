<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class CostCenterJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('description')->filterable()->sortable();
        $config->field('twinfield_cost_center_code')->filterable()->sortable();
        $config->field('created_at')->filterable()->sortable();
        $config->field('updated_at')->filterable()->sortable();
        $config->field('deleted_at')->filterable()->sortable();
    }
}