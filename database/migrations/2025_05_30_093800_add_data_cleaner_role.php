<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddDataCleanerRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //create the permission
        \Spatie\Permission\Models\Permission::create([
                'name' => 'menu_data_cleanup',
                'guard_name' => 'api',
            ]
        );

        //link the new permission to the Beheerder role
        $superuserRole = Role::findByName('Beheerder');
        $superuserRole->syncPermissions(Permission::all());

        //create the new role
        $role =  \Spatie\Permission\Models\Role::create([
            'name' => 'Data opschoner',
            'guard_name' => 'api',
        ]);

        //link the new role to the new permissions
        $role = \Spatie\Permission\Models\Role::findByName('Data opschoner');
        $role->givePermissionTo(['menu_data_cleanup']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $permission = \Spatie\Permission\Models\Permission::where([
                'name' => 'data_cleaner'
            ]
        )->first();
        $permission->delete();

        $role = \Spatie\Permission\Models\Role::where([
                'name' => 'Data opschoner'
            ]
        )->first();
        $role->delete();

        $superuserRole = Role::findByName('Beheerder');
        $superuserRole->syncPermissions(Permission::all());
    }
}
