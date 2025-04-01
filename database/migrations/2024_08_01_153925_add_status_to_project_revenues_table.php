<?php

use App\Eco\Project\ProjectRevenue;
use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenues', function (Blueprint $table) {
            $table->string('status')->nullable()->after('confirmed');
        });
        $projectRevenues = ProjectRevenue::all();
        foreach ($projectRevenues as $projectRevenue){
            $projectTypeCodeRef = (ProjectType::where('id', $projectRevenue->project->project_type_id)->first())->code_ref;
            $projectRevenueCategoryCodeRef = $projectRevenue->category->code_ref;
            if($projectTypeCodeRef == 'loan' && $projectRevenueCategoryCodeRef == 'revenueEuro'){
                $projectRevenue->distribution_type_id = 'howLongInPossession';
            }

            if($projectRevenue->confirmed){
                $hasNotProcessedDistributions = $projectRevenue->distribution()->where('status', '!=', 'processed')->exists();
                if($hasNotProcessedDistributions){
                    $status = 'confirmed';
                } else {
                    $status = 'processed';
                }

            } else {
                $status = 'concept';
            }

            $projectRevenue->status = $status;
            $projectRevenue->saveQuietly();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('project_revenues', 'status'))
        {
            Schema::table('project_revenues', function (Blueprint $table)
            {
                $table->dropColumn('status');
            });
        }
    }
};
