<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeAddressAdditionNotNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $addresses = \App\Eco\Address\Address::withTrashed()->whereNull('addition')->get();
        foreach ($addresses as $address){
            $address->addition = '';
            $address->save();
        }

        Schema::table('addresses', function (Blueprint $table) {
            $table->string('addition')->nullable(false)->change();
        });
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
