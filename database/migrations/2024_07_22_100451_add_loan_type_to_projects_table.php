<?php

use App\Eco\Project\ProjectType;
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
        Schema::create('project_loan_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('code_ref');
        });
        DB::table('project_loan_types')->insert([
                ['name' => 'Lineair', 'code_ref' => 'lineair'],
                ['name' => 'Annuïtair', 'code_ref' => 'annuitair'],
            ]
        );

        Schema::table('projects', function (Blueprint $table) {
            $table->unsignedInteger('loan_type_id')->after('is_participation_transferable')->nullable();
            $table->foreign('loan_type_id')
                ->references('id')->on('project_loan_types')
                ->onDelete('restrict');
        });

        DB::table('projects')->where('project_type_id', ProjectType::where('code_ref', 'loan')->first()->id)->update(["loan_type_id" => 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign(['loan_type_id']);
            $table->dropColumn('loan_type_id');
        });

        Schema::dropIfExists('project_loan_types');
    }
};
