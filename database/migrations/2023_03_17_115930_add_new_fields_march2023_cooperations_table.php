<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsMarch2023CooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->string('hoom_connect_coach_link')->nullable()->after('hoom_link');
            $table->integer('hoom_campaign_id')->unsigned()->nullable()->after('hoom_key');;
            $table->foreign('hoom_campaign_id')->references('id')->on('campaigns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('cooperations', 'hoom_connect_coach_link'))
        {
            Schema::table('cooperations', function (Blueprint $table) {
                $table->dropColumn('hoom_connect_coach_link');
            });
        }
        if (Schema::hasColumn('cooperations', 'hoom_campaign_id'))
        {
            Schema::table('cooperations', function (Blueprint $table) {
                $table->dropForeign(['hoom_campaign_id']);
                $table->dropColumn('hoom_campaign_id');
            });
        }
    }
}
