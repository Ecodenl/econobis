<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDefaultExcelTemplateEnergySuppliers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('energy_suppliers', function (Blueprint $table) {
            $table->smallInteger('excel_template_id')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('energy_suppliers', 'excel_template_id'))
        {
            Schema::table('energy_suppliers', function (Blueprint $table)
            {
                $table->dropColumn('excel_template_id');
            });
        }
    }
}
