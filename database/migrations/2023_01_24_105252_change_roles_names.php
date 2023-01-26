<?php

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeRolesNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = Role::where('name', 'Energiemanager')->first();
        $qrStatus->name = 'Buurtaanpak manager';
        $qrStatus->save();

        $qrStatus = Role::where('name', 'Energiecoordinator')->first();
        $qrStatus->name = 'Buurtaanpak coördinator';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = Role::where('name', 'Buurtaanpak manager')->first();
        $qrStatus->name = 'Energiemanager';
        $qrStatus->save();

        $qrStatus = Role::where('name', 'Buurtaanpak coördinator')->first();
        $qrStatus->name = 'Energiecoordinator';
        $qrStatus->save();
    }
}
