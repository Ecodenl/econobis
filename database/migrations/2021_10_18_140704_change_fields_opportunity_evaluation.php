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
        Schema::dropIfExists('opportunity_evaluation_status');
        Schema::create('opportunity_evaluation_status', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->string('name');
        });

        DB::table('opportunity_evaluation_status')->insert(
            [
                ['id' => 1, 'name' => 'Ja'],
                ['id' => 2, 'name' => 'Nee'],
                ['id' => 9, 'name' => 'Onbekend'],
            ]);

        DB::table('opportunity_evaluation')
            ->where('is_realised', 0)
            ->update(['is_realised' => 2]);
        DB::table('opportunity_evaluation')
            ->where('is_statisfied', 0)
            ->update(['is_statisfied' => 2]);
        DB::table('opportunity_evaluation')
            ->where('would_recommend_organisation', 0)
            ->update(['would_recommend_organisation' => 2]);

        DB::table('dynamic_contact_group_filter')
            ->where('field', 'opportunity')
            ->update(['field' => 'opportunityMeasureCategory']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
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
            ->where('field', 'opportunityEvaluationStatus')
            ->delete();

        DB::table('opportunity_evaluation')
            ->where('is_realised', 2)
            ->update(['is_realised' => 0]);
        DB::table('opportunity_evaluation')
            ->where('is_statisfied', 2)
            ->update(['is_statisfied' => 0]);
        DB::table('opportunity_evaluation')
            ->where('would_recommend_organisation', 2)
            ->update(['would_recommend_organisation' => 0]);

        Schema::dropIfExists('opportunity_evaluation_status');

    }
}
