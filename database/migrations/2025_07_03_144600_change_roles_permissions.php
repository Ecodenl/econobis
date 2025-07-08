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

        // Voeg toe aan 'Beheerder': menu_participation, menu_financial_overviews en manage_financial_overview
        $beheerder = Role::findByName('Beheerder');
        if ($beheerder) {
            $beheerder->givePermissionTo('menu_participations');
            $beheerder->givePermissionTo('menu_financial_overviews');
            $beheerder->givePermissionTo('manage_financial_overview');
        }

        // Verwijder van 'Medewerker': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
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
        }

        // Verwijder van 'Medewerker 2': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
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
        }

        // Voeg toe aan 'Projectmanager': permission menu_participation, menu_financial_overviews, manage_project en manage_financial_overview
        // en verwijder menu_energy_saving + submenus
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
        }

        // Verwijder van 'Financieel medewerker': permission menu_projects, view_project, manage_participation, view_participation, view_financial_overview en menu_energy_saving + submenus
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
        }

        // Verwijder van 'Financieel controller': permission manage_project, menu_projects, view_project, manage_participation, view_participation, view_financial_overview en menu_energy_saving + submenus
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
        }

        // Verwijder van 'Participatie medewerker': permission manage_project, view_project en menu_energy_saving + submenus
        // en Voeg toe aan : permission menu_participation
        $participatieMedewerker = Role::findByName('Participatie medewerker');
        if ($participatieMedewerker) {
            $participatieMedewerker->givePermissionTo('menu_participations');
            $participatieMedewerker->revokePermissionTo('manage_project');
            $participatieMedewerker->revokePermissionTo('menu_energy_saving');
            $participatieMedewerker->revokePermissionTo('menu_marketing');
            $participatieMedewerker->revokePermissionTo('menu_housing_files');
            $participatieMedewerker->revokePermissionTo('menu_intakes');
            $participatieMedewerker->revokePermissionTo('menu_opportunities');
            $participatieMedewerker->revokePermissionTo('menu_quotation_requests');
            $participatieMedewerker->revokePermissionTo('menu_measures');
        }

        // Verwijder van 'Energie adviseur': permission menu_projects, view_project, view_participation en view_financial_overview
        $energieAdviseur = Role::findByName('Energie adviseur');
        if ($energieAdviseur) {
            $energieAdviseur->revokePermissionTo('menu_projects');
            $energieAdviseur->revokePermissionTo('view_project');
            $energieAdviseur->revokePermissionTo('view_participation');
            $energieAdviseur->revokePermissionTo('view_financial_overview');
        }

        // Verwijder van 'Marketing medewerker': permission menu_projects, view_project, view_participation en view_financial_overview
        $marketingMedewerker = Role::findByName('Marketing medewerker');
        if ($marketingMedewerker) {
            $marketingMedewerker->revokePermissionTo('menu_projects');
            $marketingMedewerker->revokePermissionTo('view_project');
            $marketingMedewerker->revokePermissionTo('view_participation');
            $marketingMedewerker->revokePermissionTo('view_financial_overview');
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
        }

        // Voeg terug toe aan 'Medewerker 2': permission menu_projects, view_project, view_participation, view_financial_overview en menu_energy_saving + submenus
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
        }

        // Verwijder van 'Projectmanager': permission menu_participation, menu_financial_overviews, manage_project en manage_financial_overview
        // en voeg terug toe: menu_energy_saving + submenus
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
        }

        // Voeg terug toe aan 'Energie adviseur': permission menu_projects, view_project, view_participation en view_financial_overview
        $energieAdviseur = Role::findByName('Energie adviseur');
        if ($energieAdviseur) {
            $energieAdviseur->givePermissionTo('menu_projects');
            $energieAdviseur->givePermissionTo('view_project');
            $energieAdviseur->givePermissionTo('view_participation');
            $energieAdviseur->givePermissionTo('view_financial_overview');
        }

        // Voeg terug toe aan 'Marketing medewerker': permission menu_projects, view_project, view_participation en view_financial_overview
        $marketingMedewerker = Role::findByName('Marketing medewerker');
        if ($marketingMedewerker) {
            $marketingMedewerker->givePermissionTo('menu_projects');
            $marketingMedewerker->givePermissionTo('view_project');
            $marketingMedewerker->givePermissionTo('view_participation');
            $marketingMedewerker->givePermissionTo('view_financial_overview');
        }


    }
}
