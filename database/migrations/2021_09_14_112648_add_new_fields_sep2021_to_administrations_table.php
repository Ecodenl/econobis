<?php

use App\Eco\Administration\Administration;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsSep2021ToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->date('date_sync_twinfield_invoices')->nullable()->default(null)->after('date_sync_twinfield_payments');
//            $table->string('prefix_invoice_number', 5)->default('F')->after('administration_number')->after('number_of_invoice_reminders');
        });

        if (!Schema::hasColumn('administrations', 'prefix_invoice_number')) {

            Schema::table('administrations', function (Blueprint $table) {
                $table->string('prefix_invoice_number', 5)->default('F')->after('administration_number')->after('number_of_invoice_reminders');
            });
            $administrations = Administration::withTrashed()->get();
            foreach ($administrations as $administration){
                if(empty($administration->prefix_invoice_number)){
                    $administration->prefix_invoice_number = 'F';
                    $administration->save();
                }
            }

        }


        $administrations = Administration::all();

        foreach ($administrations as $administration){
            if($administration->uses_twinfield){
                $administration->date_sync_twinfield_invoices = Carbon::parse('2019-01-01');
            }
            $administration->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('date_sync_twinfield_invoices');
            $table->dropColumn('prefix_invoice_number');
        });
    }
}
