<?php

use App\Eco\ParticipantMutation\ParticipantMutation;
use App\Eco\ParticipantMutation\ParticipantMutationType;
use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddResultDepositTypesToParticipantMutationTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('participant_mutation_types')->insert([
                'name' => 'Resultaat',
                'description' => 'Resultaat bijschrijven',
                'code_ref' => 'result_deposit',
                'project_type_id' => ProjectType::where('code_ref', 'capital')->first()->id,
            ]
        );
        DB::table('participant_mutation_types')->insert([
                'name' => 'Resultaat',
                'description' => 'Resultaat bijschrijven',
                'code_ref' => 'result_deposit',
                'project_type_id' => ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id,
            ]
        );

        $projectTypeCapital =ProjectType::where('code_ref', 'capital')->first()->id;
        $resultCapitalMutationType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectTypeCapital)->first()->id;
        $resultDepositCapitalMutationType = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectTypeCapital)->first()->id;

        $projectTypePcr =ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;
        $resultPcrMutationType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectTypePcr)->first()->id;
        $resultDepositPcrMutationType = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectTypePcr)->first()->id;

        $mutations = ParticipantMutation::whereIn('type_id', [$resultCapitalMutationType, $resultPcrMutationType])->get();

        foreach ($mutations as $mutation){
            if($mutation->type_id == $resultCapitalMutationType && $mutation->paid_on == 'Bijschrijven' ){
                DB::table('participant_mutations')
                    ->where('id', $mutation->id)
                    ->update([
                        'type_id' =>$resultDepositCapitalMutationType,
                    ]);
            }
            if($mutation->type_id == $resultPcrMutationType && $mutation->paid_on == 'Bijschrijven' ){
                DB::table('participant_mutations')
                    ->where('id', $mutation->id)
                    ->update([
                        'type_id' =>$resultDepositPcrMutationType,
                    ]);
            }
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
