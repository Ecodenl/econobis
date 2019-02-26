<?php

use App\Eco\Project\ProjectType;
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
        Schema::create('participant_mutation_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->integer('project_type_id');
            $table->timestamps();
        });

        // Types for loan
        $participant_mutation_types = [
            [
                'name' => 'Lening afsluiten',
                'description' => 'Inleg'
            ],
            [
                'name' => 'Bijstorten',
                'description' => 'Inleg'
            ],
            [
                'name' => 'Aflossing',
                'description' => 'Opname'
            ],
            [
                'name' => 'Rente',
                'description' => 'Resultaat'
            ],
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_types')->insert([
                    'name' => $participant_mutation_type['name'],
                    'description' => $participant_mutation_type['description'],
                    'project_type_id' => ProjectType::where('code_ref', 'loan')->first()->id,
                ]
            );
        }

        // Types for obligation
        $participant_mutation_types = [
            [
                'name' => 'Uitgifte obligatie',
                'description' => 'Inleg'
            ],
            [
                'name' => 'Terugbetaling',
                'description' => 'Opname'
            ],
            [
                'name' => 'Rente',
                'description' => 'Resultaat'
            ],
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_types')->insert([
                    'name' => $participant_mutation_type['name'],
                    'description' => $participant_mutation_type['description'],
                    'project_type_id' => ProjectType::where('code_ref', 'obligation')->first()->id,
                ]
            );
        }

        // Types for capital
        $participant_mutation_types = [
            [
                'name' => 'Kapitaalstoring',
                'description' => 'Inleg'
            ],
            [
                'name' => 'Kapitaal terugbetaling',
                'description' => 'Opname'
            ],
            [
                'name' => 'Resultaat',
                'description' => 'Resultaat'
            ],
            [
                'name' => 'Boekwaarde aanpassing',
                'description' => 'Boekwaarde'
            ],
            [
                'name' => 'Verkoop',
                'description' => 'Verkoop'
            ],
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_types')->insert([
                    'name' => $participant_mutation_type['name'],
                    'description' => $participant_mutation_type['description'],
                    'project_type_id' => ProjectType::where('code_ref', 'capital')->first()->id,
                ]
            );
        }

        // Types for postal code link capital
        $participant_mutation_types = [
            [
                'name' => 'Kapitaalstoring',
                'description' => 'Inleg'
            ],
            [
                'name' => 'Teruggave EB',
                'description' => 'Indicatie teruggave EB'
            ],
            [
                'name' => 'Kapitaal terugbetaling',
                'description' => 'Opname'
            ],
            [
                'name' => 'Resultaat',
                'description' => 'Resultaat'
            ],
            [
                'name' => 'Boekwaarde aanpassing',
                'description' => 'Boekwaarde'
            ],
            [
                'name' => 'Verkoop',
                'description' => 'Verkoop'
            ],
        ];

        foreach (
            $participant_mutation_types as $participant_mutation_type
        ) {
            DB::table('participant_mutation_types')->insert([
                    'name' => $participant_mutation_type['name'],
                    'description' => $participant_mutation_type['description'],
                    'project_type_id' => ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id,
                ]
            );
        }

        Schema::create('participant_mutation_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        // Types for obligation
        $participant_mutation_statuses = ['Interesse', 'Aangevraagd', 'Toegekend', 'Definitief'];

        foreach($participant_mutation_statuses as $participant_mutation_status) {
            DB::table('participant_mutation_statuses')->insert([
                    'name' => $participant_mutation_status,
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
                ->references('id')->on('participant_mutation_types')
                ->onDelete('restrict');

            $table->unsignedInteger('status_id')->nullable();
            $table->foreign('status_id')
                ->references('id')->on('participant_mutation_statuses')
                ->onDelete('restrict');

            $table->date('date_payment')->nullable();

            $table->double('account', 8, 2)->nullable();
            $table->integer('quantity')->nullable();

            $table->double('returns', 8, 2)->nullable();
            $table->double('payout_kwh')->nullable();
            $table->double('indication_of_restitution_energy_tax', 8, 2)->nullable();

            $table->text('paid_on')->nullable();

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
        Schema::dropIfExists('participant_mutations');
        Schema::dropIfExists('participant_mutation_type');
        Schema::dropIfExists('participant_mutation_type_group');
    }
}
