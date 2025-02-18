<?php

use App\Eco\Campaign\Campaign;
use App\Eco\Cooperation\Cooperation;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddWozValueToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->integer('woz_value')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->dropColumn('woz_value');
        });
    }
};
