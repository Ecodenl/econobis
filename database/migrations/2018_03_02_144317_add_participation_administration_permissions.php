<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddParticipationAdministrationPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_participation',
            'guard_name' => 'api',
        ]);

        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_production_project',
            'guard_name' => 'api',
        ]);

        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_financial',
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
