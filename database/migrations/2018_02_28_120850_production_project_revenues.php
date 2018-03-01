<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductionProjectRevenues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('production_project_revenue_type', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $production_project_revenue_types = [
            'Rente',
            'Dividend',
            'Productie',
        ];

        foreach (
            $production_project_revenue_types as $production_project_revenue_type
        ) {
            DB::table('production_project_revenue_type')->insert([
                    'name' => $production_project_revenue_type
                ]
            );
        }

        Schema::create('production_project_revenue_category', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $production_project_revenue_categories = [
            'Uitkering',
            'Opbrengst',
        ];

        foreach (
            $production_project_revenue_categories as $production_project_revenue_category
        ) {
            DB::table('production_project_revenue_category')->insert([
                    'name' => $production_project_revenue_category
                ]
            );
        }

        Schema::create('production_project_revenues', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('category_id');
            $table->foreign('category_id')
                ->references('id')->on('production_project_revenue_category')
                ->onDelete('restrict');

            $table->unsignedInteger('production_project_id');
            $table->foreign('production_project_id')
                ->references('id')->on('production_projects')
                ->onDelete('restrict');

            $table->boolean('confirmed')->default(false);
            $table->date('date_begin');
            $table->date('date_end');
            $table->date('date_entry');
            $table->date('date_confirmed')->nullable();

            $table->integer('kwh_start')->nullable();
            $table->integer('kwh_end')->nullable();

            $table->integer('kwh_start_high')->nullable();
            $table->integer('kwh_end_high')->nullable();

            $table->integer('kwh_start_low')->nullable();
            $table->integer('kwh_end_low')->nullable();

            $table->integer('revenue')->nullable();

            $table->date('date_payed')->nullable();

            $table->integer('pay_percentage')->nullable();

            $table->unsignedInteger('type_id')->nullable();
            $table->foreign('type_id')
                ->references('id')->on('production_project_revenue_type')
                ->onDelete('restrict');

            $table->integer('created_by_id')->unsigned();
            $table->foreign('created_by_id')->references('id')->on('users');

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
        Schema::dropIfExists('obligation_numbers');
        Schema::dropIfExists('production_project_revenue_type');
        Schema::dropIfExists('production_project_revenue_category');
    }
}
