<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AddCoachRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create([
                'name' => 'manage_coach_planning',
                'guard_name' => 'api',
            ]
        );

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        $role = Role::findByName('Energiemanager');
        $role->givePermissionTo('manage_coach_planning');
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
