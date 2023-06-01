<?php

use App\Eco\HousingFile\BuildingType;
use App\Eco\HousingFile\EnergyLabel;
use App\Eco\HousingFile\HousingFileSpecificationStatus;
use App\Eco\HousingFile\RoofType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

class AddNewFieldsMarch2023ToHousingFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('housing_files', function (Blueprint $table) {
            $table->float('surface')->nullable()->change();
            $table->integer('hoom_building_id')->nullable(true)->after('remark');
            $table->string('wall_surface')->nullable(true)->after('hoom_building_id');
            $table->string('total_window_surface')->nullable(true)->after('wall_surface');
            $table->string('frame_type')->nullable(true)->after('total_window_surface');
            $table->string('floor_surface')->nullable(true)->after('frame_type');
            $table->string('pitched_roof_surface')->nullable(true)->after('floor_surface');
            $table->string('flat_roof_surface')->nullable(true)->after('pitched_roof_surface');
            $table->string('cook_type')->nullable(true)->after('flat_roof_surface');
            $table->string('heat_source')->nullable(true)->after('cook_type');
            $table->string('water_comfort')->nullable(true)->after('heat_source');
            $table->string('boiler_setting_comfort_heat')->nullable(true)->after('water_comfort');
            $table->string('pitched_roof_heating')->nullable(true)->after('boiler_setting_comfort_heat');
            $table->string('flat_roof_heating')->nullable(true)->after('pitched_roof_heating');
            $table->string('hr3p_glass_frame_current_glass')->nullable(true)->after('flat_roof_heating');
            $table->string('glass_in_lead_replace_rooms_heated')->nullable(true)->after('hr3p_glass_frame_current_glass');
            $table->string('amount_gas')->nullable(true)->after('glass_in_lead_replace_rooms_heated');
            $table->string('amount_electricity')->nullable(true)->after('amount_gas');
        });

        Schema::table('housing_file_specifications', function (Blueprint $table) {
            $table->string('external_hoom_name')->nullable(true)->after('status_id');
            $table->string('type_of_execution', 1)->nullable(true)->after('external_hoom_name');
            $table->double('savings_gas', 11, 0)->nullable(true)->after('type_of_execution');
            $table->double('savings_electricity', 11, 0)->nullable(true)->after('savings_gas');
            $table->double('co2_savings', 11, 0)->nullable(true)->after('savings_electricity');
        });

        Schema::table('housing_file_specification_statuses', function (Blueprint $table) {
            $table->string('code_ref')->nullable(true)->after('name');
            $table->integer('order')->nullable(true)->after('code_ref');
        });

        foreach (HousingFileSpecificationStatus::all() as $housingFileSpecificationStatus){
            switch ($housingFileSpecificationStatus->id){
                case 1:                                             // Gewenst
                    $housingFileSpecificationStatus->code_ref = 'desirable';
                    $housingFileSpecificationStatus->order = 1;
                    $housingFileSpecificationStatus->save();
                    break;
                case 2:                                             // Wordt gerealiseerd
                    $housingFileSpecificationStatus->code_ref = 'is_realized';
                    $housingFileSpecificationStatus->order = 3;
                    $housingFileSpecificationStatus->save();
                    break;
                case 3:                                             // Aanwezig
                    $housingFileSpecificationStatus->code_ref = 'present';
                    $housingFileSpecificationStatus->order = 4;
                    $housingFileSpecificationStatus->save();
                    break;
                case 4:                                             // Onbekend
                    $housingFileSpecificationStatus->code_ref = 'unknown';
                    $housingFileSpecificationStatus->order = 5;
                    $housingFileSpecificationStatus->save();
                    break;
            }
        }
        $housingFileSpecificationStatus = New HousingFileSpecificationStatus();
        $housingFileSpecificationStatus->name = 'Kans gemaakt';
        $housingFileSpecificationStatus->code_ref = "opportunity_created";
        $housingFileSpecificationStatus->order = 2;
        $housingFileSpecificationStatus->save();

        Schema::create('housing_file_hoom_links', function (Blueprint $table) {
            $table->increments('id');
            $table->string('external_hoom_short_name')->nullable(true);
            $table->string('econobis_field_name')->nullable(true);
            $table->string('housing_file_data_type', 1)->default('');
            $table->string('label')->default('');
            $table->boolean('import_from_hoom')->default(false);
            $table->boolean('visible_in_econobis')->default(false);
            $table->timestamps();
        });

//    building-type-category              building_type_id                      B           Woningtype
//    build-year                          build_year                            B           Bouwjaar
//    building-contract-type              is_house_for_sale                     B           Koophuis
//    surface                             surface                               B   change  Gebruiksoppervlakte
//    roof-type                           roof_type_id                          B           Daktype
//    energy-label                        energy_label_id                       B           Energielabel
//    building-layers                     floors                                B           Aantal bouwlagen
//                                        energy_label_status_id                B    ?      Status energielabel
//    monument                            is_monument                           B           Monument
//                                        revenue_solar_panels                  B    ?      Opbrengst zonnepanelen
//    wall-surface                        wall_surface                          B   new     Geveloppervlakte
//    total-window-surface                total_window_surface                  B   new     Raamoppervlakte
//    frame-type                          frame_type                            B   new     Kozijntype
//    floor-surface                       floor_surface                         B   new     Vloeroppervlakte
//    pitched-roof-surface                pitched_roof_surface                  B   new     Hellend dakoppervlakte
//    flat-roof-surface                   flat_roof_surface                     B   new     Platte dakoppervlakte
//    cook-type                           cook_type                             B   new     Manier koken
//    heat-source                         heat_source                           B   new     Verwarming
//    resident-count                      number_of_residents                   G           Aantal bewoners
//    pitched-roof-heating                pitched_roof_heating                  G   new     Hellend dak ruimtes verwarming
//    flat-roof-heating                   flat_roof_heating                     G   new     Platte dak ruimtes verwarming
//    hr3p-glass-frame-current-glass      hr3p_glass_frame_current_glass        G   new     hr3p glaslijst (huidig)
//    glass-in-lead-replace-rooms-heated  glass_in_lead_replace_rooms_heated    G   new     Kamers verwarmd (met Glas-in-lood ramen)
//    water-comfort                       water_comfort                         G   new     Water comfort
//    boiler-setting-comfort-heat         boiler_setting_comfort_heat           G   new     Stooktemperatuur
//    amount-gas                          amount_gas                            G   new     Verbruik gas
//    amount-electricity                  amount_electricity                    G   new     Verbruik electriciteit
//    current-wall-insulation                                                   W   S       Status muurisolatie
//    current-floor-insulation                                                  W   S       Status vloerisolatie
//    current-roof-insulation                                                   W   S       atus dakisolatie
//    current-living-rooms-windows                                              W   S       Status glasisolatie woon
//    current-sleeping-rooms-windows                                            W   S       Status glasisolatie slaap
//    heat-source-warm-tap-water                                                W   S       Warmtapwater
//    building-heating-application                                              W   S       Warmtesysteem
//    ventilation-type                                                          W   S       Type ventilatie
//    crack-sealing-type                                                        W   S       Status kierdichting
//    has-cavity-wall                                                           W   S       Spouwmuur
//    has-solar-panels                                                          W   S       Zonnepanelen

        DB::table('housing_file_hoom_links')->insert([
            ['external_hoom_short_name'=> 'surface', 'econobis_field_name'=> 'surface', 'housing_file_data_type'=> 'B', 'label' => 'Gebruiksoppervlakte', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'roof-type', 'econobis_field_name'=> 'roof_type_id', 'housing_file_data_type'=> 'B', 'label' => 'Daktype', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'building-layers', 'econobis_field_name'=> 'floors', 'housing_file_data_type'=> 'B', 'label' => 'Aantal bouwlagen', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'wall-surface', 'econobis_field_name'=> 'wall_surface', 'housing_file_data_type'=> 'B', 'label' => 'Geveloppervlakte', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'total-window-surface', 'econobis_field_name'=> 'total_window_surface', 'housing_file_data_type'=> 'B', 'label' => 'Raamoppervlakte', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'frame-type', 'econobis_field_name'=> 'frame_type', 'housing_file_data_type'=> 'B', 'label' => 'Kozijntype', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'floor-surface', 'econobis_field_name'=> 'floor_surface', 'housing_file_data_type'=> 'B', 'label' => 'Vloeroppervlakte', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'pitched-roof-surface', 'econobis_field_name'=> 'pitched_roof_surface', 'housing_file_data_type'=> 'B', 'label' => 'Hellend dakoppervlakte', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'flat-roof-surface', 'econobis_field_name'=> 'flat_roof_surface', 'housing_file_data_type'=> 'B', 'label' => 'Platte dakoppervlakte', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'cook-type', 'econobis_field_name'=> 'cook_type', 'housing_file_data_type'=> 'B', 'label' => 'Manier koken', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'heat-source', 'econobis_field_name'=> 'heat_source', 'housing_file_data_type'=> 'B', 'label' => 'Verwarming', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'monument', 'econobis_field_name'=> 'is_monument', 'housing_file_data_type'=> 'B', 'label' => 'Monument', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'building-contract-type', 'econobis_field_name'=> 'is_house_for_sale', 'housing_file_data_type'=> 'B', 'label' => 'Koophuis', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'energy-label', 'econobis_field_name'=> 'energy_label_id', 'housing_file_data_type'=> 'B', 'label' => 'Energielabel', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'building-type-category', 'econobis_field_name'=> 'building_type_id', 'housing_file_data_type'=> 'B', 'label' => 'Woningtype', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'build-year', 'econobis_field_name'=> 'build_year', 'housing_file_data_type'=> 'B', 'label' => 'Bouwjaar', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'energy-label-status', 'econobis_field_name'=> 'energy_label_status_id', 'housing_file_data_type'=> 'B', 'label' => 'Status energielabel', 'import_from_hoom'=> false, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'revenue-solar-panels', 'econobis_field_name'=> 'revenue_solar_panels', 'housing_file_data_type'=> 'B', 'label' => 'Opbrengst zonnepanelen', 'import_from_hoom'=> false, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'pitched-roof-heating', 'econobis_field_name'=> 'pitched_roof_heating', 'housing_file_data_type'=> 'G', 'label' => 'Hellend dak ruimtes verwarming', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'flat-roof-heating', 'econobis_field_name'=> 'flat_roof_heating', 'housing_file_data_type'=> 'G', 'label' => 'Platte dak ruimtes verwarming', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'hr3p-glass-frame-current-glass', 'econobis_field_name'=> 'hr3p_glass_frame_current_glass', 'housing_file_data_type'=> 'G', 'label' => 'hr3p glaslijst (huidig)', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'glass-in-lead-replace-rooms-heated', 'econobis_field_name'=> 'glass_in_lead_replace_rooms_heated', 'housing_file_data_type'=> 'G', 'label' => 'Kamers verwarmd (met Glas-in-lood ramen)', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'resident-count', 'econobis_field_name'=> 'number_of_residents', 'housing_file_data_type'=> 'G', 'label' => 'Aantal bewoners', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'water-comfort', 'econobis_field_name'=> 'water_comfort', 'housing_file_data_type'=> 'B', 'label' => 'Water comfort', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'boiler-setting-comfort-heat', 'econobis_field_name'=> 'boiler_setting_comfort_heat', 'housing_file_data_type'=> 'G', 'label' => 'Stooktemperatuur', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'amount-gas', 'econobis_field_name'=> 'amount_gas', 'housing_file_data_type'=> 'G', 'label' => 'Verbruik gas', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'amount-electricity', 'econobis_field_name'=> 'amount_electricity', 'housing_file_data_type'=> 'G', 'label' => 'Verbruik electriciteit', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'current-wall-insulation', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Status muurisolatie', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'current-floor-insulation', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Status vloerisolatie', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'current-roof-insulation', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Status dakisolatie', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'current-living-rooms-windows', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Status glasisolatie woon', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'current-sleeping-rooms-windows', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Status glasisolatie slaap', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'heat-source-warm-tap-water', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Warmtapwater', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'building-heating-application', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Warmtesysteem', 'import_from_hoom'=> true, 'visible_in_econobis'=> false ],
            ['external_hoom_short_name'=> 'ventilation-type', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Type ventilatie', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'crack-sealing-type', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Status kierdichting', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'has-cavity-wall', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Spouwmuur', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],
            ['external_hoom_short_name'=> 'has-solar-panels', 'econobis_field_name'=> null, 'housing_file_data_type'=> 'W', 'label' => 'Zonnepanelen', 'import_from_hoom'=> true, 'visible_in_econobis'=> true ],

        ]);

        Schema::create('housing_file_housing_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('housing_file_id')->unsigned();
            $table->foreign('housing_file_id')->references('id')->on('housing_files');
            $table->unsignedInteger('housing_file_hoom_links_id');
            $table->foreign('housing_file_hoom_links_id')
                ->references('id')->on('housing_file_hoom_links')
                ->onDelete('restrict');
            $table->text('status')->nullable();;
            $table->float('number_or_m2')->nullable();
            $table->timestamps();
        });

        Schema::create('housing_file_log', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('housing_file_id')->nullable();
            $table->foreign('housing_file_id')
                ->references('id')->on('housing_files')
                ->onDelete('restrict');
            $table->string('message_text', 256);
            $table->string('message_type', 10);
            $table->unsignedInteger('user_id')->nullable();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->boolean('is_error', false);
            $table->timestamps();
        });

        //make permission and assign to roles inzake nieuw view permission housing_file_log
        Permission::create(['name' => 'view_housing_file_log', 'guard_name' => 'api']);
        $newViewRoles = [
            'Key user' => ['view_housing_file_log'],
            'Medewerker' => ['view_housing_file_log'],
            'Medewerker 2' => ['view_housing_file_log'],
            'Projectmedewerker' => ['view_housing_file_log'],
            'Financieel medewerker' => ['view_housing_file_log'],
            'Financieel controller' => ['view_housing_file_log'],
            'Participatie medewerker' => ['view_housing_file_log'],
            'Energie adviseur' => ['view_housing_file_log'],
            'Marketing medewerker' => ['view_housing_file_log'],
            'Buurtaanpak manager' => ['view_housing_file_log'],
            'Buurtaanpak coördinator' => ['view_housing_file_log'],
        ];
        foreach($newViewRoles as $newViewRoleName => $permissions) {
            $role =  \Spatie\Permission\Models\Role::findByName($newViewRoleName);
            $role->givePermissionTo($permissions);

        }

        Schema::table('building_types', function (Blueprint $table) {
            $table->integer('external_hoom_id')->nullable(true)->after('name');
            $table->string('external_hoom_short')->nullable(true)->after('external_hoom_id');
            $table->integer('order')->nullable(true)->after('external_hoom_short');
        });

//    1	Vrijstaand                              3 Vrijstaand
//    2	Hoekwoning                              2 Hoekwoning
//    3	Tussenwoning                            5 Tussenwoning
//    4	Appartement                             1 Appartement
//    5	Appartement VVE
//    6	Gehele tussenwoning
//    7	Beneden woning meerdere verdiepingen
//  new 2 onder 1 kap                           4 2 onder 1 kap
//  new Onbekend

        foreach (BuildingType::all() as $buildingType){
            switch ($buildingType->id){
                case 1:                                             // Vrijstaand
                    $buildingType->external_hoom_id = 3;
                    $buildingType->external_hoom_short = 'detached-house';
                    $buildingType->order = 1;
                    $buildingType->save();
                    break;
                case 2:                                             // Hoekwoning
                    $buildingType->external_hoom_id = 2;
                    $buildingType->external_hoom_short = '';
                    $buildingType->order = 2;
                    $buildingType->save();
                    break;
                case 3:                                             // Tussenwoning
                    $buildingType->external_hoom_id = 5;
                    $buildingType->external_hoom_short = '';
                    $buildingType->order = 3;
                    $buildingType->save();
                    break;
                case 4:                                             // Appartement
                    $buildingType->external_hoom_id = 1;
                    $buildingType->external_hoom_short = '';
                    $buildingType->order = 4;
                    $buildingType->save();
                    break;
                case 5:                                             // Appartement VVE
                    $buildingType->external_hoom_id = null;
                    $buildingType->external_hoom_short = '';
                    $buildingType->order = 5;
                    $buildingType->save();
                    break;
                case 6:                                             // Gehele tussenwoning
                    $buildingType->external_hoom_id = null;
                    $buildingType->external_hoom_short = '';
                    $buildingType->order = 6;
                    $buildingType->save();
                    break;
                case 7:                                             // Beneden woning meerdere verdiepingen
                    $buildingType->external_hoom_id = null;
                    $buildingType->external_hoom_short = '';
                    $buildingType->order = 7;
                    $buildingType->save();
                    break;
            }
        }
        $buildingType = New BuildingType();
        $buildingType->name = '2 onder 1 kap';
        $buildingType->external_hoom_id= 4;
        $buildingType->external_hoom_short = '';
        $buildingType->order = 8;
        $buildingType->save();

        $buildingType = New BuildingType();
        $buildingType->name = 'Onbekend';
        $buildingType->external_hoom_id= null;
        $buildingType->external_hoom_short = '';
        $buildingType->order = 99;
        $buildingType->save();

        Schema::table('roof_types', function (Blueprint $table) {
            $table->integer('external_hoom_id')->nullable(true)->after('name');
            $table->string('external_hoom_short')->nullable(true)->after('external_hoom_id');
            $table->integer('order')->nullable(true)->after('external_hoom_short');
        });

//    1	Hellend dak met dakpannen   1 Hellend dak
//    2	Hellend dak met bitumen
//    3	Platdak                     2 Plat dak
//    4	Geen dak                    3 Niet van toepassing
//    5	Hellend rietdak             6 Rieten dak
//  new Puntdak                     4 Puntdak
//  new Afgerond dak                5 Afgerond dak
//  new Onbekend

        foreach (RoofType::all() as $roofType){
            switch ($roofType->id){
                case 1:                                             // Hellend dak met dakpannen
                    $roofType->external_hoom_id = 1;
                    $roofType->external_hoom_short = 'pitched';
                    $roofType->order = 1;
                    $roofType->save();
                    break;
                case 2:                                             // Hellend dak met bitumen
                    $roofType->external_hoom_id = null;
                    $roofType->external_hoom_short = '';
                    $roofType->order = 2;
                    $roofType->save();
                    break;
                case 3:                                             // Platdak
                    $roofType->external_hoom_id = 2;
                    $roofType->external_hoom_short = '';
                    $roofType->order = 3;
                    $roofType->save();
                    break;
                case 4:                                             // Geen dak
                    $roofType->external_hoom_id = 3;
                    $roofType->external_hoom_short = '';
                    $roofType->order = 9;
                    $roofType->save();
                    break;
                case 5:                                             // Hellend rietdak
                    $roofType->external_hoom_id = 6;
                    $roofType->external_hoom_short = '';
                    $roofType->order = 4;
                    $roofType->save();
                    break;
            }
        }
        $roofType = New RoofType();
        $roofType->name = 'Puntdak';
        $roofType->external_hoom_id= 4;
        $roofType->external_hoom_short = '';
        $roofType->order = 8;
        $roofType->save();

        $roofType = New RoofType();
        $roofType->name = 'Afgerond dak';
        $roofType->external_hoom_id= 5;
        $roofType->external_hoom_short = '';
        $roofType->order = 8;
        $roofType->save();

        $roofType = New RoofType();
        $roofType->name = 'Onbekend';
        $roofType->external_hoom_id= null;
        $roofType->external_hoom_short = '';
        $roofType->order = 99;
        $roofType->save();

        Schema::table('energy_labels', function (Blueprint $table) {
            $table->integer('external_hoom_id')->nullable(true)->after('name');
            $table->string('external_hoom_short')->nullable(true)->after('external_hoom_id');
            $table->integer('order')->nullable(true)->after('external_hoom_short');
        });

//    1	A+++    null
//    2	A++     null
//    3	A+      null
//    4	A       1
//    5	B       2
//    6	C       3
//    7	D       4
//    8	E       5
//    9	F       6
//  new G       7
//  new	?       8

        foreach (EnergyLabel::all() as $energyLabel){
            switch ($energyLabel->id){
                case 1:                                             // A+++
                    $energyLabel->external_hoom_id = null;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 1;
                    $energyLabel->save();
                    break;
                case 2:                                             // A++
                    $energyLabel->external_hoom_id = null;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 2;
                    $energyLabel->save();
                    break;
                case 3:                                             // A+
                    $energyLabel->external_hoom_id = null;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 3;
                    $energyLabel->save();
                    break;
                case 4:                                             // A
                    $energyLabel->external_hoom_id = 1;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 4;
                    $energyLabel->save();
                    break;
                case 5:                                             // B
                    $energyLabel->external_hoom_id = 2;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 5;
                    $energyLabel->save();
                    break;
                case 6:                                             // C
                    $energyLabel->external_hoom_id = 3;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 6;
                    $energyLabel->save();
                    break;
                case 7:                                             // D
                    $energyLabel->external_hoom_id = 4;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 7;
                    $energyLabel->save();
                    break;
                case 8:                                             // E
                    $energyLabel->external_hoom_id = 5;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 8;
                    $energyLabel->save();
                    break;
                case 9:                                             // F
                    $energyLabel->external_hoom_id = 6;
                    $energyLabel->external_hoom_short = '';
                    $energyLabel->order = 9;
                    $energyLabel->save();
                    break;
            }
        }
        $energyLabel = New EnergyLabel();
        $energyLabel->name = 'G';
        $energyLabel->external_hoom_id= 7;
        $energyLabel->external_hoom_short = '';
        $energyLabel->order = 10;
        $energyLabel->save();

        $energyLabel = New EnergyLabel();
        $energyLabel->name = 'Onbekend';
        $energyLabel->external_hoom_id= 8;
        $energyLabel->external_hoom_short = '';
        $energyLabel->order = 99;
        $energyLabel->save();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        BuildingType::where('name', '2 onder 1 kap')->delete();
        BuildingType::where('name', 'Onbekend')->delete();
        RoofType::where('name', 'Puntdak')->delete();
        RoofType::where('name', 'Afgerond dak')->delete();
        RoofType::where('name', 'Onbekend')->delete();
        EnergyLabel::where('name', 'G')->delete();
        EnergyLabel::where('name', 'Onbekend')->delete();

        if (Schema::hasColumn('building_types', 'external_hoom_id'))
        {
            Schema::table('building_types', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_id');
            });
        }
        if (Schema::hasColumn('building_types', 'external_hoom_short'))
        {
            Schema::table('building_types', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_short');
            });
        }
        if (Schema::hasColumn('building_types', 'order'))
        {
            Schema::table('building_types', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
        if (Schema::hasColumn('roof_types', 'external_hoom_id'))
        {
            Schema::table('roof_types', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_id');
            });
        }
        if (Schema::hasColumn('roof_types', 'external_hoom_short'))
        {
            Schema::table('roof_types', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_short');
            });
        }
        if (Schema::hasColumn('roof_types', 'order'))
        {
            Schema::table('roof_types', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
        if (Schema::hasColumn('energy_labels', 'external_hoom_id'))
        {
            Schema::table('energy_labels', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_id');
            });
        }
        if (Schema::hasColumn('energy_labels', 'external_hoom_short'))
        {
            Schema::table('energy_labels', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_short');
            });
        }
        if (Schema::hasColumn('energy_labels', 'order'))
        {
            Schema::table('energy_labels', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
        Schema::dropIfExists('housing_file_housing_statuses');
        Schema::dropIfExists('housing_file_hoom_links');
        Schema::dropIfExists('housing_file_log');

        HousingFileSpecificationStatus::where('code_ref', 'opportunity_created')->delete();

        if (Schema::hasColumn('housing_file_specification_statuses', 'code_ref'))
        {
            Schema::table('housing_file_specification_statuses', function (Blueprint $table)
            {
                $table->dropColumn('code_ref');
            });
        }
        if (Schema::hasColumn('housing_file_specification_statuses', 'order'))
        {
            Schema::table('housing_file_specification_statuses', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }

        if (Schema::hasColumn('housing_file_specifications', 'co2_savings'))
        {
            Schema::table('housing_file_specifications', function (Blueprint $table)
            {
                $table->dropColumn('co2_savings');
            });
        }
        if (Schema::hasColumn('housing_file_specifications', 'savings_electricity'))
        {
            Schema::table('housing_file_specifications', function (Blueprint $table)
            {
                $table->dropColumn('savings_electricity');
            });
        }
        if (Schema::hasColumn('housing_file_specifications', 'savings_gas'))
        {
            Schema::table('housing_file_specifications', function (Blueprint $table)
            {
                $table->dropColumn('savings_gas');
            });
        }
        if (Schema::hasColumn('housing_file_specifications', 'type_of_execution'))
        {
            Schema::table('housing_file_specifications', function (Blueprint $table)
            {
                $table->dropColumn('type_of_execution');
            });
        }
        if (Schema::hasColumn('housing_file_specifications', 'external_hoom_name'))
        {
            Schema::table('housing_file_specifications', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_name');
            });
        }

        if (Schema::hasColumn('housing_files', 'amount_electricity'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('amount_electricity');
            });
        }
        if (Schema::hasColumn('housing_files', 'amount_gas'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('amount_gas');
            });
        }
        if (Schema::hasColumn('housing_files', 'glass_in_lead_replace_rooms_heated'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('glass_in_lead_replace_rooms_heated');
            });
        }
        if (Schema::hasColumn('housing_files', 'hr3p_glass_frame_current_glass'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('hr3p_glass_frame_current_glass');
            });
        }
        if (Schema::hasColumn('housing_files', 'flat_roof_heating'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('flat_roof_heating');
            });
        }
        if (Schema::hasColumn('housing_files', 'pitched_roof_heating'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('pitched_roof_heating');
            });
        }
        if (Schema::hasColumn('housing_files', 'boiler_setting_comfort_heat'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('boiler_setting_comfort_heat');
            });
        }
        if (Schema::hasColumn('housing_files', 'water_comfort'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('water_comfort');
            });
        }
        if (Schema::hasColumn('housing_files', 'heat_source'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('heat_source');
            });
        }
        if (Schema::hasColumn('housing_files', 'cook_type'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('cook_type');
            });
        }
        if (Schema::hasColumn('housing_files', 'flat_roof_surface'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('flat_roof_surface');
            });
        }
        if (Schema::hasColumn('housing_files', 'pitched_roof_surface'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('pitched_roof_surface');
            });
        }
        if (Schema::hasColumn('housing_files', 'floor_surface'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('floor_surface');
            });
        }
        if (Schema::hasColumn('housing_files', 'frame_type'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('frame_type');
            });
        }
        if (Schema::hasColumn('housing_files', 'total_window_surface'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('total_window_surface');
            });
        }
        if (Schema::hasColumn('housing_files', 'wall_surface'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('wall_surface');
            });
        }

        if (Schema::hasColumn('housing_files', 'hoom_building_id'))
        {
            Schema::table('housing_files', function (Blueprint $table)
            {
                $table->dropColumn('hoom_building_id');
            });
        }

        Schema::table('housing_files', function (Blueprint $table) {
            $table->integer('surface')->nullable()->change();;
        });

        Permission::findByName('view_housing_file_log')->delete();
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    }
}
