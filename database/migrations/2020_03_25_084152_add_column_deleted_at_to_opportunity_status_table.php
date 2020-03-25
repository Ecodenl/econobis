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
            $table->date('deleted_at')->default(null);
        });

        // Soft deleten van de kansen 'Uitvoering, doe het zelf' en 'opdracht'
        $kansUitvoeringDoeHetZelf = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Uitvoering, doe het zelf')->first();
        $kansUitvoeringDoeHetZelf->deleted_at = \Carbon\Carbon::now('Europe/Amsterdam');
        $kansUitvoeringDoeHetZelf->save();

        $kansOpdracht = \App\Eco\Opportunity\OpportunityStatus::where('name', 'Opdracht')->first();
        $kansOpdracht->deleted_at = \Carbon\Carbon::now('Europe/Amsterdam');
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
            $table->dropColumn('deleted_at');
        });
    }
}
