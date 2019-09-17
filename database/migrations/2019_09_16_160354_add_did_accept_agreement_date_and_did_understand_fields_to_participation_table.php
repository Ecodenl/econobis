<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDidAcceptAgreementDateAndDidUnderstandFieldsToParticipationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('participation_project', function (Blueprint $table) {
            $table->date('date_did_understand_info')->nullable()->default(null)->after('did_accept_agreement');
            $table->boolean('did_understand_info')->nullable()->default(null)->after('did_accept_agreement');
            $table->date('date_did_accept_agreement')->nullable()->default(null)->after('did_accept_agreement');
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
//        Schema::table('participation_project', function (Blueprint $table) {
//            $table->dropColumn('did_understand_info');
//            $table->dropColumn('date_did_understand_info');
//            $table->dropColumn('date_did_accept_agreement');
//        });
    }
}
