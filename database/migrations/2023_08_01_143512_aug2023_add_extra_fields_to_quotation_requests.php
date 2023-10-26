<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Aug2023AddExtraFieldsToQuotationRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->double('quotation_amount', 11, 2)->nullable()->default(0)->after('opportunity_action_id');
            $table->date('date_executed')->nullable()->default(null)->after('date_approved_client');
            $table->text('coach_or_organisation_note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('quotation_requests', 'coach_or_organisation_note')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('coach_or_organisation_note');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'date_executed')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('date_executed');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'quotation_amount')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('quotation_amount');
            });
        }
    }
}
