<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTwinfieldMatchNumberToInvoicePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('invoice_payment', function (Blueprint $table) {
            $table->string('twinfield_match_number')->nullable();
        });
        DB::table('invoice_payment')->whereNotNull('twinfield_number')->update(["twinfield_match_number" => 1]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('invoice_payment', function (Blueprint $table) {
            $table->dropColumn('twinfield_match_number');
        });
    }
}
