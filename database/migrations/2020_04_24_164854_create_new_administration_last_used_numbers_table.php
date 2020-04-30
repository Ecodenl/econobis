<?php

use App\Eco\Administration\Administration;
use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateNewAdministrationLastUsedNumbersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('administration_last_used_numbers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number_type');
            $table->integer('number_year');
            $table->integer('administration_id')->unsigned();
            $table->foreign('administration_id')->references('id')->on('administrations');
            $table->integer('last_used_number');
            $table->unique(['number_type','number_year','administration_id'], 'administration_last_used_numbers_unique');
        });
        $administrations = Administration::all();
        foreach ($administrations as $administration){

            $lastInvoice = Invoice::where('administration_id', $administration->id)->where('invoice_number', '!=', 0)->whereYear('created_at', '=', Carbon::now()->year)->orderBy('invoice_number', 'desc')->first();
            if(!$lastInvoice){
                $lastInvoiceNumber = 0;
            }else{
                $lastInvoiceNumber = $lastInvoice->invoice_number;
            }

            DB::table('administration_last_used_numbers')->insert([
                    [
                        'number_type' => "invoice",
                        'number_year' => Carbon::now()->year,
                        'administration_id' => $administration->id,
                        'last_used_number' => $lastInvoiceNumber
                    ],
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
        Schema::dropIfExists('administration_last_used_numbers');
    }
}
