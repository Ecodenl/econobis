<?php

namespace Database\Seeders\Fixed;

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Seeder;

class OpportunityActionsSeeder extends Seeder
{
    public function run(): void
    {
        $opportunityActions = [
            ['name' => 'Offerteverzoek', 'code_ref' => 'quotation-request'],
            ['name' => 'Bezoek', 'code_ref' => 'visit'],
            ['name' => 'Budgetaanvraag', 'code_ref' => 'subsidy-request'],
            ['name' => 'Doorverwijzing', 'code_ref' => 'redirection'],
        ];

        foreach ($opportunityActions as $opportunityAction) {
            OpportunityAction::updateOrCreate(
                ['code_ref' => $opportunityAction['code_ref']],
                $opportunityAction
            );
        }
    }
}