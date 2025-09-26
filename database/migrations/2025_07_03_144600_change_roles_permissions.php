<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ChangeRolesPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Creeer nieuwe permission menu_participation, menu_financial_overviews en manage_financial_overview
        Permission::findOrCreate('menu_participations', 'api');
        Permission::findOrCreate('menu_financial_overviews', 'api');
        Permission::findOrCreate('manage_financial_overview', 'api');
        Permission::findOrCreate('view_marketing', 'api');
        Permission::findOrCreate('view_measure', 'api');
        Permission::findOrCreate('view_quotation_request', 'api');


        // Voeg toe aan 'Beheerder': menu_participation, menu_financial_overviews en manage_financial_overview
        // en Voeg toe : permission view_marketing, view_measure, en view_quotation_request
        $beheerder = Role::findByName('Beheerder');
        if ($beheerder) {
            $beheerder->givePermissionTo('menu_participations');
            $beheerder->givePermissionTo('menu_financial_overviews');
            $beheerder->givePermissionTo('manage_financial_overview');
            $beheerder->givePermissionTo('view_marketing');
            $beheerder->givePermissionTo('view_measure');
            $beheerder->givePermissionTo('view_quotation_request');
        }

        // Verwijder van 'Medewerker': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
        // En verwijder 'view_housing_file', 'view_housing_file_log', 'view_intake' en 'view_opportunity'
        // En verwijder 'view_invoice' en 'view_order'
        $medewerker = Role::findByName('Medewerker');
        if ($medewerker) {
            $medewerker->revokePermissionTo('menu_projects');
            $medewerker->revokePermissionTo('view_project');
            $medewerker->revokePermissionTo('view_participation');
            $medewerker->revokePermissionTo('view_financial_overview');
            $medewerker->revokePermissionTo('menu_energy_saving');
            $medewerker->revokePermissionTo('menu_marketing');
            $medewerker->revokePermissionTo('menu_housing_files');
            $medewerker->revokePermissionTo('menu_intakes');
            $medewerker->revokePermissionTo('menu_opportunities');
            $medewerker->revokePermissionTo('menu_quotation_requests');
            $medewerker->revokePermissionTo('menu_measures');
            $medewerker->revokePermissionTo('view_housing_file');
            $medewerker->revokePermissionTo('view_housing_file_log');
            $medewerker->revokePermissionTo('view_intake');
            $medewerker->revokePermissionTo('view_opportunity');
            $medewerker->revokePermissionTo('view_invoice');
            $medewerker->revokePermissionTo('view_order');
        }

        // Verwijder van 'Medewerker 2': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
        // En verwijder 'view_housing_file', 'view_housing_file_log', 'view_intake' en 'view_opportunity'
        // En verwijder 'view_invoice' en 'view_order'
        $medewerker2 = Role::findByName('Medewerker 2');
        if ($medewerker2) {
            $medewerker2->revokePermissionTo('menu_projects');
            $medewerker2->revokePermissionTo('view_project');
            $medewerker2->revokePermissionTo('view_participation');
            $medewerker2->revokePermissionTo('view_financial_overview');
            $medewerker2->revokePermissionTo('menu_energy_saving');
            $medewerker2->revokePermissionTo('menu_marketing');
            $medewerker2->revokePermissionTo('menu_housing_files');
            $medewerker2->revokePermissionTo('menu_intakes');
            $medewerker2->revokePermissionTo('menu_opportunities');
            $medewerker2->revokePermissionTo('menu_quotation_requests');
            $medewerker2->revokePermissionTo('menu_measures');
            $medewerker2->revokePermissionTo('view_housing_file');
            $medewerker2->revokePermissionTo('view_housing_file_log');
            $medewerker2->revokePermissionTo('view_intake');
            $medewerker2->revokePermissionTo('view_opportunity');
            $medewerker2->revokePermissionTo('view_invoice');
            $medewerker2->revokePermissionTo('view_order');
        }

        // Voeg toe aan 'Projectmanager': permission menu_participation, menu_financial_overviews, manage_project en manage_financial_overview
        // en verwijder menu_energy_saving + submenus
        // En verwijder 'view_housing_file', 'view_housing_file_log', 'view_intake' en 'view_opportunity'
        // En verwijder 'view_invoice' en 'view_order'
        $projectmanager = Role::findByName('Projectmanager');
        if ($projectmanager) {
            $projectmanager->givePermissionTo('menu_participations');
            $projectmanager->givePermissionTo('menu_financial_overviews');
            $projectmanager->givePermissionTo('manage_project');
            $projectmanager->givePermissionTo('manage_financial_overview');
            $projectmanager->revokePermissionTo('menu_energy_saving');
            $projectmanager->revokePermissionTo('menu_marketing');
            $projectmanager->revokePermissionTo('menu_housing_files');
            $projectmanager->revokePermissionTo('menu_intakes');
            $projectmanager->revokePermissionTo('menu_opportunities');
            $projectmanager->revokePermissionTo('menu_quotation_requests');
            $projectmanager->revokePermissionTo('menu_measures');
            $projectmanager->revokePermissionTo('view_housing_file');
            $projectmanager->revokePermissionTo('view_housing_file_log');
            $projectmanager->revokePermissionTo('view_intake');
            $projectmanager->revokePermissionTo('view_opportunity');
            $projectmanager->revokePermissionTo('view_invoice');
            $projectmanager->revokePermissionTo('view_order');
        }

        // Verwijder van 'Financieel medewerker': permission menu_projects, view_project, manage_participation, view_participation, view_financial_overview en menu_energy_saving + submenus
        // En verwijder 'view_housing_file', 'view_housing_file_log', 'view_intake' en 'view_opportunity'
        $financieelMedewerker = Role::findByName('Financieel medewerker');
        if ($financieelMedewerker) {
            $financieelMedewerker->revokePermissionTo('menu_projects');
            $financieelMedewerker->revokePermissionTo('view_project');
            $financieelMedewerker->revokePermissionTo('manage_participation');
            $financieelMedewerker->revokePermissionTo('view_participation');
            $financieelMedewerker->revokePermissionTo('view_financial_overview');
            $financieelMedewerker->revokePermissionTo('menu_energy_saving');
            $financieelMedewerker->revokePermissionTo('menu_marketing');
            $financieelMedewerker->revokePermissionTo('menu_housing_files');
            $financieelMedewerker->revokePermissionTo('menu_intakes');
            $financieelMedewerker->revokePermissionTo('menu_opportunities');
            $financieelMedewerker->revokePermissionTo('menu_quotation_requests');
            $financieelMedewerker->revokePermissionTo('menu_measures');
            $financieelMedewerker->revokePermissionTo('view_housing_file');
            $financieelMedewerker->revokePermissionTo('view_housing_file_log');
            $financieelMedewerker->revokePermissionTo('view_intake');
            $financieelMedewerker->revokePermissionTo('view_opportunity');
        }

        // Verwijder van 'Financieel controller': permission manage_project, menu_projects, view_project, manage_participation, view_participation, view_financial_overview en menu_energy_saving + submenus
        // En verwijder 'view_housing_file', 'view_housing_file_log', 'view_intake' en 'view_opportunity'
        $financieelController = Role::findByName('Financieel controller');
        if ($financieelController) {
            $financieelController->revokePermissionTo('manage_project');
            $financieelController->revokePermissionTo('menu_projects');
            $financieelController->revokePermissionTo('view_project');
            $financieelController->revokePermissionTo('manage_participation');
            $financieelController->revokePermissionTo('view_participation');
            $financieelController->revokePermissionTo('view_financial_overview');
            $financieelController->revokePermissionTo('menu_energy_saving');
            $financieelController->revokePermissionTo('menu_marketing');
            $financieelController->revokePermissionTo('menu_housing_files');
            $financieelController->revokePermissionTo('menu_intakes');
            $financieelController->revokePermissionTo('menu_opportunities');
            $financieelController->revokePermissionTo('menu_quotation_requests');
            $financieelController->revokePermissionTo('menu_measures');
            $financieelController->revokePermissionTo('view_housing_file');
            $financieelController->revokePermissionTo('view_housing_file_log');
            $financieelController->revokePermissionTo('view_intake');
            $financieelController->revokePermissionTo('view_opportunity');
        }

        // Verwijder van 'Participatie medewerker': permission manage_project, view_project en menu_energy_saving + submenus
        // en Voeg toe : permission menu_participation en menu_financial_overviews
        // En verwijder 'view_housing_file', 'view_housing_file_log', 'view_intake' en 'view_opportunity'
        // En verwijder 'view_invoice' en 'view_order'
        $participatieMedewerker = Role::findByName('Participatie medewerker');
        if ($participatieMedewerker) {
            $participatieMedewerker->givePermissionTo('menu_participations');
            $participatieMedewerker->givePermissionTo('menu_financial_overviews');
            $participatieMedewerker->revokePermissionTo('manage_project');
            $participatieMedewerker->revokePermissionTo('menu_energy_saving');
            $participatieMedewerker->revokePermissionTo('menu_marketing');
            $participatieMedewerker->revokePermissionTo('menu_housing_files');
            $participatieMedewerker->revokePermissionTo('menu_intakes');
            $participatieMedewerker->revokePermissionTo('menu_opportunities');
            $participatieMedewerker->revokePermissionTo('menu_quotation_requests');
            $participatieMedewerker->revokePermissionTo('menu_measures');
            $participatieMedewerker->revokePermissionTo('view_housing_file');
            $participatieMedewerker->revokePermissionTo('view_housing_file_log');
            $participatieMedewerker->revokePermissionTo('view_intake');
            $participatieMedewerker->revokePermissionTo('view_opportunity');
            $participatieMedewerker->revokePermissionTo('view_invoice');
            $participatieMedewerker->revokePermissionTo('view_order');
        }

        // Verwijder van 'Energie adviseur': permission menu_projects, view_project, view_participation en view_financial_overview
        // en Voeg toe : permission view_marketing, view_measure, en view_quotation_request
        // En verwijder 'view_invoice' en 'view_order'
        $energieAdviseur = Role::findByName('Energie adviseur');
        if ($energieAdviseur) {
            $energieAdviseur->revokePermissionTo('menu_projects');
            $energieAdviseur->revokePermissionTo('view_project');
            $energieAdviseur->revokePermissionTo('view_participation');
            $energieAdviseur->revokePermissionTo('view_financial_overview');
            $energieAdviseur->givePermissionTo('view_marketing');
            $energieAdviseur->givePermissionTo('view_measure');
            $energieAdviseur->givePermissionTo('view_quotation_request');
            $energieAdviseur->revokePermissionTo('view_invoice');
            $energieAdviseur->revokePermissionTo('view_order');
        }

        // Verwijder van 'Marketing medewerker': permission menu_projects, view_project, view_participation en view_financial_overview
        // en Voeg toe : permission view_marketing, view_measure, en view_quotation_request
        // En verwijder 'view_invoice' en 'view_order'
        $marketingMedewerker = Role::findByName('Marketing medewerker');
        if ($marketingMedewerker) {
            $marketingMedewerker->revokePermissionTo('menu_projects');
            $marketingMedewerker->revokePermissionTo('view_project');
            $marketingMedewerker->revokePermissionTo('view_participation');
            $marketingMedewerker->revokePermissionTo('view_financial_overview');
            $marketingMedewerker->givePermissionTo('view_marketing');
            $marketingMedewerker->givePermissionTo('view_measure');
            $marketingMedewerker->givePermissionTo('view_quotation_request');
            $marketingMedewerker->revokePermissionTo('view_invoice');
            $marketingMedewerker->revokePermissionTo('view_order');
        }

        // Voeg toe aan 'Buurtaanpak manager' : permission view_marketing, view_measure, en view_quotation_request
        $buurtaanpakManager = Role::findByName('Buurtaanpak manager');
        if ($buurtaanpakManager) {
            $buurtaanpakManager->givePermissionTo('view_marketing');
            $buurtaanpakManager->givePermissionTo('view_measure');
            $buurtaanpakManager->givePermissionTo('view_quotation_request');
        }
        // Voeg toe aan 'Buurtaanpak coördinator' : permission view_marketing, view_measure, en view_quotation_request
        $buurtaanpakCoordinator = Role::findByName('Buurtaanpak coördinator');
        if ($buurtaanpakCoordinator) {
            $buurtaanpakCoordinator->givePermissionTo('view_marketing');
            $buurtaanpakCoordinator->givePermissionTo('view_measure');
            $buurtaanpakCoordinator->givePermissionTo('view_quotation_request');
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        // Verwijder van 'Beheerder': menu_participation, menu_financial_overviews en manage_financial_overview
        $beheerder = Role::findByName('Beheerder');
        if ($beheerder) {
            $beheerder->revokePermissionTo('menu_participations');
            $beheerder->revokePermissionTo('menu_financial_overviews');
            $beheerder->revokePermissionTo('manage_financial_overview');
        }

        // Voeg terug toe aan 'Medewerker': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
        // En voeg terug toe: 'view_invoice' en 'view_order'
        $medewerker = Role::findByName('Medewerker');
        if ($medewerker) {
            $medewerker->givePermissionTo('menu_projects');
            $medewerker->givePermissionTo('view_project');
            $medewerker->givePermissionTo('view_participation');
            $medewerker->givePermissionTo('view_financial_overview');
            $medewerker->givePermissionTo('menu_energy_saving');
            $medewerker->givePermissionTo('menu_marketing');
            $medewerker->givePermissionTo('menu_housing_files');
            $medewerker->givePermissionTo('menu_intakes');
            $medewerker->givePermissionTo('menu_opportunities');
            $medewerker->givePermissionTo('menu_quotation_requests');
            $medewerker->givePermissionTo('menu_measures');
            $medewerker->givePermissionTo('view_invoice');
            $medewerker->givePermissionTo('view_order');
        }

        // Voeg terug toe aan 'Medewerker 2': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
        // En voeg terug toe: 'view_invoice' en 'view_order'
        $medewerker2 = Role::findByName('Medewerker 2');
        if ($medewerker2) {
            $medewerker2->givePermissionTo('menu_projects');
            $medewerker2->givePermissionTo('view_project');
            $medewerker2->givePermissionTo('view_participation');
            $medewerker2->givePermissionTo('view_financial_overview');
            $medewerker2->givePermissionTo('menu_energy_saving');
            $medewerker2->givePermissionTo('menu_marketing');
            $medewerker2->givePermissionTo('menu_housing_files');
            $medewerker2->givePermissionTo('menu_intakes');
            $medewerker2->givePermissionTo('menu_opportunities');
            $medewerker2->givePermissionTo('menu_quotation_requests');
            $medewerker2->givePermissionTo('menu_measures');
            $medewerker2->givePermissionTo('view_invoice');
            $medewerker2->givePermissionTo('view_order');
        }

        // Verwijder van 'Projectmanager': permission menu_participation, menu_financial_overviews, manage_project en manage_financial_overview
        // en voeg terug toe: menu_energy_saving + submenus
        // En voeg terug toe: 'view_invoice' en 'view_order'
        $projectmanager = Role::findByName('Projectmanager');
        if ($projectmanager) {
            $projectmanager->revokePermissionTo('menu_participations');
            $projectmanager->revokePermissionTo('menu_financial_overviews');
            $projectmanager->revokePermissionTo('manage_project');
            $projectmanager->revokePermissionTo('manage_financial_overview');
            $projectmanager->givePermissionTo('menu_energy_saving');
            $projectmanager->givePermissionTo('menu_marketing');
            $projectmanager->givePermissionTo('menu_housing_files');
            $projectmanager->givePermissionTo('menu_intakes');
            $projectmanager->givePermissionTo('menu_opportunities');
            $projectmanager->givePermissionTo('menu_quotation_requests');
            $projectmanager->givePermissionTo('menu_measures');
            $projectmanager->givePermissionTo('view_invoice');
            $projectmanager->givePermissionTo('view_order');
        }

        // Voeg terug toe aan 'Financieel medewerker': permission menu_projects, view_project, manage_participation, view_participation, view_financial_overview en menu_energy_saving + submenus
        $financieelMedewerker = Role::findByName('Financieel medewerker');
        if ($financieelMedewerker) {
            $financieelMedewerker->givePermissionTo('menu_projects');
            $financieelMedewerker->givePermissionTo('view_project');
            $financieelMedewerker->givePermissionTo('manage_participation');
            $financieelMedewerker->givePermissionTo('view_participation');
            $financieelMedewerker->givePermissionTo('view_financial_overview');
            $financieelMedewerker->givePermissionTo('menu_energy_saving');
            $financieelMedewerker->givePermissionTo('menu_marketing');
            $financieelMedewerker->givePermissionTo('menu_housing_files');
            $financieelMedewerker->givePermissionTo('menu_intakes');
            $financieelMedewerker->givePermissionTo('menu_opportunities');
            $financieelMedewerker->givePermissionTo('menu_quotation_requests');
            $financieelMedewerker->givePermissionTo('menu_measures');
        }

        // Voeg terug toe aan 'Financieel controller': permission manage_project, menu_projects, view_project, manage_participation, view_participation, view_financial_overview en menu_energy_saving + submenus
        $financieelController = Role::findByName('Financieel controller');
        if ($financieelController) {
            $financieelController->givePermissionTo('manage_project');
            $financieelController->givePermissionTo('menu_projects');
            $financieelController->givePermissionTo('view_project');
            $financieelController->givePermissionTo('manage_participation');
            $financieelController->givePermissionTo('view_participation');
            $financieelController->givePermissionTo('view_financial_overview');
            $financieelController->givePermissionTo('menu_energy_saving');
            $financieelController->givePermissionTo('menu_marketing');
            $financieelController->givePermissionTo('menu_housing_files');
            $financieelController->givePermissionTo('menu_intakes');
            $financieelController->givePermissionTo('menu_opportunities');
            $financieelController->givePermissionTo('menu_quotation_requests');
            $financieelController->givePermissionTo('menu_measures');
        }

        // Voeg terug toe aan 'Participatie medewerker': permission manage_project en menu_energy_saving + submenus
        // En voeg terug toe: 'view_invoice' en 'view_order'
        $participatieMedewerker = Role::findByName('Participatie medewerker');
        if ($participatieMedewerker) {
            $participatieMedewerker->givePermissionTo('manage_project');
            $participatieMedewerker->givePermissionTo('menu_energy_saving');
            $participatieMedewerker->givePermissionTo('menu_marketing');
            $participatieMedewerker->givePermissionTo('menu_housing_files');
            $participatieMedewerker->givePermissionTo('menu_intakes');
            $participatieMedewerker->givePermissionTo('menu_opportunities');
            $participatieMedewerker->givePermissionTo('menu_quotation_requests');
            $participatieMedewerker->givePermissionTo('menu_measures');
            $participatieMedewerker->givePermissionTo('view_invoice');
            $participatieMedewerker->givePermissionTo('view_order');
        }

        // Voeg terug toe aan 'Energie adviseur': permission menu_projects, view_project, view_participation en view_financial_overview
        // En voeg terug toe: 'view_invoice' en 'view_order'
        $energieAdviseur = Role::findByName('Energie adviseur');
        if ($energieAdviseur) {
            $energieAdviseur->givePermissionTo('menu_projects');
            $energieAdviseur->givePermissionTo('view_project');
            $energieAdviseur->givePermissionTo('view_participation');
            $energieAdviseur->givePermissionTo('view_financial_overview');
            $energieAdviseur->givePermissionTo('view_invoice');
            $energieAdviseur->givePermissionTo('view_order');
        }

        // Voeg terug toe aan 'Marketing medewerker': permission menu_projects, view_project, view_participation en view_financial_overview
        // En voeg terug toe: 'view_invoice' en 'view_order'
        $marketingMedewerker = Role::findByName('Marketing medewerker');
        if ($marketingMedewerker) {
            $marketingMedewerker->givePermissionTo('menu_projects');
            $marketingMedewerker->givePermissionTo('view_project');
            $marketingMedewerker->givePermissionTo('view_participation');
            $marketingMedewerker->givePermissionTo('view_financial_overview');
            $marketingMedewerker->givePermissionTo('view_invoice');
            $marketingMedewerker->givePermissionTo('view_order');
        }


    }
}
