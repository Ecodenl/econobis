<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDistrictIdToQuotationRequests extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->foreignId('district_id')->nullable()->constrained('districts')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quotation_requests', function (Blueprint $table) {
            $table->dropConstrainedForeignId('district_id');
        });
    }
}
