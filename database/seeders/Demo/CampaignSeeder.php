<?php

namespace Database\Seeders\Demo;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\Measure\MeasureCategory;
use App\Eco\Organisation\Organisation;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Campaign::factory()->count(10)
            ->create()
            ->each(function ($campaign) {
                CampaignResponse::factory()->count(random_int(0, 3))
                    ->create([
                        'campaign_id' => $campaign->id,
                    ]);

                $campaign->measureCategories()->sync(
                    MeasureCategory::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                );

                $campaign->organisations()->sync(
                    Organisation::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                );

            });
    }
}
