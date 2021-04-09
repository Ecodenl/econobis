<?php

use App\Eco\Address\Address;
use Illuminate\Database\Migrations\Migration;

class ConversionEndDateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach (Address::withTrashed()->get() as $address){
            if($address->type_id === 'old' && $address->end_date == null)
            {
                $address->end_date = $address->updated_at ? $address->updated_at->format('Y-m-d') : \Carbon\Carbon::today();
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
        //
    }
}
