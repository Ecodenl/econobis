<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;

class AddManageCoachPlanningPermissionToEnergieAdviseurs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $energyAdvisor = Role::findByName('Energie adviseur');
        $energyAdvisor->givePermissionTo(['manage_coach_planning']);
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
