<?php

use App\Eco\Project\ProjectType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParticipantMutationStatusLog extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participant_mutation_statuses_log', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('participant_mutation_id');
            $table->foreign('participant_mutation_id', 'participant_mutation_mutation_status_log')
                ->references('id')->on('participant_mutations')
                ->onDelete('restrict');
            $table->unsignedInteger('from_status_id')->nullable();
            $table->foreign('from_status_id')
                ->references('id')->on('participant_mutation_statuses')
                ->onDelete('restrict');
            $table->unsignedInteger('to_status_id');
            $table->foreign('to_status_id')
                ->references('id')->on('participant_mutation_statuses')
                ->onDelete('restrict');
            $table->dateTime('date_status')->nullable();
            $table->timestamps();
            $table->integer('created_by_id')->unsigned();
            $table->foreign('created_by_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('participant_mutation_statuses_log');
    }
}
