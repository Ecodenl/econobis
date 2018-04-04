<?php

use App\Eco\Campaign\CampaignType;
use App\Eco\Task\TaskType;
use Illuminate\Database\Migrations\Migration;

class TextualChanges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $campaignType = CampaignType::where('name', 'Email')->first();
        $campaignType->name = 'E-mail';
        $campaignType->save();

        $taskType = TaskType::where('name', 'Email')->first();
        $taskType->name = 'E-mail';
        $taskType->save();

        $taskType2 = TaskType::where('name', 'Contact moment')->first();
        $taskType2->name = 'Contactmoment';
        $taskType2->save();
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
