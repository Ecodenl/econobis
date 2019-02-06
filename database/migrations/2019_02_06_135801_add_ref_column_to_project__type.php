<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRefColumnToProjectType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_type', function (Blueprint $table) {
            $table->string('code_ref')->nullable()->after('name');
        });

        $projectTypeLoan = \App\Eco\Project\ProjectType::where('name', 'Lening')->first();
        $projectTypeLoan->code_ref = 'loan';
        $projectTypeLoan->save();

        $projectTypeObligation = \App\Eco\Project\ProjectType::where('name', 'Obligatie')->first();
        $projectTypeObligation->code_ref = 'obligation';
        $projectTypeObligation->save();

        $projectTypeCapital = \App\Eco\Project\ProjectType::where('name', 'Kapitaal')->first();
        $projectTypeCapital->code_ref = 'capital';
        $projectTypeCapital->save();

        $projectTypePostal = \App\Eco\Project\ProjectType::where('name', 'Postcoderoos kapitaal')->first();
        $projectTypePostal->code_ref = 'postalcode_area_capital';
        $projectTypePostal->save();
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