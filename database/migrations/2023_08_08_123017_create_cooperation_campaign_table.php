<?php

use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationHoomCampaign;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class CreateCooperationCampaignTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('cooperation_hoom_campaigns');
        Schema::create('cooperation_hoom_campaigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('cooperation_id');
            $table->foreign('cooperation_id')->references('id')->on('cooperations');
            $table->unsignedInteger('campaign_id');
            $table->foreign('campaign_id')->references('id')->on('campaigns');
            $table->unsignedInteger('measure_id')->nullable();
            $table->foreign('measure_id')->references('id')->on('measures');
            $table->timestamps();
        });

        $cooperation = Cooperation::first();
        if($cooperation && $cooperation->hoom_campaign_id){
            DB::table('cooperation_hoom_campaigns')->insert([
                    'cooperation_id' => $cooperation->id,
                    'campaign_id' => $cooperation->hoom_campaign_id,
                    'measure_id' => null,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]
            );
        }
        if (Schema::hasColumn('cooperations', 'hoom_campaign_id'))
        {
            Schema::table('cooperations', function (Blueprint $table) {
                $table->dropForeign(['hoom_campaign_id']);
                $table->dropColumn('hoom_campaign_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cooperations', function (Blueprint $table) {
            $table->integer('hoom_campaign_id')->unsigned()->nullable()->after('hoom_key');;
            $table->foreign('hoom_campaign_id')->references('id')->on('campaigns');
        });

        $cooperationHoomCampaigns = CooperationHoomCampaign::first();
        if($cooperationHoomCampaigns){
            DB::table('cooperations')
                ->where('id', $cooperationHoomCampaigns->cooperation_id)
                ->update(['hoom_campaign_id' => $cooperationHoomCampaigns->campaign_id]);
        }
        Schema::dropIfExists('cooperation_hoom_campaigns');
    }
}
