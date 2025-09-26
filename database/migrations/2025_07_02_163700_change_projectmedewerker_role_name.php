<?php

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeProjectmedewerkerRoleName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = Role::where('name', 'Projectmedewerker')->first();
        $qrStatus->name = 'Projectmanager';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = Role::where('name', 'Projectmanager')->first();
        $qrStatus->name = 'Projectmedewerker';
        $qrStatus->save();
    }
}
