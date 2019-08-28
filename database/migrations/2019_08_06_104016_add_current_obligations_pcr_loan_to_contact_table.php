<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCurrentObligationsPcrLoanToContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->integer('obligations_current')->default(0)->after('iban_attn');
            $table->integer('loan_current')->default(0)->after('participations_current');
            $table->integer('postalcode_link_capital_current')->default(0)->after('participations_current');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('contacts', function (Blueprint $table) {
//            $table->dropColumn('obligations_current');
//            $table->dropColumn('postalcode_link_capital_current');
//            $table->dropColumn('loan_current');
//        });
    }
}
