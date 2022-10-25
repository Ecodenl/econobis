<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class Okt2022addNewRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $newRoles = [
            'Energiemanager',
            'Energiecoordinator',
        ];
        foreach($newRoles as $newRole) {
            $role =  \Spatie\Permission\Models\Role::create([
                'name' => $newRole,
                'guard_name' => 'api',
            ]);
        }

        $permissions = [
            'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_financial', 'menu_workflow', 'menu_general_settings', 'menu_portal_settings',
            'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
            'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
            'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation',
            'view_contact_other', 'view_contact_portal_user', 'view_contact_note', 'view_contact_conclusion',
            'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
            'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
            'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
        ];
        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        // Roles binnen econobis:
        //
        // Key user                           is superuser, krijgt altijd alle Permissions
        // Medewerker
        // Medewerker 2
        // Projectmedewerker
        // Financieel medewerker
        // Financieel controller
        // Participatie medewerker
        // Energie adviseur
        // Marketing medewerker
        // Beheerder webformulier             is specifieke extra role. hier hoeven geen nieuwe permissions aan toegevoegd te worden
        // Beheerder Mailgun domeinen         is specifieke extra role. hier hoeven geen nieuwe permissions aan toegevoegd te worden
        // Beheerder Portal Settings          is specifieke extra role. hier hoeven geen nieuwe permissions aan toegevoegd te worden
        // Beheerder coöperatie instellingen  is specifieke extra role. hier hoeven geen nieuwe permissions aan toegevoegd te worden
        // Energiemanager                     is nieuwe role
        // Energiecoordinator                 is nieuwe role

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        //make roles inzake menu permissions
        $menuRoles = [
            'Medewerker' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Medewerker 2' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Projectmedewerker' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Financieel medewerker' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_financial', 'menu_workflow', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Financieel controller' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_financial', 'menu_workflow', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Participatie medewerker' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks','menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Energie adviseur' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Marketing medewerker' => [
                'menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Energiemanager' => [
                'menu_contacts', 'menu_energy_saving', 'menu_email', 'menu_tasks','menu_agenda','menu_documents',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
            'Energiecoordinator' => [
                'menu_contacts', 'menu_energy_saving', 'menu_email', 'menu_tasks', 'menu_agenda', 'menu_documents',
                'menu_organisations', 'menu_persons', 'menu_housing_files', 'menu_intakes', 'menu_opportunities', 'menu_quotation_requests', 'menu_measures',
                ],
        ];
        foreach($menuRoles as $menuRoleName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($menuRoleName);
            $role->givePermissionTo($permissions);

        }

        //make roles inzake nieuw view permissions
        $newViewRoles = [
            'Medewerker' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
                ],
            'Medewerker 2' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
                ],
            'Projectmedewerker' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            ],
            'Financieel medewerker' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            ],
            'Financieel controller' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            ],
            'Participatie medewerker' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            ],
            'Energie adviseur' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            ],
            'Marketing medewerker' => [
                'view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview',
                'view_project', 'view_jobs_log', 'view_twinfield_log', 'view_financial', 'view_cooperation_settings', 'view_webform', 'view_email_template', 'view_user', 'view_email_team', 'create_email_template',
            ],
            'Energiemanager' => [
                'view_email', 'view_task', 'view_note', 'view_intake', 'view_opportunity', 'view_housing_file',
            ],
            'Energiecoordinator' => [
                'view_email', 'view_task', 'view_note', 'view_intake', 'view_opportunity', 'view_housing_file',
            ],
        ];
        foreach($newViewRoles as $newViewRoleName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($newViewRoleName);
            $role->givePermissionTo($permissions);

        }

        //make roles inzake menu permissions
        $newRolePermissions = [
            'Energiemanager' => ['create_person', 'view_person', 'update_person', 'create_organisation', 'view_organisation', 'update_organisation', 'manage_opportunity', 'manage_task', 'manage_intake', 'create_document', 'view_document', 'manage_housing_file', 'manage_quotation_request'],
            'Energiecoordinator' => ['view_person', 'view_organisation', 'manage_opportunity', 'manage_task', 'manage_intake', 'create_document', 'view_document', 'manage_housing_file', 'manage_quotation_request'],
        ];
        foreach($newRolePermissions as $newRolePermissionRoleName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($newRolePermissionRoleName);
            $role->givePermissionTo($permissions);

        }

        //make roles inzake contact details
        $newContactRolePermissions = [
            'Medewerker' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Medewerker 2' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Projectmedewerker' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Financieel medewerker' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Financieel controller' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Participatie medewerker' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Energie adviseur' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Marketing medewerker' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_other', 'view_contact_portal_user', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone', 'create_contact_occupation', 'create_contact_note',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone', 'update_contact_occupation', 'update_contact_other', 'update_contact_portal_user', 'update_contact_note',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone', 'delete_contact_occupation', 'delete_contact_portal_user', 'delete_contact_note'
            ],
            'Energiemanager' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_occupation', 'view_contact_note',
                'create_contact_address', 'create_contact_email', 'create_contact_phone',
                'update_contact_general', 'update_contact_address', 'update_contact_email', 'update_contact_phone',
                'delete_contact_address', 'delete_contact_email', 'delete_contact_phone'
            ],
            'Energiecoordinator' => [
                'view_contact_general', 'view_contact_address', 'view_contact_email', 'view_contact_phone', 'view_contact_quotation', 'view_contact_coach_quotation', 'view_contact_campaign', 'view_contact_note',
            ],
        ];
        foreach($newContactRolePermissions as $newContactRolePermissionName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($newContactRolePermissionName);
            $role->givePermissionTo($permissions);

        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
