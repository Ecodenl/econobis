<?php

namespace App\Http\JoryResources;


use App\Eco\Task\TaskType;
use App\Http\JoryResources\Base\JoryResource;

class TaskTypeJoryResource extends JoryResource
{
    protected $modelClass = TaskType::class;

    protected function configureForApp(): void
    {
        $this->field('id')->filterable()->sortable();
        $this->field('name')->filterable()->sortable();
        $this->field('usesWfCompletedTask')->filterable()->sortable();
        $this->field('emailTemplateIdWfCompletedTask')->filterable()->sortable();
        $this->field('numberOfDaysToSendEmailCompletedTask')->filterable()->sortable();
        $this->field('usesWfExpiredTask')->filterable()->sortable();
        $this->field('emailTemplateIdWfExpiredTask')->filterable()->sortable();
        $this->field('created_at')->filterable()->sortable();
        $this->field('updated_at')->filterable()->sortable();

        // Relations
        $this->relation('emailTemplateWorkflowCompletedTask');
        $this->relation('emailTemplateWorkflowExpiredTask');
    }

    protected function configureForPortal(): void
    {
        // TODO: Implement configureForPortal() method.
    }
}