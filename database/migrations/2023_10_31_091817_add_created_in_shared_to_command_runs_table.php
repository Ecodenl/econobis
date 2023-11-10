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
        Schema::table('command_runs', function (Blueprint $table) {
            $table->boolean('created_in_shared');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('command_runs', 'created_in_shared'))
        {
            Schema::table('command_runs', function (Blueprint $table)
            {
                $table->dropColumn('created_in_shared');
            });
        }
    }
};
