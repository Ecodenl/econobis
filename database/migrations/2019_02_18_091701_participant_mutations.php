<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ParticipantMutations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('participant_mutation_type_group', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        // Types for loan
        $participant_mutation_type_groups = [
            'loan',
            'obligation',
            'capital',
        ];

        foreach (
            $participant_mutation_type_groups as $participant_mutation_type_group
        ) {
            DB::table('participant_mutation_type_group')->insert([
                    'name' => $participant_mutation_type_group,
                ]
            );
        }

        Schema::create('participant_mutation_type', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('group_id');
            $table->timestamps();
        });

        // Types for loan
        $participant_mutation_types = [
            'Lening afsluiten',
            'Bijstorten',
            'Aflossing',
            'Rente',
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_type')->insert([
                    'name' => $participant_mutation_type,
                    'group_id' => 1
                ]
            );
        }

        // Types for obligation
        $participant_mutation_types = [
            'Uitgifte obligatie',
            'Terugbetaling',
            'Rente',
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_type')->insert([
                    'name' => $participant_mutation_type,
                    'group_id' => 2
                ]
            );
        }

        // Types for capital
        $participant_mutation_types = [
            'Kapitaalstoring',
            'Teruggave EB',
            'Kapitaal terugbetaling',
            'Resultaat',
            'Boekwaarde aanpassing',
            'Verkoop',
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_type')->insert([
                    'name' => $participant_mutation_type,
                    'group_id' => 3
                ]
            );
        }

        Schema::create('participant_mutations', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('participation_id');
            $table->foreign('participation_id')
                ->references('id')->on('participation_project')
                ->onDelete('restrict');

            $table->date('date_creation');
            $table->string('entry')->default('');

            $table->unsignedInteger('type_id');
            $table->foreign('type_id')
                ->references('id')->on('participant_mutation_type')
                ->onDelete('restrict');

            $table->date('date_payment')->nullable();
            $table->text('description')->nullable();

            $table->double('account', 8, 2)->nullable();
            $table->integer('quantity')->nullable();

            $table->double('returns', 8, 2)->nullable();
            $table->double('payout_kwh')->nullable();
            $table->double('indication_of_restitution_energy_tax', 8, 2)->nullable();

            $table->text('paid_on')->nullable();

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
        Schema::dropIfExists('participant_mutations');
        Schema::dropIfExists('participant_mutation_type');
        Schema::dropIfExists('participant_mutation_type_group');
    }
}
