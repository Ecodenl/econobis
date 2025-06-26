<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExcludedGroupIdsToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->string('cleanup_excluded_group_ids')->after('cleanup_years_contact_date_last_run_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropColumn('cleanup_excluded_group_ids');
        });
    }
}
