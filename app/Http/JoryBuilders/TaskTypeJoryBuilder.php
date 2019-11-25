<?php

namespace App\Http\JoryBuilders;


use JosKolenberg\LaravelJory\Config\Config;
use JosKolenberg\LaravelJory\JoryBuilder;

class TaskTypeJoryBuilder extends JoryBuilder
{
    protected function config(Config $config): void
    {
        $config->field('id')->filterable()->sortable();
        $config->field('name')->filterable()->sortable();
        $config->field('usesWfCompletedTask')->filterable()->sortable();
        $config->field('emailTemplateIdWfCompletedTask')->filterable()->sortable();
        $config->field('numberOfDaysToSendEmailCompletedTask')->filterable()->sortable();
        $config->field('usesWfExpiredTask')->filterable()->sortable();
        $config->field('emailTemplateIdWfExpiredTask')->filterable()->sortable();
        $config->field('created_at')->filterable()->sortable();
        $config->field('updated_at')->filterable()->sortable();

        // Relations
        $config->relation('emailTemplateWorkflowCompletedTask');
        $config->relation('emailTemplateWorkflowExpiredTask');
    }
}