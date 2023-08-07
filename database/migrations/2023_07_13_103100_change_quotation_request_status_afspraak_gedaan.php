<?php

use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;

class ChangeQuotationRequestStatusAfspraakGedaan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = QuotationRequestStatus::where('name', 'Afspraak gedaan')->first();
        $qrStatus->name = 'Afspraak uitgevoerd';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = QuotationRequestStatus::where('name', 'Afspraak uitgevoerd')->first();
        $qrStatus->name = 'Afspraak gedaan';
        $qrStatus->save();
    }
}
