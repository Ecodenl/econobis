<?php

use App\Eco\QuotationRequest\QuotationRequestStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class March2023NewFieldsForQuotationRequestStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_request_status', function (Blueprint $table) {
            $table->string('code_ref')->default('')->after('name');
        });

        foreach (QuotationRequestStatus::all() as $quotationRequestStatus){
            switch ($quotationRequestStatus->id){
                case 1:                                             // In overweging bij bewoner
                    $quotationRequestStatus->code_ref = 'under-review';
                    $quotationRequestStatus->save();
                    break;
                case 2:                                             // Bewoner is akkoord
                    $quotationRequestStatus->code_ref = 'approved';
                    $quotationRequestStatus->save();
                    break;
                case 3:                                             // Bewoner heeft afgewezen
                    $quotationRequestStatus->code_ref = 'not-approved';
                    $quotationRequestStatus->save();
                    break;
                case 4:                                             // Offerte niet mogelijk
                    $quotationRequestStatus->code_ref = 'not-possible';
                    $quotationRequestStatus->save();
                    break;
                case 5:                                             // Offerte aangevraagd
                    $quotationRequestStatus->code_ref = 'default';
                    $quotationRequestStatus->save();
                    break;
                case 6:                                             // Geen reactie ontvangen
                    $quotationRequestStatus->code_ref = 'no-response';
                    $quotationRequestStatus->save();
                    break;
                case 7:                                             // Geen afspraak gemaakt
                    $quotationRequestStatus->code_ref = 'default';
                    $quotationRequestStatus->save();
                    break;
                case 8:                                             // Afspraak gemaakt
                    $quotationRequestStatus->code_ref = 'made';
                    $quotationRequestStatus->save();
                    break;
                case 9:                                             // Afspraak gedaan
                    $quotationRequestStatus->code_ref = 'done';
                    $quotationRequestStatus->save();
                    break;
                case 10:                                            // Budgetaanvraag open
                    $quotationRequestStatus->code_ref = 'default';
                    $quotationRequestStatus->save();
                    break;
                case 11:                                            // Budgetaanvraag gemaakt
                $quotationRequestStatus->code_ref = 'made';
                    $quotationRequestStatus->save();
                    break;
                case 12:                                            // Budgetaanvraag akkoord
                    $quotationRequestStatus->code_ref = 'pm-approved';
                    $quotationRequestStatus->save();
                    break;
                case 13:                                            // Budgetaanvraag niet akkoord
                    $quotationRequestStatus->code_ref = 'pm-not-approved';
                    $quotationRequestStatus->save();
                    break;
                case 14:                                            // Afspraak afgezegd
                    $quotationRequestStatus->code_ref = 'cancelled';
                    $quotationRequestStatus->save();
                    break;
                case 15:                                            // Budgetaanvraag verstuurd naar bewoner
                    $quotationRequestStatus->code_ref = 'send';
                    $quotationRequestStatus->save();
                    break;
                case 16:                                            // Subsidieaanvraag in behandeling
                    $quotationRequestStatus->code_ref = 'under-review';
                    $quotationRequestStatus->save();
                    break;
                case 17:                                            // Subsidieaanvraag akkoord
                    $quotationRequestStatus->code_ref = 'approved';
                    $quotationRequestStatus->save();
                    break;
                case 18:                                            // Subsidieaanvraag niet akkoord
                    $quotationRequestStatus->code_ref = 'not-approved';
                    $quotationRequestStatus->save();
                    break;
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
            $table->dropColumn('code_ref');
        });
    }
}
