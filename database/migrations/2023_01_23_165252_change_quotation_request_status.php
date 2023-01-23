<?php

use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeQuotationRequestStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = QuotationRequestStatus::where('name', 'Subsidie aanvraag open')->first();
        $qrStatus->name = 'Budgetaanvraag open';
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Subsidie aanvraag gemaakt')->first();
        $qrStatus->name = 'Budgetaanvraag gemaakt';
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Subsidie aanvraag akkoord')->first();
        $qrStatus->name = 'Budgetaanvraag akkoord';
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Subsidie niet akkoord')->first();
        $qrStatus->name = 'Budgetaanvraag niet akkoord';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = QuotationRequestStatus::where('name', 'Budgetaanvraag open')->first();
        $qrStatus->name = 'Subsidie aanvraag open';
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Budgetaanvraag gemaakt')->first();
        $qrStatus->name = 'Subsidie aanvraag gemaakt';
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Budgetaanvraag akkoord')->first();
        $qrStatus->name = 'v akkoord';
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Budgetaanvraag akkoord')->first();
        $qrStatus->name = 'Subsidie aanvraag niet akkoord';
        $qrStatus->save();
    }
}
