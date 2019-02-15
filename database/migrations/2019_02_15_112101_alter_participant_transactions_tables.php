<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterParticipantTransactionsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Rename table participants_transactions
        Schema::rename('participant_transactions', 'participant_mutations');

        // Change column participant_mutations
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->renameColumn('date_transaction', 'date_mutation');
        });

        // Rename table participant_transaction_type
        Schema::rename('participant_transaction_type', 'participant_mutation_type');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}