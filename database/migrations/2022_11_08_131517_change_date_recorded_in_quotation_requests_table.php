<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChangeDateRecordedInQuotationRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->dateTime('date_recorded')->change();
        });

        $quotationRequests = DB::table('quotation_requests')->whereNotNull('date_recorded')->get();
        foreach ($quotationRequests as $quotationRequest) {
            $dateRecorded = Carbon::parse($quotationRequest->date_recorded)->format('Y-m-d');
            $dateRecordedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateRecorded . ' 08:00');
            DB::table('quotation_requests')
                ->where('id',$quotationRequest->id)
                ->update(['date_recorded' => $dateRecordedMerged]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->date('date_recorded')->change();
        });
    }
}
