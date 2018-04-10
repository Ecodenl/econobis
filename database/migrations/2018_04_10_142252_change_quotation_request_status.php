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
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->integer('order')->nullable();
        });

        $qrStatus = new QuotationRequestStatus();
        $qrStatus->name = 'Offerte aangevraagd';
        $qrStatus->order = 1;
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Offerte in overweging bij bewoner')->first();
        $qrStatus->name = 'In overweging bij bewoner';
        $qrStatus->order = 2;
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Offerte akkoord')->first();
        $qrStatus->name = 'Bewoner is akkoord';
        $qrStatus->order = 3;
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Offerte afgewezen')->first();
        $qrStatus->name = 'Bewoner heeft afgewezen';
        $qrStatus->order = 4;
        $qrStatus->save();

        $qrStatus = QuotationRequestStatus::where('name', 'Geen offerte (mogelijk)')->first();
        $qrStatus->name = 'Offerte niet mogelijk';
        $qrStatus->order = 5;
        $qrStatus->save();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
}
