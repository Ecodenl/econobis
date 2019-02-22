<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCodeRefToProjectType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_type', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
        });

        DB::table('project_type')
            ->where('name', 'Lening')
            ->update(['code_ref' => 'loan']);

        DB::table('project_type')
            ->where('name', 'Obligatie')
            ->update(['code_ref' => 'obligation']);

        DB::table('project_type')
            ->where('name', 'Kapitaal')
            ->update(['code_ref' => 'capital']);

        DB::table('project_type')
            ->where('name', 'Postcoderoos kapitaal')
            ->update(['code_ref' => 'postalcode_link_capital']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public
    function down()
    {
        //
    }
}