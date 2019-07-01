<?php

use App\Eco\Invoice\Invoice;
use App\Eco\ParticipantProductionProject\ParticipantProductionProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemovePurchaseVats extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->dropColumn('btw_code_purchases_21');
            $table->dropColumn('btw_code_purchases_6');
            $table->dropColumn('btw_code_purchases_0');
            $table->dropColumn('btw_code_purchases_null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('administrations', function (Blueprint $table) {
            $table->string('btw_code_purchases_21')->nullable();
            $table->string('btw_code_purchases_6')->nullable();
            $table->string('btw_code_purchases_0')->nullable();
            $table->string('btw_code_purchases_null')->nullable();
        });
    }
}
