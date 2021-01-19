<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddParticipationsLoanAmountToDistributionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->double('participations_loan_amount', 11, 2)->nullable()->after('participations_amount');
        });
        $typeLoan = \App\Eco\Project\ProjectType::where('code_ref', 'loan')->first()->id;
        $projectRevenueDistributions = \App\Eco\Project\ProjectRevenueDistribution::withTrashed()->get();
        foreach ($projectRevenueDistributions as $projectRevenueDistribution){
            if($projectRevenueDistribution->revenue->project->project_type_id == $typeLoan){
                $projectRevenueDistribution->participations_loan_amount = $projectRevenueDistribution->participations_amount;
                $projectRevenueDistribution->participations_amount = 0;
                $projectRevenueDistribution->save();
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
        $typeLoan = \App\Eco\Project\ProjectType::where('code_ref', 'loan')->first()->id;
        $projectRevenueDistributions = \App\Eco\Project\ProjectRevenueDistribution::withTrashed()->get();
        foreach ($projectRevenueDistributions as $projectRevenueDistribution) {
            if ($projectRevenueDistribution->revenue->project->project_type_id == $typeLoan){
                $projectRevenueDistribution->participations_amount = $projectRevenueDistribution->participations_loan_amount;
                $projectRevenueDistribution->save();
            }
        }
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->dropColumn('participations_loan_amount');
        });
    }
}
