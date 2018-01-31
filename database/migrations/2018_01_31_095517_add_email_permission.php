<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddEmailPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'view_mailbox',
            'guard_name' => 'api',
        ]);

        \Spatie\Permission\Models\Permission::create([
            'name' => 'create_mailbox',
            'guard_name' => 'api',
        ]);


        $superuserRole = Role::findByName('superuser');
        $superuserRole->syncPermissions(Permission::all());
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
