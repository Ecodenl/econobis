<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToEnergySuppliers extends Migration
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
            $table->string('abbreviation',3);
            $table->smallInteger('file_format_id')->nullable()->default(null);
            $table->integer('order')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('energy_suppliers', 'order'))
        {
            Schema::table('energy_suppliers', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
        if (Schema::hasColumn('energy_suppliers', 'file_format_id'))
        {
            Schema::table('energy_suppliers', function (Blueprint $table)
            {
                $table->dropColumn('file_format_id');
            });
        }
        if (Schema::hasColumn('energy_suppliers', 'abbreviation'))
        {
            Schema::table('energy_suppliers', function (Blueprint $table)
            {
                $table->dropColumn('abbreviation');
            });
        }
        if (Schema::hasColumn('energy_suppliers', 'excel_template_id'))
        {
            Schema::table('energy_suppliers', function (Blueprint $table)
            {
                $table->dropColumn('excel_template_id');
            });
        }
    }
}
