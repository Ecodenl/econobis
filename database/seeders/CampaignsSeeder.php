<?php

namespace Database\Seeders;

use App\Eco\Campaign\Campaign;
use App\Eco\Campaign\CampaignResponse;
use App\Eco\Measure\Measure;
use App\Eco\Organisation\Organisation;
use Illuminate\Database\Seeder;

class CampaignsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Campaign::class, 10)
            ->create()
            ->each(function ($campaign) {
                factory(CampaignResponse::class, random_int(0, 3))
                    ->create([
                        'campaign_id' => $campaign->id,
                    ]);

                $campaign->measures()->sync(
                    Measure::inRandomOrder()
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
