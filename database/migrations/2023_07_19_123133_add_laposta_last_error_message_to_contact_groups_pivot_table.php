<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLapostaLastErrorMessageToContactGroupsPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups_pivot', function (Blueprint $table) {
            $table->string('laposta_last_error_message')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contact_groups_pivot', 'laposta_last_error_message'))
        {
            Schema::table('contact_groups_pivot', function (Blueprint $table)
            {
                $table->dropColumn('laposta_last_error_message');
            });
        }
    }
}
