<?php

use App\Eco\Invoice\InvoiceProduct;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPriceInclVatToInvoiceProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //
        Schema::table('invoice_product', function (Blueprint $table) {
            $table->double('price_incl_vat')->nullable()->after('price');
        });

        $invoiceProducts = InvoiceProduct::get();
        foreach ($invoiceProducts as $invoiceProduct){
            $vatPercentage = 0;
            if($invoiceProduct->vat_percentage)
            {
                $vatPercentage = $invoiceProduct->vat_percentage;
            }
            $vatFactor = (100 + number_format($vatPercentage, 2) ) / 100;
            $price = $invoiceProduct->price;
            $priceInclVat = $price * $vatFactor;
            $invoiceProduct->price_incl_vat = number_format($priceInclVat, 2, '.', '');
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
            $table->dropColumn('price_incl_vat');
        });
    }
}
