<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterParticipantProjectRemoveUnneededFields extends Migration
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
                $table->dropForeign('participation_production_project_status_id_foreign');
//                $table->dropForeign('participation_project_status_id_foreign');
            }catch (\Exception $e){
                // Voor het geval de foreign key niet bestaat
            }
        });

        Schema::table('participation_project', function (Blueprint $table) {
            $table->dropColumn('status_id');
            $table->dropColumn('date_register');
            $table->dropColumn('date_contract_send');
            $table->dropColumn('date_contract_retour');
            $table->dropColumn('date_payed');
            $table->dropColumn('date_end');
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