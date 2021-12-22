<?php

use App\Eco\Administration\Administration;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPrefixInvoiceNumberToAdministrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('administrations', 'prefix_invoice_number')) {
            Schema::table('administrations', function (Blueprint $table) {
                $table->string('prefix_invoice_number', 5)->default('F')->after('administration_number')->after('number_of_invoice_reminders');
            });
        }

        $administrations = Administration::withTrashed()->get();

        foreach ($administrations as $administration){
            if(empty($administration->prefix_invoice_number)){
                $administration->prefix_invoice_number = 'F';
                $administration->save();
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
        if (Schema::hasColumn('administrations', 'prefix_invoice_number')) {
            Schema::table('administrations', function (Blueprint $table) {
                $table->dropColumn('prefix_invoice_number');
            });
        }
    }
}
