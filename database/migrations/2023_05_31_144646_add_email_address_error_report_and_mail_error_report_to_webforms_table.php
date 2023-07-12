<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEmailAddressErrorReportAndMailErrorReportToWebformsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('webforms', function (Blueprint $table) {
            $table->string('email_address_error_report')->after('api_key')->nullable();
            $table->boolean('mail_error_report')->after('email_address_error_report')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('webforms', function (Blueprint $table) {
            $table->dropColumn('email_address_error_report');
            $table->dropColumn('mail_error_report');
        });
    }
}
