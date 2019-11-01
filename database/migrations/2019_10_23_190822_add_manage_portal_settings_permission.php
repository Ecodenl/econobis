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
//        try{
//            Permission::findByName('manage_portal_settings');
//        }catch(\Spatie\Permission\Exceptions\PermissionDoesNotExist $e)
//        {
            Permission::create([
                'name' => 'manage_portal_settings',
                'guard_name' => 'api',
            ]);
//        }

        //make roles
        $roles = ['Beheerder portal instellingen' => ['manage_portal_settings']];

        foreach($roles as $role => $permissions) {

//            try{
//                Role::findByName('Beheerder portal instellingen');
//            }catch(\Spatie\Permission\Exceptions\RoleDoesNotExist $e)
//            {
                $role = Role::create([
                    'name' => $role,
                    'guard_name' => 'api',
                ]);
                $role->syncPermissions($permissions);
//            }
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
