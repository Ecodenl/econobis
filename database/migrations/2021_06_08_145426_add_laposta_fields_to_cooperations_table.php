<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLapostaFieldsToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->string('laposta_key')->nullable()->after('hoom_group_id');
            $table->boolean('use_laposta')->default(false)->after('hoom_group_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('cooperations', 'use_laposta'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('use_laposta');
            });
        }
        if (Schema::hasColumn('cooperations', 'laposta_key'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('laposta_key');
            });
        }
    }
}
