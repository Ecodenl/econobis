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
            DocumentCreatedFromsSeeder::class,

            // Housing file basis
            BuildingTypesSeeder::class,
            EnergyLabelsSeeder::class,
            EnergyLabelStatusesSeeder::class,
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
            CampaignStatusesSeeder::class,
            CampaignTypesSeeder::class,

            // Contact import / free fields
            ContactToImportSuppliersSeeder::class,
            FreeFieldsFieldFormatsSeeder::class,
            FreeFieldsTablesSeeder::class,

            // Energy supplier / supply
            EnergySuppliersSeeder::class,
            EnergySupplierStatusesSeeder::class,
            EnergySupplierTypesSeeder::class,

            // Financial
            VatCodesSeeder::class,
            LedgersSeeder::class,

            // Opportunity basis
            OpportunityActionsSeeder::class,
            OpportunityEvaluationStatusSeeder::class,
            OpportunityStatusesSeeder::class,

            // Measure basis: categories vóór measures
            MeasureCategoriesSeeder::class,
            MeasuresSeeder::class,

            // Intake / sources / tasks
            IntakeStatusesSeeder::class,
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
            PortalSettingsSeeder::class,
            PortalSettingsDashboardsSeeder::class,
            PortalSettingsDashboardWidgetsSeeder::class,

            // Quotation request: na opportunity_actions
            QuotationRequestStatusesSeeder::class,

            // Misc
            OccupationsSeeder::class,

            // Permissions / Roles / AdminUsers / Cooperations / CooperationCleanupItems
            PermissionsSeeder::class,
            RolesSeeder::class,
            RolePermissionsSeeder::class,
            AdminUsersSeeder::class,
            CooperationsSeeder::class,
            CooperationCleanupItemsSeeder::class,
        ]);
    }
}