<?php

use App\Eco\Campaign\Campaign;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddSubsidyPossibleAndWozLimitToCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->boolean('subsidy_possible')->default(false);
            $table->integer('woz_limit')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('campaigns', function (Blueprint $table) {
            $table->dropColumn('subsidy_possible');
            $table->dropColumn('woz_limit');
        });
    }
};
