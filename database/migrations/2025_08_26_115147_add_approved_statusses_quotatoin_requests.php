<?php

use App\Eco\Opportunity\OpportunityAction;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\QuotationRequest\QuotationRequestStatus as QuotationRequestStatusAlias;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->boolean('not_approved_client')->default(false)->after('date_approved_client');
            $table->boolean('not_approved_project_manager')->default(false)->after('date_approved_project_manager');
            $table->boolean('not_approved_external')->default(false)->after('date_approved_external');
            $table->boolean('not_approved_determination')->default(false)->after('date_approved_determination');
        });
        $opportunityActionQuotationRequestId = OpportunityAction::where('code_ref', 'quotation-request')->first()->id;
        $quotationRequestNotApprovedOccupantStatusId = QuotationRequestStatus::where('opportunity_action_id', $opportunityActionQuotationRequestId)->where('code_ref', 'not-approved')->first()->id;
        $quotationRequestNotApprovedPMStatusId = QuotationRequestStatus::where('opportunity_action_id', $opportunityActionQuotationRequestId)->where('code_ref', 'pm-not-approved')->first()->id;

        $opportunityActionSubsidyRequestId = OpportunityAction::where('code_ref', 'subsidy-request')->first()->id;
        $subsidyRequestNotApprovedPMStatusId = QuotationRequestStatus::where('opportunity_action_id', $opportunityActionSubsidyRequestId)->where('code_ref', 'pm-not-approved')->first()->id;

        DB::table('quotation_requests')
            ->where('status_id', $quotationRequestNotApprovedOccupantStatusId)
            ->update(['not_approved_client' => true]);
        DB::table('quotation_requests')
            ->whereIn('status_id', [$quotationRequestNotApprovedPMStatusId, $subsidyRequestNotApprovedPMStatusId])
            ->update(['not_approved_project_manager' => true]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->dropColumn('not_approved_client');
            $table->dropColumn('not_approved_project_manager');
            $table->dropColumn('not_approved_external');
            $table->dropColumn('not_approved_determination');
        });    }
};
