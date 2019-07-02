<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('default_invoice_template');
            $table->dropColumn('btw_code_sales_21');
            $table->dropColumn('btw_code_sales_6');
            $table->dropColumn('btw_code_sales_0');
            $table->dropColumn('btw_code_sales_null');
            $table->boolean('uses_vat')->nullable(false)->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
