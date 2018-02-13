<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuotationRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotation_request_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('quotation_requests', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('organisation_id')->unsigned();
            $table->foreign('organisation_id')->references('id')->on('organisations');

            $table->integer('opportunity_id')->unsigned();
            $table->foreign('opportunity_id')->references('id')->on('opportunities');

            $table->date('date_recorded')->nullable()->default(null);
            $table->date('date_released')->nullable()->default(null);
            $table->date('date_valid')->nullable()->default(null);

            $table->integer('status_id')->unsigned();
            $table->foreign('status_id')->references('id')->on('quotation_request_status');

            $table->text('quotation_text')->nullable();

            $table->integer('created_by_id')->unsigned();
            $table->foreign('created_by_id')->references('id')->on('users');

            $table->integer('updated_by_id')->unsigned();
            $table->foreign('updated_by_id')->references('id')->on('users');

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
    }
}
