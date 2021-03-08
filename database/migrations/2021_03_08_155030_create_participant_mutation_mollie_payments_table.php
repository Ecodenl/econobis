<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateParticipantMutationMolliePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participant_mutation_mollie_payments', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedInteger('participant_mutation_id');
            $table->foreign('participant_mutation_id', 'pmmp_participant_mutation_id_foreign')->references('id')->on('participant_mutations');

            $table->string('mollie_id')->nullable();
            $table->string('checkout_url')->nullable();
            $table->dateTime('date_activated')->nullable();
            $table->dateTime('date_paid')->nullable();

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
        Schema::dropIfExists('participant_mutation_mollie_payments');
    }
}
