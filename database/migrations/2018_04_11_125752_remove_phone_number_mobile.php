<?php

use App\Eco\Campaign\CampaignType;
use App\Eco\Task\TaskType;
use Illuminate\Database\Migrations\Migration;

class RemovePhoneNumberMobile extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $phoneNumbers = \App\Eco\PhoneNumber\PhoneNumber::where('type_id', 'mobile')->withTrashed()->get();

        foreach ($phoneNumbers as $number){
            $number->type_id = 'home';
            $number->save();
        }
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
