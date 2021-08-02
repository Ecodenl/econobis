<?php

use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;

class SetPcrTypeActiveInProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $projectType = ProjectType::where('code_ref', 'postalcode_link_capital')->first();
        $projectType->is_active = true;
        $projectType->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $projectType = ProjectType::where('code_ref', 'postalcode_link_capital')->first();
        $projectType->is_active = false;
        $projectType->save();
    }
}
