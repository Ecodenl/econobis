<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedQuotationRequestStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $quotationRequestStatus = [
            'Offerte in overweging bij bewoner',
            'Offerte akkoord',
            'Offerte afgewezen',
            'Geen offerte (mogelijk)',
        ];

        foreach ($quotationRequestStatus as $status) {
            DB::table('quotation_request_status')->insert([
                    ['name' => $status],
                ]
            );
        }


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
