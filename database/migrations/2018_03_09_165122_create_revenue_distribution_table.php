<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRevenueDistributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('production_project_revenue_distribution', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('revenue_id');
            $table->foreign('revenue_id')
                ->references('id')->on('production_project_revenues')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->string('address')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('city')->nullable();
            $table->string('status')->nullable();
            $table->integer('participations_amount')->nullable();
            $table->double('payout')->nullable();
            $table->string('payout_type')->nullable();
            $table->date('date_payout')->nullable();
            $table->string('energy_supplier_name')->nullable();

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
        Schema::dropIfExists('production_project_revenue_distribution');
    }
}
