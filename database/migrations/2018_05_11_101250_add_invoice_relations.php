<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInvoiceRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedInteger('invoice_id')->nullable()->default(null);
            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('restrict');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('invoice_id')->nullable()->default(null);
            $table->foreign('invoice_id')
                ->references('id')->on('invoices')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropColumn('order_id');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropColumn('order_id');
        });
    }
}
