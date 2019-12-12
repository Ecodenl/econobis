<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class QuotationRequestStatusJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('name')->filterable()->sortable();
        $config->field('usesWf')->filterable()->sortable();
        $config->field('emailTemplateIdWf')->filterable()->sortable();
        $config->field('numberOfDaysToSendEmail')->filterable()->sortable();
        $config->field('created_at')->filterable()->sortable();
        $config->field('updated_at')->filterable()->sortable();
        $config->field('order')->filterable()->sortable();

        // Relations
        $config->relation('emailTemplateWorkflow');
    }
}