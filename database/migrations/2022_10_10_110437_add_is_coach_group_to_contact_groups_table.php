<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsCoachGroupToContactGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->boolean('is_coach_group')->default(false)->after('simulated_group_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('contact_groups', 'is_coach_group'))
        {
            Schema::table('contact_groups', function (Blueprint $table)
            {
                $table->dropColumn('is_coach_group');
            });
        }
    }
}
