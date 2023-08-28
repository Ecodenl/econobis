<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Aug2023AddExtraFields2ToQuotationRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->double('cost_adjustment', 11, 2)->nullable()->default(0)->after('quotation_amount');
            $table->double('award_amount', 11, 2)->nullable()->default(0)->after('cost_adjustment');
            $table->double('amount_determination', 11, 2)->nullable()->default(0)->after('award_amount');
            $table->date('date_planned_attempt1')->nullable()->default(null)->after('amount_determination');
            $table->date('date_planned_attempt2')->nullable()->default(null)->after('date_planned_attempt1');
            $table->date('date_planned_attempt3')->nullable()->default(null)->after('date_planned_attempt2');
            $table->date('date_under_review_determination')->nullable()->default(null)->after('date_executed');
            $table->date('date_approved_determination')->nullable()->default(null)->after('date_under_review_determination');
            $table->text('projectmanager_note')->nullable();
            $table->text('client_note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('quotation_requests', 'client_note')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('client_note');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'projectmanager_note')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('projectmanager_note');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'date_approved_determination')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('date_approved_determination');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'date_under_review_determination')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('date_under_review_determination');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'date_planned_attempt3')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('date_planned_attempt3');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'date_planned_attempt2')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('date_planned_attempt2');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'date_planned_attempt1')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('date_planned_attempt1');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'amount_determination')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('amount_determination');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'award_amount')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('award_amount');
            });
        }
        if (Schema::hasColumn('quotation_requests', 'cost_adjustment')) {
            Schema::table('quotation_requests', function (Blueprint $table) {
                $table->dropColumn('cost_adjustment');
            });
        }
    }
}
