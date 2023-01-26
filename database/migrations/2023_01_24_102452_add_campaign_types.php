<?php

use App\Eco\Campaign\CampaignType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCampaignTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $qrStatus = CampaignType::where('name', 'Wijkaanpak')->first();
        $qrStatus->name = 'Buurtaanpak';
        $qrStatus->save();

        $qrStatus = CampaignType::where('name', 'Internet')->first();
        $qrStatus->name = 'Internet/digitaal';
        $qrStatus->save();

        $qrStatus = new CampaignType();
        $qrStatus->name = 'Subsidie';
        $qrStatus->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $qrStatus = CampaignType::where('name', 'Buurtaanpak')->first();
        $qrStatus->name = 'Wijkaanpak';
        $qrStatus->save();

        $qrStatus = CampaignType::where('name', 'Internet/digitaal')->first();
        $qrStatus->name = 'Internet';
        $qrStatus->save();

        $qrStatus = new CampaignType();
        $qrStatus->name = 'Subsidie';
        $qrStatus->delete();
    }
}
