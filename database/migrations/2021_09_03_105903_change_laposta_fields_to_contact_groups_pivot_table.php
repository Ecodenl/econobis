<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeLapostaFieldsToContactGroupsPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups_pivot', function (Blueprint $table) {
            $table->renameColumn('laposta_member_created_at', 'member_created_at');
            $table->renameColumn('laposta_member_since', 'member_to_group_since');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contact_groups_pivot', function (Blueprint $table) {
            $table->renameColumn('member_created_at', 'laposta_member_created_at');
            $table->renameColumn('member_to_group_since', 'laposta_member_since');
        });
    }
}
