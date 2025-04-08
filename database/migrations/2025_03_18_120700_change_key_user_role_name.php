<?php

use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeKeyUserRoleName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = Role::where('name', 'Key user')->first();
        $qrStatus->name = 'Beheerder';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = Role::where('name', 'Beheerder')->first();
        $qrStatus->name = 'Key user';
        $qrStatus->save();
    }
}
