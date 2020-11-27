<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceNumberOfDecimalsToPriceHistoryProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('price_history_product', function (Blueprint $table) {
            $table->tinyInteger('price_number_of_decimals')->default(2)->after('input_incl_vat');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('price_history_product', function (Blueprint $table) {
            $table->dropColumn('price_number_of_decimals');
        });
    }
}
