<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->string('iban')->default('');
            $table->boolean('liable')->default(false);
            $table->float('liability_amount')->default(0);

            $table->integer('owner_id')->unsigned()->nullable()->default(null);
            $table->foreign('owner_id')->references('id')->on('users') ->onDelete('restrict');

            $table->unsignedInteger('created_by_id')->nullable()->default(null);
            $table->unsignedInteger('updated_by_id')->nullable()->default(null);
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->foreign('updated_by_id')
                ->references('id')->on('users')
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
        Schema::table('contacts', function (Blueprint $table) {
//            $table->dropColumn('iban');
//            $table->dropColumn('liable');
//            $table->dropColumn('liability_amount');
//            $table->dropColumn('owner_id');
//            $table->dropColumn('created_by_id');
//            $table->dropColumn('updated_by_id');
        });
    }
}
