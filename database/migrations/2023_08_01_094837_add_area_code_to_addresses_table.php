<?php

use App\Eco\Address\Address;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAreaCodeToAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->integer('shared_area_code')->nullable(true)->after('postal_code');
            $table->string('shared_area_name')->default('')->after('shared_area_code');
        });

        $addresses = Address::withTrashed()->whereNull('shared_area_code')->get();
        foreach ($addresses as $address){
            $sharedPostalCodesHouseNumber = $address->getSharedPostalCodesHouseNumber();
            if($sharedPostalCodesHouseNumber && $sharedPostalCodesHouseNumber->sharedArea){
                $address->shared_area_code = $sharedPostalCodesHouseNumber->sharedArea->area_code;
                $address->shared_area_name = $sharedPostalCodesHouseNumber->sharedArea->area_name;
                $address->save();
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
        if (Schema::hasColumn('addresses', 'shared_area_name'))
        {
            Schema::table('addresses', function (Blueprint $table)
            {
                $table->dropColumn('shared_area_name');
            });
        }
        if (Schema::hasColumn('addresses', 'shared_area_code'))
        {
            Schema::table('addresses', function (Blueprint $table)
            {
                $table->dropColumn('shared_area_code');
            });
        }
    }
}
