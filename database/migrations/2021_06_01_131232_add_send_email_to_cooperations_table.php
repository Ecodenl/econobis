<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSendEmailToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('send_email')->default(true)->after('hoom_key');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('cooperations', 'send_email'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('send_email');
            });
        }
    }
}
