<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class MailgunDomainJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('domain')->filterable()->sortable();
        $config->field('secret')->filterable()->sortable();
        $config->field('is_verified')->filterable()->sortable();
        $config->field('created_at')->filterable()->sortable();
        $config->field('updated_at')->filterable()->sortable();
    }

}