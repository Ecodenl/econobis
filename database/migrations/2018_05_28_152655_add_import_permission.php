<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AddImportPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'import',
            'guard_name' => 'api',
        ]);

        $arrayRoles = [
            'Key user' => ['import'],
        ];

         foreach ($arrayRoles as $roleName => $permissions){
             $role = Role::findByName($roleName);

             $role->givePermissionTo($permissions);
         }
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
