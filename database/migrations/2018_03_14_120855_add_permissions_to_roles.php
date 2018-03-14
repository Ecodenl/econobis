<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AddPermissionsToRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $arrayRoles = [
            'Medewerker' => ['view_team'],
            'Medewerker 2' => ['view_team'],
            'Projectmedewerker' => ['view_team'],
            'Financieel medewerker' => ['view_team', 'manage_participation', 'manage_financial'],
            'Financieel controller' => ['view_team', 'create_team', 'manage_participation', 'manage_production_project', 'manage_financial'],
            'Participatie medewerker' => ['view_team', 'manage_participation', 'manage_production_project'],
            'Energie adviseur' => ['view_team'],
            'Marketing medewerker' => ['view_team'],
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
