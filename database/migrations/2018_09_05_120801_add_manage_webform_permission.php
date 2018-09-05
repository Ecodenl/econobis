<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AddManageWebformPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_webform',
            'guard_name' => 'api',
        ]);

        $arrayRoles = [
            'Key user' => ['manage_webform'],
        ];

         foreach ($arrayRoles as $roleName => $permissions){
             $role = Role::findByName($roleName);

             $role->givePermissionTo($permissions);
         }

        //make roles
        $roles = ['Beheerder webformulier' => ['manage_webform']];

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
