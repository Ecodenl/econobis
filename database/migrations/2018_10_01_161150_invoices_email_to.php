<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InvoicesEmailTo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('emailed_to')->nullable();
            $table->string('email_reminder_1')->nullable();
            $table->string('email_reminder_2')->nullable();
            $table->string('email_reminder_3')->nullable();
            $table->string('email_exhortation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('emailed_to');
            $table->dropColumn('email_reminder_1');
            $table->dropColumn('email_reminder_2');
            $table->dropColumn('email_reminder_3');
            $table->dropColumn('email_exhortation');
        });
    }

}
