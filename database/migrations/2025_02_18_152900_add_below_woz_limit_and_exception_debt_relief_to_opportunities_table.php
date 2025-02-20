<?php

use App\Eco\Campaign\Campaign;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddBelowWozLimitAndExceptionDebtReliefToOpportunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('opportunities', function (Blueprint $table) {
            $table->boolean('below_woz_limit')->nullable()->default(1);
            $table->boolean('exception_debt_relief')->nullable()->default(0);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('opportunities', function (Blueprint $table) {
            $table->dropColumn('below_woz_limit');
            $table->dropColumn('exception_debt_relief');
        });
    }
};
