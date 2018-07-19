<?php

return [
    'Address' => [
        'soft_delete' => true,
    ],

    'Administration' => [
        'soft_delete' => true,
        'relations' =>
            [['remove_pivots' => 'users']],
    ],

    'Campaign' => [
        'soft_delete' => false,
        'relations' =>
            [['remove_pivots' => 'measureCategories'],
            ['remove_pivots' => 'organisations'],
            ['remove' => 'responses']],
    ],

    'ContactGroup' => [
        'soft_delete' => false,
        'relations' =>
            [['remove_pivots' => 'contacts'],
            ['remove_pivots' => 'contactGroups'],
            ['remove' => 'filters'],
            ['remove' => 'extraFilters'],
            ['delete_recursive' => 'emails'],
            ['dissociate' => ['relation' => 'documents', 'foreign_key' => 'contact_group_id']],
            ['dissociate' => ['relation' => 'tasks', 'foreign_key' => 'contact_group_id']]],
    ],

    'Email' => [
        'soft_delete' => false,
        'relations' =>
            [['remove_attachments' => ['disk' => 'mail_attachments']],
                ['remove_pivots' => 'contacts'],
                ['remove_pivots' => 'groupEmailAddresses'],
            ]
    ],

    'Task' => [
        'soft_delete' => true,
        'relations' =>
            [['dissociate' => ['relation' => 'documents', 'foreign_key' => 'task_id']],
            ['dissociate' => ['relation' => 'tasks', 'foreign_key' => 'task_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'task_id']]],
    ],

    'ProductionProject' => [
        'soft_delete' => false,
        'custom_delete' => 'deleteProductionProject'
    ],

    'ParticipantProductionProject' => [
        'soft_delete' => true,
        'relations' =>
            [['delete_recursive' => 'transactions'],
            ['dissociate' => ['relation' => 'documents', 'foreign_key' => 'participation_production_project_id']]],
    ],

    'ParticipantTransaction' => [
        'soft_delete' => true,
    ],

    'Product' => [
        'soft_delete' => true,
    ],

    'Opportunity' => [
        'soft_delete' => false,
        'relations' =>
            [['remove_pivots' => 'measures'],
            ['delete_recursive' => 'quotationRequests'],
            ['dissociate' => ['relation' => 'tasks', 'foreign_key' => 'opportunity_id']],
            ['dissociate' => ['relation' => 'notes', 'foreign_key' => 'opportunity_id']],
            ['dissociate' => ['relation' => 'documents', 'foreign_key' => 'opportunity_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'opportunity_id']],
            ['remove' => 'opportunityEvaluation']],
    ],

    'Order' => [
        'soft_delete' => true,
    ],

    'QuotationRequest' => [
        'soft_delete' => false,
        'relations' =>
            [['dissociate' => ['relation' => 'documents', 'foreign_key' => 'quotation_request_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'quotation_request_id']]],
    ],

    'Intake' => [
        'soft_delete' => false,
        'relations' =>
            [['dissociate' => ['relation' => 'tasks', 'foreign_key' => 'intake_id']],
            ['dissociate' => ['relation' => 'notes', 'foreign_key' => 'intake_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'intake_id']],
            ['dissociate' => ['relation' => 'opportunities', 'foreign_key' => 'intake_id']],
            ['remove_pivots' => 'measuresRequested'],
            ['remove_pivots' => 'reasons'],
            ['remove_pivots' => 'sources']],
    ],

    'Contact' => [
        'soft_delete' => true,
        'relations' =>
            [['delete_recursive' => 'person'],
            ['delete_recursive' => 'organisation']],
    ],

    'Organisation' => [
        'soft_delete' => true,
    ],

    'Person' => [
        'soft_delete' => true,
    ],

];
