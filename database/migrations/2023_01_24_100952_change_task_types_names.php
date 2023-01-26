<?php

use App\Eco\Task\TaskType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTaskTypesNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = TaskType::where('name', 'Adres wijziging deelnemer')->first();
        $qrStatus->name = 'Adreswijziging deelnemer';
        $qrStatus->save();

        $qrStatus = TaskType::where('name', 'Advies gesprek')->first();
        $qrStatus->name = 'Adviesgesprek';
        $qrStatus->save();

        $qrStatus = TaskType::where('name', 'Overstap energie leverancier')->first();
        $qrStatus->name = 'Overstap energieleverancier';
        $qrStatus->save();

        $qrStatus = new TaskType();
        $qrStatus->name = 'Subsidieaanvraag';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = TaskType::where('name', 'Adreswijziging deelnemer')->first();
        $qrStatus->name = 'Adres wijziging deelnemer';
        $qrStatus->save();

        $qrStatus = TaskType::where('name', 'Adviesgesprek')->first();
        $qrStatus->name = 'Advies gesprek';
        $qrStatus->save();

        $qrStatus = TaskType::where('name', 'Overstap energieleverancier')->first();
        $qrStatus->name = 'Overstap energie leverancier';
        $qrStatus->save();

        $qrStatus = TaskType::where('name', 'Subsidieaanvraag')->first();
        $qrStatus->delete();
    }
}
