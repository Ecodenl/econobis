<?php

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ContactNote\ContactNote;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Task\Task;
use App\Eco\Task\TaskPropertyValue;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class renameEnergySupplier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $es = \App\Eco\EnergySupplier\EnergySupplier::where('name', '=om')->first();
        $es->name = 'OM';
        $es->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $es = \App\Eco\EnergySupplier\EnergySupplier::where('name', 'OM')->first();
        $es->name = '=om';
        $es->save();
    }
}
