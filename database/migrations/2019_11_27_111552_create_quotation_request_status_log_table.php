<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuotationRequestStatusLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotation_request_status_log', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('quotation_request_id');
            $table->foreign('quotation_request_id')
                ->references('id')->on('quotation_requests')
                ->onDelete('restrict');
            $table->unsignedInteger('from_status_id')->nullable();
            $table->foreign('from_status_id')
                ->references('id')->on('quotation_request_status')
                ->onDelete('restrict');
            $table->unsignedInteger('to_status_id');
            $table->foreign('to_status_id')
                ->references('id')->on('quotation_request_status')
                ->onDelete('restrict');
            $table->dateTime('date_status')->nullable();
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
        Schema::dropIfExists('quotation_request_status_log');
    }
}
