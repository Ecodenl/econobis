<?php

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
        factory(\App\Eco\Campaign\Campaign::class, 10)
            ->create()
            ->each(function ($campaign) {
                factory(\App\Eco\Campaign\CampaignResponse::class, random_int(0, 3))
                    ->create([
                        'campaign_id' => $campaign->id,
                    ]);

                $campaign->measures()->sync(
                    \App\Eco\Measure\Measure::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                );

                $campaign->organisations()->sync(
                    \App\Eco\Organisation\Organisation::inRandomOrder()
                        ->limit(random_int(0, 3))
                        ->get()
                );

            });
    }
}
