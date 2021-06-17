<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLapostaFieldsToContactGroupsPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups_pivot', function (Blueprint $table) {
            $table->string('laposta_member_id')->nullable();
            $table->dateTime('laposta_member_created_at')->nullable();
            $table->date('laposta_member_since')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contact_groups_pivot', 'laposta_member_since'))
        {
            Schema::table('contact_groups_pivot', function (Blueprint $table)
            {
                $table->dropColumn('laposta_member_since');
            });
        }
        if (Schema::hasColumn('contact_groups_pivot', 'laposta_member_created_at'))
        {
            Schema::table('contact_groups_pivot', function (Blueprint $table)
            {
                $table->dropColumn('laposta_member_created_at');
            });
        }
        if (Schema::hasColumn('contact_groups_pivot', 'laposta_member_id'))
        {
            Schema::table('contact_groups_pivot', function (Blueprint $table)
            {
                $table->dropColumn('laposta_member_id');
            });
        }
    }
}
