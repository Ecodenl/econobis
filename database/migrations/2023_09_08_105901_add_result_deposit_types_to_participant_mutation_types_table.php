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
        DB::table('participant_mutation_types')->insert([
                'name' => 'Resultaat',
                'description' => 'Resultaat bijschrijven',
                'code_ref' => 'result_deposit',
                'project_type_id' => ProjectType::where('code_ref', 'loan')->first()->id,
            ]
        );
        DB::table('participant_mutation_types')->insert([
                'name' => 'Resultaat',
                'description' => 'Resultaat bijschrijven',
                'code_ref' => 'result_deposit',
                'project_type_id' => ProjectType::where('code_ref', 'obligation')->first()->id,
            ]
        );

        $projectTypeCapital =ProjectType::where('code_ref', 'capital')->first()->id;
        $resultCapitalMutationType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectTypeCapital)->first()->id;
        $resultDepositCapitalMutationType = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectTypeCapital)->first()->id;

        $projectTypePcr =ProjectType::where('code_ref', 'postalcode_link_capital')->first()->id;
        $resultPcrMutationType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectTypePcr)->first()->id;
        $resultDepositPcrMutationType = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectTypePcr)->first()->id;

        $projectTypeLoan =ProjectType::where('code_ref', 'loan')->first()->id;
        $resultLoanMutationType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectTypeLoan)->first()->id;
        $resultDepositLoanMutationType = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectTypeLoan)->first()->id;

        $projectTypeObligation =ProjectType::where('code_ref', 'obligation')->first()->id;
        $resultObligationMutationType = ParticipantMutationType::where('code_ref', 'result')->where('project_type_id', $projectTypeObligation)->first()->id;
        $resultDepositObligationMutationType = ParticipantMutationType::where('code_ref', 'result_deposit')->where('project_type_id', $projectTypeObligation)->first()->id;

        $mutations = ParticipantMutation::whereIn('type_id', [$resultCapitalMutationType, $resultPcrMutationType, $resultLoanMutationType, $resultObligationMutationType])->get();

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
            if($mutation->type_id == $resultLoanMutationType && $mutation->paid_on == 'Bijschrijven' ){
                DB::table('participant_mutations')
                    ->where('id', $mutation->id)
                    ->update([
                        'type_id' =>$resultDepositLoanMutationType,
                    ]);
            }
            if($mutation->type_id == $resultObligationMutationType && $mutation->paid_on == 'Bijschrijven' ){
                DB::table('participant_mutations')
                    ->where('id', $mutation->id)
                    ->update([
                        'type_id' =>$resultDepositObligationMutationType,
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
