<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotationRequestActionsLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotation_request_actions_log', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('quotation_request_id')->nullable()->default(null);
            $table->foreign('quotation_request_id')
                ->references('id')->on('quotation_requests')
                ->onDelete('restrict');
            $table->unsignedInteger('contact_id')->nullable()->default(null);
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->unsignedInteger('user_id')->nullable()->default(null);
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->string('updated_with', 16)->nullable()->default(null);
            $table->unsignedInteger('old_status_id')->nullable()->default(null);
            $table->foreign('old_status_id')
                ->references('id')->on('quotation_request_status')
                ->onDelete('restrict');
            $table->unsignedInteger('new_status_id')->nullable()->default(null);
            $table->foreign('new_status_id')
                ->references('id')->on('quotation_request_status')
                ->onDelete('restrict');
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
        Schema::dropIfExists('quotation_request_actions_log');
    }
}
