<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUseExportAddressConsumptionToCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('use_export_address_consumption')->default(false)->after('laposta_key');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('cooperations', 'use_export_address_consumption'))
        {
            Schema::table('cooperations', function (Blueprint $table)
            {
                $table->dropColumn('use_export_address_consumption');
            });
        }
    }
}
