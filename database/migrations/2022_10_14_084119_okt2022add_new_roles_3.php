<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class Okt2022addNewRoles3 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $permissions = [
            'update_contact_group_members',
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

        //make roles inzake contact details
        $newContactRolePermissions = [
            'Energiemanager' => [
                'menu_contact_groups', 'view_contact_group', 'update_contact_group_members',
            ],
            'Energiecoordinator' => [
                'menu_contact_groups', 'view_contact_group', 'update_contact_group_members',
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
