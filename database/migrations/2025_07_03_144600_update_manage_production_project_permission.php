<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;

class UpdateManageProductionProjectPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Voeg toe aan 'Projectmanager'
        $projectmanager = Role::findByName('Projectmanager');
        if ($projectmanager) {
            $projectmanager->givePermissionTo('manage_project');
        }

        // Verwijder van 'Participatie medewerker'
        $participatieMedewerker = Role::findByName('Participatie medewerker');
        if ($participatieMedewerker) {
            $participatieMedewerker->revokePermissionTo('manage_project');
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Verwijder van 'Projectmanager'
        $projectmanager = Role::findByName('Projectmanager');
        if ($projectmanager) {
            $projectmanager->revokePermissionTo('manage_project');
        }

        // Voeg terug toe aan 'Participatie medewerker'
        $participatieMedewerker = Role::findByName('Participatie medewerker');
        if ($participatieMedewerker) {
            $participatieMedewerker->givePermissionTo('manage_project');
        }
    }
}
