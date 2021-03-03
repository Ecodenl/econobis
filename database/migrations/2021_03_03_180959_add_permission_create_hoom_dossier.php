<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddPermissionCreateHoomDossier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create([
            'name' => 'create_hoom_dossier',
            'guard_name' => 'api',
        ]);

        $roleKeyUser = Role::where('name', 'Key user')->first();
        $roleKeyUser->givePermissionTo(['create_hoom_dossier']);

        $roleEnergieAdviseur = Role::where('name', 'Energie adviseur')->first();
        $roleEnergieAdviseur->givePermissionTo(['create_hoom_dossier']);
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
