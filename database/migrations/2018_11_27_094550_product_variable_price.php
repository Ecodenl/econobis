<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProductVariablePrice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_product', function (Blueprint $table) {
            $table->double('variable_price')->nullable();
        });

        Schema::table('price_history_product', function (Blueprint $table) {
            $table->boolean('has_variable_price')->default(0);
            $table->float('price')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_product', function (Blueprint $table) {
            $table->dropColumn('variable_price');
        });

        Schema::table('price_history_product', function (Blueprint $table) {
            $table->dropColumn('has_variable_price');
            $table->float('price')->nullable(false)->change();
        });
    }
}
