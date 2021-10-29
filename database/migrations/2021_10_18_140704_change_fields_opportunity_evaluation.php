<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeFieldsOpportunityEvaluation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('opportunity_evaluation'))
        {
            Schema::dropIfExists('opportunity_evaluation_status');
            Schema::create('opportunity_evaluation_status', function (Blueprint $table) {
                $table->unsignedInteger('id');
                $table->string('name');
            });

            DB::table('opportunity_evaluation_status')->insert(
                [
                    ['id' => 1, 'name' => 'Onbekend'],
                    ['id' => 2, 'name' => 'Ja'],
                    ['id' => 3, 'name' => 'Nee'],
                ]);

            Schema::table('opportunities', function (Blueprint $table) {
                $table->boolean('evaluation_is_realised')->default(1)->after('updated_at');
                $table->boolean('evaluation_is_statisfied')->default(1)->after('evaluation_is_realised');
                $table->boolean('evaluation_would_recommend_organisation')->default(1)->after('evaluation_is_statisfied');
                $table->string('evaluation_note')->default('')->after('evaluation_would_recommend_organisation');
            });

            $opportunityEvaluations = DB::table('opportunity_evaluation')->get();

            foreach($opportunityEvaluations as $opportunityEvaluation){
                $opportunity = App\Eco\Opportunity\Opportunity::find($opportunityEvaluation->opportunity_id);
                if($opportunity){
                    $opportunity->evaluation_is_realised = $opportunityEvaluation->is_realised==0 ? 3 : ($opportunityEvaluation->is_realised==1 ? 2 : 1);
                    $opportunity->evaluation_is_statisfied = $opportunityEvaluation->is_statisfied==0 ? 3 : ($opportunityEvaluation->is_statisfied==1 ? 2 : 1);
                    $opportunity->evaluation_would_recommend_organisation = $opportunityEvaluation->would_recommend_organisation==0 ? 3 : ($opportunityEvaluation->would_recommend_organisation==1 ? 2 : 1);
                    $opportunity->evaluation_note = $opportunityEvaluation->note;
                    $opportunity->save();
                }
            }

            DB::table('dynamic_contact_group_filter')
                ->where('field', 'opportunity')
                ->update(['field' => 'opportunityMeasureCategory']);

            Schema::rename('opportunity_evaluation', 'xxx_opportunity_evaluation');
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasTable('xxx_opportunity_evaluation'))
        {
            DB::table('dynamic_contact_group_filter')
                ->where('field', 'opportunityMeasureCategory')
                ->update(['field' => 'opportunity', 'connect_name' => 'App\Eco\Measure\MeasureCategory']);
            DB::table('dynamic_contact_group_filter')
                ->where('field', 'opportunityStatus')
                ->delete();
            DB::table('dynamic_contact_group_filter')
                ->where('field', 'opportunityMeasure')
                ->delete();
            DB::table('dynamic_contact_group_filter')
                ->where('field', 'opportunityEvaluationRealised')
                ->delete();

            if (Schema::hasColumn('opportunities', 'evaluation_is_realised')) {
                Schema::table('opportunities', function (Blueprint $table) {
                    $table->dropColumn('evaluation_is_realised');
                });
            }
            if (Schema::hasColumn('opportunities', 'evaluation_is_statisfied')) {
                Schema::table('opportunities', function (Blueprint $table) {
                    $table->dropColumn('evaluation_is_statisfied');
                });
            }
            if (Schema::hasColumn('opportunities', 'evaluation_would_recommend_organisation')) {
                Schema::table('opportunities', function (Blueprint $table) {
                    $table->dropColumn('evaluation_would_recommend_organisation');
                });
            }
            if (Schema::hasColumn('opportunities', 'evaluation_note')) {
                Schema::table('opportunities', function (Blueprint $table) {
                    $table->dropColumn('evaluation_note');
                });
            }

            Schema::dropIfExists('opportunity_evaluation_status');
            Schema::rename('xxx_opportunity_evaluation', 'opportunity_evaluation');
        }

    }
}
