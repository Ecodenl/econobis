<?php

use App\Eco\Address\Address;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class ConversionSoftDeleteAES extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $addresses = Address::onlyTrashed()->get();
        foreach ($addresses as $address){
            foreach ($address->addressEnergySuppliers as $addressEnergySupplier){
                Log::info('address ' . $address->id . ' met deleted_at ' . $address->deleted_at);
                $addressEnergySupplier->delete();
                Log::info(' addressEnergySupplier ' . $addressEnergySupplier->id . ' met deleted_at ' . $addressEnergySupplier->deleted_at);
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
        //
    }
}
