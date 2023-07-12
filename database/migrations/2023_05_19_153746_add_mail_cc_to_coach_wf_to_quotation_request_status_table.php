<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMailCcToCoachWfToQuotationRequestStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->boolean('mail_cc_to_coach_wf')->after('email_template_id_wf')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->dropColumn('mail_cc_to_coach_wf');
        });
    }
}
