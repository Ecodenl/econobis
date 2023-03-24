<?php

use App\Eco\Opportunity\OpportunityStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsMarch2023ToOpportunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('opportunity_status', function (Blueprint $table) {
            $table->integer('external_hoom_id')->nullable(true);
            $table->string('code_ref')->nullable(true);
            $table->integer('order')->nullable(true);
        });
        $opportunityStatus = OpportunityStatus::where('name', 'Actief')->first();
        $opportunityStatus->external_hoom_id = 1;
        $opportunityStatus->code_ref = "active";
        $opportunityStatus->order = 2;
        $opportunityStatus->save();
        $opportunityStatus = OpportunityStatus::where('name', 'In afwachting')->first();
        $opportunityStatus->external_hoom_id = 3;
        $opportunityStatus->code_ref = "pending";
        $opportunityStatus->order = 3;
        $opportunityStatus->save();
        $opportunityStatus = OpportunityStatus::where('name', 'Uitgevoerd')->first();
        $opportunityStatus->external_hoom_id = 5;
        $opportunityStatus->code_ref = "executed";
        $opportunityStatus->order = 5;
        $opportunityStatus->save();
        $opportunityStatus = OpportunityStatus::where('name', 'Uitvoering, doe het zelf')->first();
        $opportunityStatus->external_hoom_id = null;
        $opportunityStatus->code_ref = "executed-do-it-yourself";
        $opportunityStatus->order = 5;
        $opportunityStatus->save();
        $opportunityStatus = OpportunityStatus::where('name', 'Geen uitvoering')->first();
        $opportunityStatus->external_hoom_id = 6;
        $opportunityStatus->code_ref = "no_execution";
        $opportunityStatus->order = 6;
        $opportunityStatus->save();
        $opportunityStatus = OpportunityStatus::where('name', 'Opdracht')->first();
        $opportunityStatus->external_hoom_id = 4;
        $opportunityStatus->code_ref = "in_progress";
        $opportunityStatus->order = 4;
        $opportunityStatus->save();

        $opportunityStatus = New OpportunityStatus();
        $opportunityStatus->name = 'Inactief';
        $opportunityStatus->uses_wf = 0;
        $opportunityStatus->email_template_id_wf = null;
        $opportunityStatus->number_of_days_to_send_email = 0;
        $opportunityStatus->active = 1;
        $opportunityStatus->external_hoom_id = 2;
        $opportunityStatus->code_ref = "inactive";
        $opportunityStatus->order = 1;
        $opportunityStatus->save();

        Schema::table('opportunities', function (Blueprint $table) {
            $table->integer('housing_file_specification_id')->nullable()->unsigned()->after('status_id');
            $table->foreign('housing_file_specification_id')->references('id')->on('housing_file_specifications') ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('opportunities', 'housing_file_specification_id'))
        {
            Schema::table('opportunities', function (Blueprint $table)
            {
                $table->dropForeign(['housing_file_specification_id']);
                $table->dropColumn('housing_file_specification_id');
            });
        }

        OpportunityStatus::where('code_ref', 'inactive')->delete();

        if (Schema::hasColumn('opportunity_status', 'external_hoom_id'))
        {
            Schema::table('opportunity_status', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_id');
            });
        }
        if (Schema::hasColumn('opportunity_status', 'code_ref'))
        {
            Schema::table('opportunity_status', function (Blueprint $table)
            {
                $table->dropColumn('code_ref');
            });
        }
        if (Schema::hasColumn('opportunity_status', 'order'))
        {
            Schema::table('opportunity_status', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
    }
}
