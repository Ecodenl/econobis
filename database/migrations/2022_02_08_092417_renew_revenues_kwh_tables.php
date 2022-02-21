<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenewRevenuesKwhTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('xxx_project_revenues'))
        {
            DB::statement('CREATE TABLE xxx_project_revenues LIKE project_revenues;');
        }

        if (!Schema::hasTable('xxx_conversion_revenues_kwh'))
        Schema::create('xxx_conversion_revenues_kwh', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('new_revenue_id');
            $table->unsignedInteger('old_revenue_id');
            $table->boolean('old_confirmed')->default(false);
            $table->boolean('hasSplitKwh')->default(false);
            $table->unsignedInteger('participation_id')->nullable()->default(null);
            $table->unsignedInteger('belongs_to_project_revenue_id')->nullable();
            $table->text('remarks');
            $table->timestamps();
        });

        if (!Schema::hasTable('old_project_revenues'))
        {
            DB::statement('CREATE TABLE old_project_revenues LIKE project_revenues;');
            DB::statement('INSERT old_project_revenues SELECT * FROM project_revenues;');
        }
        if (!Schema::hasTable('old_project_revenue_distribution'))
        {
            DB::statement('CREATE TABLE old_project_revenue_distribution LIKE project_revenue_distribution;');
            DB::statement('INSERT old_project_revenue_distribution SELECT * FROM project_revenue_distribution;');
        }
        if (!Schema::hasTable('old_project_revenue_delivered_kwh_period'))
        {
            DB::statement('CREATE TABLE old_project_revenue_delivered_kwh_period LIKE project_revenue_delivered_kwh_period;');
            DB::statement('INSERT old_project_revenue_delivered_kwh_period SELECT * FROM project_revenue_delivered_kwh_period;');
        }
        if (!Schema::hasTable('revenues_kwh'))
        {
            Schema::create('revenues_kwh', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('category_id');
                $table->foreign('category_id')
                    ->references('id')->on('project_revenue_category')
                    ->onDelete('restrict');
                $table->unsignedInteger('project_id');
                $table->foreign('project_id')
                    ->references('id')->on('projects')
                    ->onDelete('restrict');
                $table->string('distribution_type_id')->nullable();
                $table->boolean('confirmed')->default(false);
                $table->string('status')->nullable();
                $table->date('date_begin')->nullable();
                $table->date('date_end')->nullable();
                $table->date('date_confirmed')->nullable();
                $table->double('payout_kwh')->nullable();
                $table->double('delivered_total_concept', 12, 6)->nullable();
                $table->double('delivered_total_confirmed', 12, 6)->nullable();
                $table->double('delivered_total_processed', 12, 6)->nullable();

                $table->integer('created_by_id')->unsigned();
                $table->foreign('created_by_id')->references('id')->on('users');
                $table->timestamps();
            });
        }
        if (!Schema::hasTable('revenue_parts_kwh'))
        {
            Schema::create('revenue_parts_kwh', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('revenue_id');
                $table->foreign('revenue_id')
                    ->references('id')->on('revenues_kwh')
                    ->onDelete('restrict');
                $table->date('date_begin')->nullable();
                $table->date('date_end')->nullable();
                $table->boolean('confirmed')->default(false);
                $table->date('date_confirmed')->nullable();
                $table->string('status')->nullable();
                $table->double('payout_kwh')->nullable();
                $table->double('delivered_total_concept', 12, 6)->nullable();
                $table->double('delivered_total_confirmed', 12, 6)->nullable();
                $table->double('delivered_total_processed', 12, 6)->nullable();

                $table->timestamps();
            });
        }
        if (!Schema::hasTable('revenue_distribution_kwh'))
        {
            Schema::create('revenue_distribution_kwh', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('revenue_id');
                $table->foreign('revenue_id')
                    ->references('id')->on('revenues_kwh')
                    ->onDelete('restrict');
                $table->unsignedInteger('participation_id')->nullable()->default(null);
                $table->foreign('participation_id')
                    ->references('id')->on('participation_project')
                    ->onDelete('restrict');
                $table->unsignedInteger('contact_id');
                $table->foreign('contact_id')
                    ->references('id')->on('contacts')
                    ->onDelete('restrict');
                $table->string('status')->nullable();
                $table->integer('participations_quantity')->nullable();
                $table->double('delivered_total_concept', 12, 6)->nullable();
                $table->double('delivered_total_confirmed', 12, 6)->nullable();
                $table->double('delivered_total_processed', 12, 6)->nullable();
                $table->string('street')->nullable();
                $table->integer('street_number')->nullable();
                $table->string('street_number_addition')->nullable();
                $table->string('address')->nullable();
                $table->string('postal_code')->nullable();
                $table->string('city')->nullable();
                $table->string('country')->nullable();
                $table->string('energy_supplier_ean_electricity')->nullable();

                $table->timestamps();
            });
        }
        if (!Schema::hasTable('revenue_values_kwh'))
        {
            Schema::create('revenue_values_kwh', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('revenue_id');
                $table->foreign('revenue_id')
                    ->references('id')->on('revenues_kwh')
                    ->onDelete('restrict');
                $table->date('date_registration')->nullable();
                $table->boolean('is_simulated')->default(false);
                $table->double('kwh_start', 12, 6)->nullable();
                $table->double('kwh_end', 12, 6)->nullable();
                $table->double('kwh_start_high', 12, 6)->nullable();
                $table->double('kwh_end_high', 12, 6)->nullable();
                $table->double('kwh_start_low', 12, 6)->nullable();
                $table->double('kwh_end_low', 12, 6)->nullable();
                $table->string('status')->nullable();
                $table->double('delivered_kwh', 12, 6)->nullable();

                $table->timestamps();
            });
        }
        if (!Schema::hasTable('revenue_distribution_values_kwh'))
        {
            Schema::create('revenue_distribution_values_kwh', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('revenue_values_id');
                $table->unsignedInteger('distribution_id');
                $table->foreign('distribution_id')
                    ->references('id')->on('revenue_distribution_kwh')
                    ->onDelete('restrict');
                $table->unsignedInteger('revenue_id');
                $table->foreign('revenue_id')
                    ->references('id')->on('revenues_kwh')
                    ->onDelete('restrict');
                $table->unsignedInteger('parts_id');
                $table->foreign('parts_id')
                    ->references('id')->on('revenue_parts_kwh')
                    ->onDelete('restrict');
                $table->string('status')->nullable();
                $table->integer('participations_quantity')->nullable();
                $table->double('delivered_kwh', 12, 6)->nullable();

                $table->timestamps();
            });
        }
        if (!Schema::hasTable('revenue_distribution_parts_kwh'))
        {
            Schema::create('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->increments('id');

                $table->unsignedInteger('parts_id');
                $table->foreign('parts_id')
                    ->references('id')->on('revenue_parts_kwh')
                    ->onDelete('restrict');
                $table->unsignedInteger('distribution_id');
                $table->foreign('distribution_id')
                    ->references('id')->on('revenue_distribution_kwh')
                    ->onDelete('restrict');
                $table->unsignedInteger('revenue_id');
                $table->foreign('revenue_id')
                    ->references('id')->on('revenues_kwh')
                    ->onDelete('restrict');
                $table->string('status')->nullable();
                $table->integer('participations_quantity')->nullable();
                $table->double('delivered_kwh', 12, 6)->nullable();
                $table->unsignedInteger('es_id')->nullable();
                $table->foreign('es_id')
                    ->references('id')->on('energy_suppliers')
                    ->onDelete('restrict');
                $table->string('energy_supplier_name')->nullable();
                $table->string('energy_supplier_number')->nullable();

                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('revenue_distribution_parts_kwh')) {
            Schema::table('revenue_distribution_parts_kwh', function (Blueprint $table) {
                $table->dropForeign(['parts_id']);
                $table->dropForeign(['distribution_id']);
                $table->dropForeign(['revenue_id']);
                $table->dropForeign(['es_id']);
            });
            Schema::dropIfExists('revenue_distribution_parts_kwh');
        }
        if (Schema::hasTable('revenue_distribution_values_kwh')) {
            Schema::table('revenue_distribution_values_kwh', function (Blueprint $table) {
                $table->dropForeign(['distribution_id']);
                $table->dropForeign(['revenue_id']);
            });
            Schema::dropIfExists('revenue_distribution_values_kwh');
        }
        if (Schema::hasTable('revenue_values_kwh')) {
            Schema::table('revenue_values_kwh', function (Blueprint $table) {
                $table->dropForeign(['revenue_id']);
            });
            Schema::dropIfExists('revenue_values_kwh');
        }
        if (Schema::hasTable('revenue_distribution_kwh')) {
            Schema::table('revenue_distribution_kwh', function (Blueprint $table) {
                $table->dropForeign(['revenue_id']);
                $table->dropForeign(['participation_id']);
                $table->dropForeign(['contact_id']);
            });
            Schema::dropIfExists('revenue_distribution_kwh');
        }
        if (Schema::hasTable('revenue_parts_kwh')) {
            Schema::table('revenue_parts_kwh', function (Blueprint $table) {
                $table->dropForeign(['revenue_id']);
            });
            Schema::dropIfExists('revenue_parts_kwh');
        }
        if (Schema::hasTable('revenues_kwh')) {
            Schema::table('revenues_kwh', function (Blueprint $table) {
                $table->dropForeign(['category_id']);
                $table->dropForeign(['project_id']);
            });
            Schema::dropIfExists('revenues_kwh');
        }

//        Schema::dropIfExists('old_project_revenue_delivered_kwh_period');
//        Schema::dropIfExists('old_project_revenue_distribution');
//        Schema::dropIfExists('old_project_revenues');
        Schema::dropIfExists('xxx_conversion_revenues_kwh');
        Schema::dropIfExists('xxx_project_revenues');
    }
}
