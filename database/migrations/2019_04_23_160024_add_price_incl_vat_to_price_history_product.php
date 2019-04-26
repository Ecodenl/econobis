<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPriceInclVatToPriceHistoryProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('price_history_product', function (Blueprint $table) {
            $table->boolean('input_incl_vat')->nullable(false)->default(false)->after('date_start');
            $table->double('price_incl_vat')->nullable()->after('price');
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
            $table->dropColumn('input_incl_vat');
            $table->dropColumn('price_incl_vat');
        });
    }
}
