<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterAmountToDoubleOrderProductAndInvoiceProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE order_product MODIFY amount DOUBLE(11,2);');
        DB::statement('ALTER TABLE invoice_product MODIFY amount DOUBLE(11,2);');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
