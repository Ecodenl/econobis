<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderToProjectStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_status', function (Blueprint $table) {
            $table->integer('order')->nullable()->after('name');
        });
        DB::table('project_status')
            ->where('name', 'Voorbereiding')
            ->update(['order' => 1]);

        DB::table('project_status')
            ->where('name', 'Actief')
            ->update(['order' => 2]);

        DB::table('project_status')
            ->where('name', 'Gerealiseerd')
            ->update(['order' => 3]);

        DB::table('project_status')
            ->where('name', 'Beëindigd')
            ->update(['order' => 4]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}