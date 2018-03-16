<?php

return [
    'Address' => [
        'soft_delete' => true,
    ],

    'Campaign' => [
        'soft_delete' => false,
        'relations' =>
            [['remove_pivots' => 'measureCategories'],
            ['remove_pivots' => 'organisations'],
            ['remove_pivots' => 'responses']],
    ],

    'ContactGroup' => [
        'soft_delete' => false,
        'relations' =>
            [['remove_pivots' => 'contacts'],
            ['dissociate' => ['relation' => 'documents', 'foreign_key' => 'contact_group_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'contact_group_id']]],
    ],

    'Task' => [
        'soft_delete' => true,
        'relations' =>
            [['dissociate' => ['relation' => 'documents', 'foreign_key' => 'task_id']],
            ['dissociate' => ['relation' => 'tasks', 'foreign_key' => 'task_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'task_id']]],
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

    'Opportunity' => [
        'soft_delete' => false,
        'relations' =>
            [['delete_recursive' => 'quotationRequests'],
            ['dissociate' => ['relation' => 'tasks', 'foreign_key' => 'opportunity_id']],
            ['dissociate' => ['relation' => 'notes', 'foreign_key' => 'opportunity_id']],
            ['dissociate' => ['relation' => 'documents', 'foreign_key' => 'opportunity_id']],
            ['dissociate' => ['relation' => 'emails', 'foreign_key' => 'opportunity_id']],
            ['remove' => 'opportunityEvaluation']],
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
