<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ParticipantProductionProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participant_production_project_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $participant_production_project_statusses = [
            'Optie',
            'Definitief',
            'Verkocht',
        ];

        foreach (
            $participant_production_project_statusses as $participant_production_project_status
        ) {
            DB::table('participant_production_project_status')->insert([
                    'name' => $participant_production_project_status
                ]
            );
        }

        Schema::create('participant_production_project_payout_type', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        $participant_production_project_payout_types = [
            'Rekening',
            'Bijschrijven',
            'Energieleverancier',
        ];

        foreach (
            $participant_production_project_payout_types as $participant_production_project_payout_type
        ) {
            DB::table('participant_production_project_payout_type')->insert([
                    'name' => $participant_production_project_payout_type
                ]
            );
        }

        Schema::create('participation_production_project', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('status_id');
            $table->foreign('status_id')
                ->references('id')->on('participant_production_project_status')
                ->onDelete('restrict');

            $table->unsignedInteger('production_project_id');
            $table->foreign('production_project_id')
                ->references('id')->on('production_projects')
                ->onDelete('restrict');

            $table->date('date_register')->nullable();

            $table->integer('participations_requested')->nullable();
            $table->integer('participations_granted')->nullable();
            $table->integer('participations_sold')->nullable();
            $table->integer('participations_rest_sale')->nullable();

            $table->date('date_contract_send')->nullable();
            $table->date('date_contract_retour')->nullable();
            $table->date('date_payed')->nullable();

            $table->text('iban_payed')->nullable();

            $table->boolean('did_accept_agreement')->nullable();

            $table->string('iban_attn')->nullable();

            $table->unsignedInteger('gifted_by_contact_id')->nullable();;
            $table->foreign('gifted_by_contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->text('iban_payout')->nullable();

            $table->unsignedInteger('legal_rep_contact_id')->nullable();
            $table->foreign('legal_rep_contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->string('iban_payout_attn')->nullable();

            $table->date('date_end')->nullable();

            $table->unsignedInteger('type_id');
            $table->foreign('type_id')
                ->references('id')->on('participant_production_project_payout_type')
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
        Schema::dropIfExists('participation_production_project');
        Schema::dropIfExists('participant_production_project_payout_type');
        Schema::dropIfExists('participant_production_project_status');
    }
}
