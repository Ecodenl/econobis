<?php

use Spatie\Permission\Models\Role;
use Illuminate\Database\Migrations\Migration;

class AddManageMailgunDomainsPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_mailgun_domain',
            'guard_name' => 'api',
        ]);

        $arrayRoles = [
            'Key user' => ['manage_mailgun_domain'],
        ];

        foreach ($arrayRoles as $roleName => $permissions){
            $role = Role::findByName($roleName);

            $role->givePermissionTo($permissions);
        }

        //make roles
        $roles = ['Beheerder Mailgun domeinen' => ['manage_mailgun_domain']];

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
