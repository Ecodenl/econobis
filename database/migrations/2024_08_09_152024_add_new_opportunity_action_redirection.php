<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $redirectionId = DB::table('opportunity_actions')->insertGetId(
                ['name' => 'Doorverwijzing', 'code_ref' => 'redirection'],
        );

        DB::table('quotation_request_status')->insert([
            [
                'name' => 'Doorverwezen',
                'code_ref' => 'default',
                'opportunity_action_id' => $redirectionId,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'mail_cc_to_coach_wf' => 0,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 10,
                'is_pending_status' => 0
            ], [
                'name' => 'In behandeling',
                'code_ref' => 'under-review',
                'opportunity_action_id' => $redirectionId,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'mail_cc_to_coach_wf' => 0,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 20,
                'is_pending_status' => 0
            ], [
                'name' => 'Afgehandeld',
                'code_ref' => 'handled',
                'opportunity_action_id' => $redirectionId,
                'uses_wf' => 0,
                'email_template_id_wf' => null,
                'mail_cc_to_coach_wf' => 0,
                'number_of_days_to_send_email' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'order' => 30,
                'is_pending_status' => 0
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
