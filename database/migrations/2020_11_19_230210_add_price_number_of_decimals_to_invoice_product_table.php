<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPriceNumberOfDecimalsToInvoiceProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoice_product', function (Blueprint $table) {
            $table->tinyInteger('price_number_of_decimals')->default(2)->after('percentage_reduction');
        });
        $invoiceProducts = \App\Eco\Invoice\InvoiceProduct::all();
        foreach ($invoiceProducts as $invoiceProduct){
            $decimals = strlen(substr(strrchr($invoiceProduct->price_incl_vat, "."), 1));
            if($decimals<2){
                $decimals = 2;
            }
            if($decimals>6){
                $decimals = 6;
            }
            $invoiceProduct->price_number_of_decimals = $decimals;
            $invoiceProduct->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoice_product', function (Blueprint $table) {
            $table->dropColumn('price_number_of_decimals');
        });
    }
}
