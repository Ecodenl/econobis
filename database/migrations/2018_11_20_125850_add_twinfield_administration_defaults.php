<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTwinfieldAdministrationDefaults extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->string('default_invoice_template')->nullable();
            $table->string('btw_code_sales_21')->nullable();
            $table->string('btw_code_sales_6')->nullable();
            $table->string('btw_code_sales_0')->nullable();
            $table->string('btw_code_sales_null')->nullable();
            $table->string('btw_code_purchases_21')->nullable();
            $table->string('btw_code_purchases_6')->nullable();
            $table->string('btw_code_purchases_0')->nullable();
            $table->string('btw_code_purchases_null')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('default_invoice_template');
            $table->dropColumn('btw_code_sales_21');
            $table->dropColumn('btw_code_sales_6');
            $table->dropColumn('btw_code_sales_0');
            $table->dropColumn('btw_code_sales_null');
            $table->dropColumn('btw_code_purchases_21');
            $table->dropColumn('btw_code_purchases_6');
            $table->dropColumn('btw_code_purchases_0');
            $table->dropColumn('btw_code_purchases_null');
        });
    }
}
