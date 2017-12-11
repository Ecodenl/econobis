<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $permissions = [
            'create_person',
            'view_person',
            'update_person',
            'delete_person',
            'create_organisation',
            'view_organisation',
            'update_organisation',
            'delete_organisation',
            'update_contact_iban',
            'update_contact_owner',
            'manage_group',
        ];

        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole = \Spatie\Permission\Models\Role::create([
            'name' => 'superuser',
            'guard_name' => 'api',
        ]);

        $superuserRole->syncPermissions(\Spatie\Permission\Models\Permission::all());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('permissions', function (Blueprint $table) {
            //
        });
    }
}
