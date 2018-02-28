<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ParticipantTransactions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participant_transaction_type', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $participant_transaction_types = [
            'Inleg',
            'Uitkering',
            'Verkoop',
        ];

        foreach (
            $participant_transaction_types as $participant_transaction_type
        ) {
            DB::table('participant_transaction_type')->insert([
                    'name' => $participant_transaction_type
                ]
            );
        }

        Schema::create('participant_transactions', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('participation_id');
            $table->foreign('participation_id')
                ->references('id')->on('participation_production_project')
                ->onDelete('restrict');

            $table->unsignedInteger('type_id');
            $table->foreign('type_id')
                ->references('id')->on('participant_transaction_type')
                ->onDelete('restrict');

            $table->date('date_transaction');
            $table->integer('amount');
            $table->text('iban')->nullable();
            $table->string('referral')->nullable();
            $table->string('entry')->nullable();
            $table->date('date_booking')->nullable();

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
        Schema::dropIfExists('participant_transactions');
        Schema::dropIfExists('participant_transaction_type');
    }
}
