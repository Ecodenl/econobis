<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrderRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->unsignedInteger('order_id')->nullable()->default(null);
            $table->foreign('order_id')
                ->references('id')->on('orders')
                ->onDelete('restrict');
        });

        Schema::table('documents', function (Blueprint $table) {
            $table->unsignedInteger('order_id')->nullable()->default(null);
            $table->foreign('order_id')
                ->references('id')->on('orders')
                ->onDelete('restrict');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->unsignedInteger('order_id')->nullable()->default(null);
            $table->foreign('order_id')
                ->references('id')->on('orders')
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

        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropColumn('order_id');
        });

        Schema::table('emails', function (Blueprint $table) {
            $table->dropForeign(['order_id']);
            $table->dropColumn('order_id');
        });
    }
}
