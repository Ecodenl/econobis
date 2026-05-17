<?php

namespace Database\Seeders\Fixed;

use App\Eco\HousingFile\HousingFileHoomLink;
use Illuminate\Database\Seeder;

class HousingFileHoomLinksSeeder extends Seeder
{
    public function run(): void
    {
        $housingFileHoomLinks = [
            ['external_hoom_short_name' => 'surface', 'econobis_field_name' => 'surface', 'housing_file_data_type' => 'B', 'label' => 'Gebruiksoppervlakte', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'roof-type', 'econobis_field_name' => 'roof_type_id', 'housing_file_data_type' => 'B', 'label' => 'Daktype', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'building-layers', 'econobis_field_name' => 'floors', 'housing_file_data_type' => 'B', 'label' => 'Aantal bouwlagen', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'wall-surface', 'econobis_field_name' => 'wall_surface', 'housing_file_data_type' => 'B', 'label' => 'Geveloppervlakte', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'total-window-surface', 'econobis_field_name' => 'total_window_surface', 'housing_file_data_type' => 'B', 'label' => 'Raamoppervlakte', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'frame-type', 'econobis_field_name' => 'frame_type', 'housing_file_data_type' => 'B', 'label' => 'Kozijntype', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'floor-surface', 'econobis_field_name' => 'floor_surface', 'housing_file_data_type' => 'B', 'label' => 'Vloeroppervlakte', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'pitched-roof-surface', 'econobis_field_name' => 'pitched_roof_surface', 'housing_file_data_type' => 'B', 'label' => 'Hellend dakoppervlakte', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'flat-roof-surface', 'econobis_field_name' => 'flat_roof_surface', 'housing_file_data_type' => 'B', 'label' => 'Platte dakoppervlakte', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'cook-type', 'econobis_field_name' => 'cook_type', 'housing_file_data_type' => 'B', 'label' => 'Manier koken', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'heat-source', 'econobis_field_name' => 'heat_source', 'housing_file_data_type' => 'B', 'label' => 'Verwarming', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'monument', 'econobis_field_name' => 'is_monument', 'housing_file_data_type' => 'B', 'label' => 'Monument', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'building-contract-type', 'econobis_field_name' => 'is_house_for_sale', 'housing_file_data_type' => 'B', 'label' => 'Koophuis', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'energy-label', 'econobis_field_name' => 'energy_label_id', 'housing_file_data_type' => 'B', 'label' => 'Energielabel', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'building-type-category', 'econobis_field_name' => 'building_type_id', 'housing_file_data_type' => 'B', 'label' => 'Woningtype', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'build-year', 'econobis_field_name' => 'build_year', 'housing_file_data_type' => 'B', 'label' => 'Bouwjaar', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'energy-label-status', 'econobis_field_name' => 'energy_label_status_id', 'housing_file_data_type' => 'B', 'label' => 'Status energielabel', 'import_from_hoom' => 0, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'revenue-solar-panels', 'econobis_field_name' => 'revenue_solar_panels', 'housing_file_data_type' => 'B', 'label' => 'Opbrengst zonnepanelen', 'import_from_hoom' => 0, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'pitched-roof-heating', 'econobis_field_name' => 'pitched_roof_heating', 'housing_file_data_type' => 'G', 'label' => 'Hellend dak ruimtes verwarming', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'flat-roof-heating', 'econobis_field_name' => 'flat_roof_heating', 'housing_file_data_type' => 'G', 'label' => 'Platte dak ruimtes verwarming', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'hr3p-glass-frame-current-glass', 'econobis_field_name' => 'hr3p_glass_frame_current_glass', 'housing_file_data_type' => 'G', 'label' => 'hr3p glaslijst (huidig)', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'glass-in-lead-replace-rooms-heated', 'econobis_field_name' => 'glass_in_lead_replace_rooms_heated', 'housing_file_data_type' => 'G', 'label' => 'Kamers verwarmd (met Glas-in-lood ramen)', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'resident-count', 'econobis_field_name' => 'number_of_residents', 'housing_file_data_type' => 'G', 'label' => 'Aantal bewoners', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'water-comfort', 'econobis_field_name' => 'water_comfort', 'housing_file_data_type' => 'B', 'label' => 'Water comfort', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'woz_value', 'econobis_field_name'=> 'woz_value', 'housing_file_data_type'=> 'B', 'label' => 'Woz waarde', 'import_from_hoom'=> 0, 'visible_in_econobis'=> 1],
            ['external_hoom_short_name' => 'boiler-setting-comfort-heat', 'econobis_field_name' => 'boiler_setting_comfort_heat', 'housing_file_data_type' => 'G', 'label' => 'Stooktemperatuur', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'amount-gas', 'econobis_field_name' => 'amount_gas', 'housing_file_data_type' => 'G', 'label' => 'Verbruik gas', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'amount-electricity', 'econobis_field_name' => 'amount_electricity', 'housing_file_data_type' => 'G', 'label' => 'Verbruik elektriciteit', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'current-wall-insulation', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Status muurisolatie', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'current-floor-insulation', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Status vloerisolatie', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'current-roof-insulation', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Status dakisolatie', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'current-living-rooms-windows', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Status glasisolatie woon', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'current-sleeping-rooms-windows', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Status glasisolatie slaap', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'heat-source-warm-tap-water', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Warmtapwater', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'building-heating-application', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Warmtesysteem', 'import_from_hoom' => 1, 'visible_in_econobis' => 0],
            ['external_hoom_short_name' => 'ventilation-type', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Type ventilatie', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'crack-sealing-type', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Status kierdichting', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'has-cavity-wall', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Spouwmuur', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
            ['external_hoom_short_name' => 'has-solar-panels', 'econobis_field_name' => NULL, 'housing_file_data_type' => 'W', 'label' => 'Zonnepanelen', 'import_from_hoom' => 1, 'visible_in_econobis' => 1],
        ];

        foreach ($housingFileHoomLinks as $housingFileHoomLink) {
            HousingFileHoomLink::updateOrCreate(
                ['external_hoom_short_name' => $housingFileHoomLink['external_hoom_short_name']],
                $housingFileHoomLink
            );
        }
    }
}