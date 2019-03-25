<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLedgersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Table administration_ledger_twinfield is replaced by table ledger
        // Key fields also change for this table where used.

        Schema::table('administration_ledger_twinfield', function (Blueprint $table) {
            $table->dropForeign( 'administration_ledger_twinfield_administration_id_foreign');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign('products_administration_ledger_twinfield_id_foreign');
            $table->dropColumn('administration_ledger_twinfield_id');
            $table->unsignedInteger('ledger_id')->nullable();
            $table->foreign('ledger_id')
                ->references('id')->on('ledgers')
                ->onDelete('restrict');
        });

        Schema::dropIfExists('administration_ledger_twinfield');

        Schema::create('ledgers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description')->nullable(false)->default('');
            $table->integer('vat_code_id')->unsigned()->nullable()->default(null);
            $table->foreign('vat_code_id')
                ->references('id')->on('vat_codes')
                ->onDelete('restrict');
            $table->string('twinfield_ledger_code')->nullable(false)->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ledgers');
    }
}
