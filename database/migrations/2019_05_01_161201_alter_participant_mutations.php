<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterParticipantMutations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('participant_mutations', function (Blueprint $table) {
            $table->integer('amount_option')->nullable()->after('amount');
            $table->integer('amount_granted')->nullable()->after('amount_option');
            $table->integer('amount_final')->nullable()->after('amount_granted');
            $table->integer('quantity_option')->nullable()->after('quantity');
            $table->integer('quantity_granted')->nullable()->after('quantity_option');
            $table->integer('quantity_final')->nullable()->after('quantity_granted');
            $table->date('date_option')->nullable()->after('status_id');
            $table->date('date_granted')->nullable()->after('date_option');
            $table->date('date_contract_retour')->nullable()->after('date_granted');
            $table->date('date_entry')->nullable()->after('date_payment');
        });
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