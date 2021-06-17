<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLapostaListIdToContactGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('laposta_list_id')->nullable();
            $table->dateTime('laposta_list_created_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contact_groups', 'laposta_list_created_at'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropColumn('laposta_list_created_at');
            });
        }
        if (Schema::hasColumn('contact_groups', 'laposta_list_id'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropColumn('laposta_list_id');
            });
        }
    }
}
