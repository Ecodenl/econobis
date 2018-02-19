<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddTeamPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'view_team',
            'guard_name' => 'api',
        ]);

        \Spatie\Permission\Models\Permission::create([
            'name' => 'create_team',
            'guard_name' => 'api',
        ]);


        $superuserRole = Role::findByName('Key user');
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
