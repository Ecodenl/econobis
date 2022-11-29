<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChangeDateReleasedInQuotationRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->dateTime('date_released')->change();
        });

        $quotationRequests = DB::table('quotation_requests')->whereNotNull('date_released')->get();
        foreach ($quotationRequests as $quotationRequest) {
            $dateReleased = Carbon::parse($quotationRequest->date_released)->format('Y-m-d');
            $dateReleasedMerged = Carbon::createFromFormat('Y-m-d H:i', $dateReleased . ' 08:00');
            DB::table('quotation_requests')
                ->where('id',$quotationRequest->id)
                ->update(['date_released' => $dateReleasedMerged]);
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
            $table->date('date_released')->change();
        });
    }
}
