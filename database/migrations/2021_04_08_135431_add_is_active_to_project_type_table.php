<?php

use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsActiveToProjectTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_type', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('code_ref');
        });

        foreach (ProjectType::withTrashed()->get() as $projectType){
            if($projectType->code_ref != 'loan' && $projectType->code_ref != 'obligation' && $projectType->code_ref != 'capital')
            {
                $projectType->is_active = false;
                $projectType->save();
            }

        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('project_type', 'is_active'))
        {
            Schema::table('project_type', function (Blueprint $table)
            {
                $table->dropColumn('is_active');
            });
        }
    }
}
