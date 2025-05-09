<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddDonglePermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Permission::create([
            'name' => 'menu_dongles',
            'guard_name' => 'api',
        ]);

        Permission::create([
            'name' => 'manage_dongles',
            'guard_name' => 'api',
        ]);

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        $energyAdvisor = Role::findByName('Energie adviseur');
        $energyAdvisor->givePermissionTo(['menu_dongles', 'manage_dongles']);

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
