<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultForPortalToTaskTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('task_types', function (Blueprint $table) {
            $table->boolean('default_portal_task_type')->default(false)->after('name');
        });

        $taakControleerContactgegevens = \App\Eco\Task\TaskType::where('name', 'Controleer contactgegevens')->first();
        if($taakControleerContactgegevens){
            $taakControleerContactgegevens->default_portal_task_type = true;
            $taakControleerContactgegevens->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('task_types', 'default_portal_task_type'))
        {
            Schema::table('task_types', function (Blueprint $table)
            {
                $table->dropColumn('default_portal_task_type');
            });
        }

    }
}
