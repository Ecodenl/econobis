<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateSubsidieAanvraagInBehandeling extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('behandeling', function (Blueprint $table) {
            DB::table('quotation_request_status')
                ->where('name', 'Subsidieaanvraag in behandeling')
                ->update([
                    'opportunity_action_id' => 1,
                ]
            );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('behandeling', function (Blueprint $table) {
            //
        });
    }
}
