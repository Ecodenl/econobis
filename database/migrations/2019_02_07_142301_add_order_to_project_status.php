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

        $ProjectStatus = \App\Eco\Project\ProjectStatus::where('name', 'Voorbereiding')->first();
        $ProjectStatus->order = 1;
        $ProjectStatus->save();

        $ProjectStatus = \App\Eco\Project\ProjectStatus::where('name', 'Actief')->first();
        $ProjectStatus->order = 2;
        $ProjectStatus->save();

        $ProjectStatus = \App\Eco\Project\ProjectStatus::where('name', 'Gerealiseerd')->first();
        $ProjectStatus->order = 3;
        $ProjectStatus->save();

        $ProjectStatus = \App\Eco\Project\ProjectStatus::where('name', 'Beëindigd')->first();
        $ProjectStatus->order = 4;
        $ProjectStatus->save();

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