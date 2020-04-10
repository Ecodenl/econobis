<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnDeletedAtToOpportunityStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('opportunity_status', function (Blueprint $table) {
            $table->boolean('active')->default(true);
        });

        // Soft deleten van de kansen 'Uitvoering, doe het zelf' en 'opdracht'
        $kansUitvoeringDoeHetZelf = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Uitvoering, doe het zelf')->first();
        $kansUitvoeringDoeHetZelf->active = false;
        $kansUitvoeringDoeHetZelf->save();

        $kansOpdracht = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Opdracht')->first();
        $kansOpdracht->active = false;
        $kansOpdracht->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('opportunity_status', function (Blueprint $table) {
            $table->dropColumn('active');
        });
    }
}
