<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeProjectStatusAddCodeRefAndChangeLabel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Change label 'voorbereiding' to 'concept'
        DB::table('project_status')->where('name', 'voorbereiding')->update(['name' => 'Concept']);

        Schema::table('project_status', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
        });

        DB::table('project_status')
            ->where('name', 'Concept')
            ->update(['code_ref' => 'concept']);

        DB::table('project_status')
            ->where('name', 'Actief')
            ->update(['code_ref' => 'active']);

        DB::table('project_status')
            ->where('name', 'Beëindigd')
            ->update(['code_ref' => 'ended']);

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