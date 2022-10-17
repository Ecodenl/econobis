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
        $permissions = [
            'menu_contacts',
            'menu_projects',
            'menu_energy_saving',
            'menu_contact_groups',
            'menu_email',
            'menu_marketing',
            'menu_tasks',
            'menu_agenda',
            'menu_processes',
            'menu_documents',
            'menu_financial',
            'menu_workflow',
            'menu_general_settings',
            'menu_portal_settings',
            'view_email',
            'view_task',
            'view_note',
            'view_participation',
            'view_intake',
            'view_opportunity',
            'view_housing_file',
            'view_contact_group',
            'view_order',
            'view_invoice',
            'view_financial_overview_contact',
        ];
        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

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
        // Beheerder webformulier             is specifieke extra role. hier hoven geen nieuwe permissions aan toegevoegd te worden
        // Beheerder Mailgun domeinen         is specifieke extra role. hier hoven geen nieuwe permissions aan toegevoegd te worden
        // Beheerder Portal Settings          is specifieke extra role. hier hoven geen nieuwe permissions aan toegevoegd te worden
        // Beheerder coöperatie instellingen  is specifieke extra role. hier hoven geen nieuwe permissions aan toegevoegd te worden
        // Energiemanager                     is nieuwe role
        // Energiecoordinator                 is nieuwe role

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        //make roles inzake menu permissions
        $menuRoles = [
            'Medewerker' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact'],
            'Medewerker 2' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact'],
            'Projectmedewerker' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact'],
            'Financieel medewerker' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact',            ],
            'Financieel controller' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact',            ],
            'Participatie medewerker' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact',            ],
            'Energie adviseur' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact',            ],
            'Marketing medewerker' => ['view_email', 'view_task', 'view_note', 'view_participation', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group', 'view_order', 'view_invoice', 'view_financial_overview_contact',            ],
            'Energiemanager' => ['view_email', 'view_task', 'view_note', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group'],
            'Energiecoordinator' => ['view_email', 'view_task', 'view_note', 'view_intake', 'view_opportunity', 'view_housing_file', 'view_contact_group'],
        ];

        foreach($menuRoles as $menuRoleName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($menuRoleName);
            $role->syncPermissions($permissions);

        }

        //make roles inzake nieuw view permissions
        $newViewRoles = [
            'Medewerker' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings'],
            'Medewerker 2' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings'],
            'Projectmedewerker' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings'],
            'Financieel medewerker' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_financial', 'menu_workflow', 'menu_general_settings'],
            'Financieel controller' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_financial', 'menu_workflow', 'menu_general_settings'],
            'Participatie medewerker' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks','menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings'],
            'Energie adviseur' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings'],
            'Marketing medewerker' => ['menu_contacts', 'menu_projects', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_processes', 'menu_documents', 'menu_general_settings'],
            'Energiemanager' => ['menu_contacts', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks','menu_agenda','menu_documents'],
            'Energiecoordinator' => ['menu_contacts', 'menu_energy_saving', 'menu_contact_groups', 'menu_email', 'menu_marketing', 'menu_tasks', 'menu_agenda', 'menu_documents'],
        ];

        foreach($newViewRoles as $newViewRoleName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($newViewRoleName);
            $role->syncPermissions($permissions);

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
