<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class OpportunityStatusJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('name')->filterable()->sortable();
        $config->field('usesWf')->filterable()->sortable();
        $config->field('emailTemplateIdWf')->filterable()->sortable();
        $config->field('numberOfDaysToSendEmail')->filterable()->sortable();

        // Relations
        $config->relation('emailTemplateWorkflow');
    }
}