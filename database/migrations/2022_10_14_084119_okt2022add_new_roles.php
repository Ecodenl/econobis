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
        ];

        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        //make roles
        $roles = [
            'Energiemanager' => ['view_person', 'view_document'],
            'Energiecoordinator' => ['view_person', 'view_document'],
        ];

        foreach($roles as $role => $permissions) {
            $role =  \Spatie\Permission\Models\Role::create([
                'name' => $role,
                'guard_name' => 'api',
            ]);
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
