<?php

namespace Database\Seeders\Fixed;

use App\Eco\Opportunity\OpportunityEvaluationStatus;
use Illuminate\Database\Seeder;

class OpportunityEvaluationStatusSeeder extends Seeder
{
    public function run(): void
    {
        $opportunityEvaluationStatuses = [
            ['id' => 1, 'name' => 'Onbekend'],
            ['id' => 2, 'name' => 'Ja'],
            ['id' => 3, 'name' => 'Nee'],
        ];

        foreach ($opportunityEvaluationStatuses as $opportunityEvaluationStatus) {
            OpportunityEvaluationStatus::updateOrCreate(
                ['id' => $opportunityEvaluationStatus['id']],
                $opportunityEvaluationStatus
            );
        }
    }
}