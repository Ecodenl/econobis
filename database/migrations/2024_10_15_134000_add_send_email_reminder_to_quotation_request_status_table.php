<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSendEmailReminderToQuotationRequestStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->boolean('send_email_reminder')->default(0)->after('number_of_days_to_send_email');
            $table->unsignedInteger('email_template_id_reminder')->nullable()->after('send_email_reminder');
            $table->foreign('email_template_id_reminder')
                ->references('id')->on('email_templates')
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
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->dropColumn('send_email_reminder');
            $table->dropForeign(['email_template_id_reminder']);
            $table->dropColumn('email_template_id_reminder');
        });
    }
}
