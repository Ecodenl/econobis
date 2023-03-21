<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsMarch2023ToOpportunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('opportunities', function (Blueprint $table) {
            $table->integer('housing_file_specification_id')->nullable()->unsigned()->after('status_id');
            $table->foreign('housing_file_specification_id')->references('id')->on('housing_file_specifications') ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('opportunities', 'housing_file_specification_id'))
        {
            Schema::table('opportunities', function (Blueprint $table)
            {
                $table->dropForeign(['housing_file_specification_id']);
                $table->dropColumn('housing_file_specification_id');
            });
        }
    }
}
