<?php

namespace Database\Seeders\Fixed;

use App\Eco\Opportunity\OpportunityAction;
use Illuminate\Database\Seeder;

class OpportunityActionsSeeder extends Seeder
{
    public function run(): void
    {
        OpportunityAction::upsert([
            ['name' => 'Offerteverzoek', 'code_ref' => 'quotation-request'],
            ['name' => 'Bezoek', 'code_ref' => 'visit'],
            ['name' => 'Budgetaanvraag', 'code_ref' => 'subsidy-request'],
            ['name' => 'Doorverwijzing', 'code_ref' => 'redirection'],
        ], ['code_ref'], ['name']);
    }
}