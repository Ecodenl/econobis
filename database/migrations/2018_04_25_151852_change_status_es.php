<?php

use App\Eco\Campaign\CampaignType;
use App\Eco\Task\TaskType;
use Illuminate\Database\Migrations\Migration;

class ChangeStatusEs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $cess = \App\Eco\EnergySupplier\ContactEnergySupplierStatus::where('name', 'Geïntresseerd')->first();
        $cess->name = 'Geïnteresseerd';
        $cess->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
