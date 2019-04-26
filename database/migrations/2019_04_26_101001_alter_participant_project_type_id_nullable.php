<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterParticipantProjectTypeIdNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participation_project', function (Blueprint $table) {
            try{
                $table->dropForeign('participation_production_project_type_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
            $table->integer('type_id')->nullable()->default(null)->change();
            $table->foreign('type_id')
                ->references('id')->on('participant_project_payout_type')
                ->onDelete('restrict');
        });
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