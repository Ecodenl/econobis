<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddManageCleanupExceptionProductsPermissionToDataCleanerRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //create the permission
        Permission::create([
                'name' => 'manage_cleanup_exception_products',
                'guard_name' => 'api',
            ]
        );

        //link the new permission to the Beheerder role
        $superuserRole = Role::findByName('Beheerder');
        $superuserRole->syncPermissions(Permission::all());


        //link the new role to the Data opschoner
        $role = Role::findByName('Data opschoner');
        $role->givePermissionTo(['manage_cleanup_exception_products']);
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
