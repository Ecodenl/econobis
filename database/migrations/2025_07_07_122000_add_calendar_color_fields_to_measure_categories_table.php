<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('measure_categories', function (Blueprint $table) {
            $table->string('calendar_background_color', 7)->default('#265985')->after('email_template_id_wf_create_quotation_request');
            $table->string('calendar_text_color', 7)->default('#ffffff')->after('calendar_background_color');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('measure_categories', function (Blueprint $table) {
            $table->dropColumn('calendar_background_color');
            $table->dropColumn('calendar_text_color');
        });
    }
};
