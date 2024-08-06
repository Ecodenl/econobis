<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//    Aflossing over actuele waarde (waar nu Annuitair staat)
//    Aflossing over initiële inleg (waar nu Linear staat)
        DB::table('project_loan_types')->where('code_ref', 'lineair')->update(["name" => "Aflossing over initiële inleg"]);
        DB::table('project_loan_types')->where('code_ref', 'annuitair')->update(["name" => "Aflossing over actuele waarde"]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('project_loan_types')->where('code_ref', 'lineair')->update(["name" => "Lineair"]);
        DB::table('project_loan_types')->where('code_ref', 'annuitair')->update(["name" => "Annuïtair"]);
    }
};
