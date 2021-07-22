<?php

use App\Eco\ParticipantProject\ParticipantProjectPayoutType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ConvertPayoutTypeInProjectRevenueDistributionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_revenue_distribution', function (Blueprint $table) {
            $table->integer('payout_type_id')->nullable()->after('payout_type');
        });

        $payoutTypeAccount = ParticipantProjectPayoutType::where('code_ref', 'account')->first();
        $payoutTypeAccount->name = "Uitbetalen (Rekening klant)";
        $payoutTypeAccount->save();
        $payoutTypeCredit = ParticipantProjectPayoutType::where('code_ref', 'credit')->first();
        $payoutTypeCredit->name = "Naar kapitaalrekening (niet uitbetalen)";
        $payoutTypeCredit->save();

        foreach (\App\Eco\Project\ProjectRevenueDistribution::withTrashed()->get() as $distribution){
            if($distribution->payout_type === 'Bijschrijven')
            {
                $distribution->payout_type_id = $payoutTypeCredit->id;
                $distribution->save();
            }
            if($distribution->payout_type === 'Rekening')
            {
                $distribution->payout_type_id = $payoutTypeAccount->id;
                $distribution->save();
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
        if (Schema::hasColumn('project_revenue_distribution', 'payout_type_id'))
        {
            Schema::table('project_revenue_distribution', function (Blueprint $table)
            {
                $table->dropColumn('payout_type_id');
            });
        }
    }
}
