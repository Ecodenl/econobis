<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddSourcePermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Permission::create([
            'name' => 'menu_intake_sources',
            'guard_name' => 'api',
        ]);

        Permission::create([
            'name' => 'manage_intake_sources',
            'guard_name' => 'api',
        ]);

        $superuserRole = Role::findByName('Beheerder');
        $superuserRole->syncPermissions(Permission::all());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
