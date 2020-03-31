<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingAddressFieldsToDistributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->string('street_number_addition')->nullable()->after('contact_id');
            $table->integer('street_number')->nullable()->after('contact_id');
            $table->string('street')->nullable()->after('contact_id');
            $table->string('country')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->dropColumn('street');
            $table->dropColumn('street_number');
            $table->dropColumn('street_number_addition');
            $table->dropColumn('country');
        });
    }
}
