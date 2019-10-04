<?php

use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;

class AddRedemptionTypesToParticipantMutationTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('participant_mutation_types')->insert([
                'name' => 'Aflossing',
                'description' => 'Aflossing',
                'code_ref' => 'redemption',
                'project_type_id' => ProjectType::where('code_ref', 'loan')->first()->id,
            ]
        );
        DB::table('participant_mutation_types')->insert([
                'name' => 'Aflossing',
                'description' => 'Aflossing',
                'code_ref' => 'redemption',
                'project_type_id' => ProjectType::where('code_ref', 'obligation')->first()->id,
            ]
        );
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
