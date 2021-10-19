<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFieldsOpportunityEvaluation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opportunity_evaluation_status', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->string('name');
        });

        DB::table('opportunity_evaluation_status')->insert(
            [
                ['id' => 0, 'name' => 'Nee'],
                ['id' => 1, 'name' => 'Ja'],
                ['id' => 9, 'name' => 'Onbekend'],
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opportunity_evaluation_status');

    }
}
