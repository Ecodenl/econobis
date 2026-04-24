<?php

namespace Database\Seeders\Fixed;

use Illuminate\Database\Seeder;

class FixedSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // Basis / onafhankelijke stamdata
            CountriesSeeder::class,
            TitlesSeeder::class,
            LastNamePrefixesSeeder::class,
            PersonTypesSeeder::class,
            OrganisationTypesSeeder::class,
            IndustriesSeeder::class,
            ReasonsSeeder::class,

            // Housing file basis
            BuildingTypesSeeder::class,
            EnergyLabelsSeeder::class,
            EnergyLabelStatusSeeder::class,
            RoofTypesSeeder::class,
            HousingFileSpecificationFloorsSeeder::class,
            HousingFileSpecificationSidesSeeder::class,
            HousingFileSpecificationStatusesSeeder::class,
            HousingFileHoomHousingStatusesSeeder::class,
            HousingFileHoomLinksSeeder::class,

            // Address dongles
            AddressDongleReadOutTypesSeeder::class,
            AddressDongleTypesSeeder::class,

            // Campaign
            CampaignStatusSeeder::class,
            CampaignTypesSeeder::class,

            // Contact import / free fields
            ContactToImportSuppliersSeeder::class,
            FreeFieldsFieldFormatsSeeder::class,
            FreeFieldsTablesSeeder::class,

            // Energy supplier / supply
            EnergySuppliersSeeder::class,
            EnergySupplierStatusSeeder::class,
            EnergySupplierTypeSeeder::class,

            // Financial
            VatCodesSeeder::class,
            LedgersSeeder::class,

            // Opportunity basis
            OpportunityActionsSeeder::class,
            OpportunityEvaluationStatusSeeder::class,
            OpportunityStatusSeeder::class,

            // Measure basis: categories vóór measures
            MeasureCategoriesSeeder::class,
            MeasuresSeeder::class,

            // Intake / sources / tasks
            IntakeStatusSeeder::class,
            SourcesSeeder::class,
            TaskPropertiesSeeder::class,
            TaskTypesSeeder::class,

            // Participant / project basis
            ProjectStatusesSeeder::class,
            ProjectTypesSeeder::class,
            ProjectLoanTypesSeeder::class,
            ProjectRevenueCategoriesSeeder::class,
            ProjectRevenueTypesSeeder::class,
            ParticipantMutationStatusesSeeder::class,
            ParticipantMutationTypesSeeder::class,
            ParticipantProjectPayoutTypesSeeder::class,

            // Portal dashboard: dashboard vóór widgets
            PortalSettingsDashboardsSeeder::class,
            PortalSettingsDashboardWidgetsSeeder::class,

            // Quotation request: na opportunity_actions
            QuotationRequestStatusSeeder::class,

            // Misc
            OccupationsSeeder::class,
        ]);
    }
}