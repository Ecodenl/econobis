<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProjectTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add softdelete to table
        Schema::table('project_type', function (Blueprint $table) {
            $table->softDeletes();
        });

        // Set existing types on delete
        foreach (\App\Eco\Project\ProjectType::all() as $projectType){
            $projectType->deleted_at = Carbon::now();
            $projectType->save();
        }

        // Create new types
        $newProjectTypes = [
            'Lening',
            'Obligatie',
            'Kapitaal',
            'Postcoderoos kapitaal',
        ];

        foreach (
            $newProjectTypes as $projectType
        ) {
            DB::table('project_type')->insert([
                    'name' => $projectType
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}