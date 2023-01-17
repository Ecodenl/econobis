<?php

use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsPendingStatusColumnToQuotationRequestStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->boolean('is_pending_status')->default(true);
        });

        foreach (QuotationRequestStatus::all() as $quotationRequestStatus){
            if( $quotationRequestStatus->id == 2
                || $quotationRequestStatus->id == 3
                || $quotationRequestStatus->id == 4
                || $quotationRequestStatus->name == "Geen afspraak gemaakt"
                || $quotationRequestStatus->name == "Afspraak gedaan"
                || $quotationRequestStatus->name == "Subsidie aanvraag gemaakt"
                || $quotationRequestStatus->name == "Subsidie aanvraag akkoord"
                || $quotationRequestStatus->name == "Subsidie niet akkoord"
            ){
                $quotationRequestStatus->is_pending_status = false;
                $quotationRequestStatus->save();
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
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->dropColumn('is_pending_status');
        });
    }
}
