<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddManagePortalSettingsPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
 //
//        Permission::findByName('manage_portal_settings')->delete();

        if( !Permission::findByName('manage_portal_settings') )
        {
            Permission::create([
                'name' => 'manage_portal_settings',
                'guard_name' => 'api',
            ]);
        }

//        $arrayRoles = [
//            'Key user' => ['manage_portal_settings'],
//        ];
//        foreach ($arrayRoles as $roleName => $permissions){
//            $role = Role::findByName($roleName);
//
//            $role->givePermissionTo($permissions);
//        }

        //make roles
        $roles = ['Beheerder portal instellingen' => ['manage_portal_settings']];

        foreach($roles as $role => $permissions) {

            if( !Role::findByName('Beheerder portal instellingen') ) {
                $role = Role::create([
                    'name' => $role,
                    'guard_name' => 'api',
                ]);
                $role->syncPermissions($permissions);
            }
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
