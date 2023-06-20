<?php

use App\Eco\Measure\Measure;
use App\Eco\Measure\MeasureCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsMarch2023ToMeasuresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::table('measures', function (Blueprint $table) {
//            $table->string('external_hoom_id')->nullable(true);
//            $table->string('external_hoom_short_name')->nullable(true);
//            $table->string('external_hoom_name')->nullable(true);
//            $table->boolean('import_from_hoom')->default(false);
//            $table->boolean('visible_in_econobis')->default(false);
//        });

//        DB::table('measures')->where('number', 'M2018-1')->update(['external_hoom_id' => 1, 'external_hoom_short_name' => "floor-insulation", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-2')->update(['external_hoom_id' => 2, 'external_hoom_short_name' => "bottom-insulation", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-6')->update(['external_hoom_id' => 4, 'external_hoom_short_name' => "cavity-insulation", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-7')->update(['external_hoom_id' => 5, 'external_hoom_short_name' => "facade-insulation", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-9')->update(['external_hoom_id' => 12, 'external_hoom_short_name' => "roof-insulation-pitched-inside", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-10')->update(['external_hoom_id' => 13, 'external_hoom_short_name' => "roof-insulation-pitched-replace-tiles", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-11')->update(['external_hoom_id' => 14, 'external_hoom_short_name' => "roof-insulation-flat-current", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-12')->update(['external_hoom_id' => 15, 'external_hoom_short_name' => "roof-insulation-flat-replace-current", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-16')->update(['external_hoom_id' => 7, 'external_hoom_short_name' => "glass-in-lead", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-33')->update(['external_hoom_id' => 16, 'external_hoom_short_name' => "high-efficiency-boiler-replace", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-38')->update(['external_hoom_id' => 38, 'external_hoom_short_name' => "heat-pump-boiler-place-replace", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-52')->update(['external_hoom_id' => 18, 'external_hoom_short_name' => "solar-panels-place-replace", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2018-54')->update(['external_hoom_id' => 17, 'external_hoom_short_name' => "heater-place-replace", 'import_from_hoom' => true, 'visible_in_econobis' => true]);
//        DB::table('measures')->where('number', 'M2021-5')->update(['external_hoom_id' => 8, 'external_hoom_short_name' => "hrpp-glass-only", 'import_from_hoom' => true, 'visible_in_econobis' => true]);

//        $onderhoud_new_MeasureCategoryId = DB::table('measure_categories')->insertGetId([
//            'name'=> 'Onderhoud',
//            'uses_wf_create_opportunity' => false,
//            'measure_id_wf_create_opportunity' => null,
//            'opportunity_status_id_wf_create_opportunity' => null,
//            'uses_wf_create_quotation_request' => false,
//            'organisation_id_wf_create_quotation_request' => null,
//            'uses_wf_email_quotation_request' => false,
//            'email_template_id_wf_create_quotation_request' => null,
//        ]);
        $onderhoud_new_MeasureCategoryId = MeasureCategory::where('name','Onderhoud')->first()->id;
        $vloerisolatie_1_MeasureCategoryId = MeasureCategory::where('name','Vloerisolatie')->first()->id;
        $gevelisolatie_2_MeasureCategoryId = MeasureCategory::where('name', 'Gevelisolatie')->first()->id;
        $isolatieglas_4_MeasureCategoryId = MeasureCategory::where('name', 'Isolatieglas')->first()->id;
        $kierdichting_5_MeasureCategoryId = MeasureCategory::where('name', 'Kierdichting')->first()->id;
        $ventilatie_6_MeasureCategoryId = MeasureCategory::where('name', 'Ventilatie')->first()->id;
        $cvKetel_7_MeasureCategoryId = MeasureCategory::where('name', 'Cv-ketel')->first()->id;
        $warmtepomp_8_MeasureCategoryId = MeasureCategory::where('name', 'Warmtepomp')->first()->id;
        $warmteAfgifte_10_MeasureCategoryId = MeasureCategory::where('name', 'Warmte afgifte')->first()->id;
        $overig_14_MeasureCategoryId = MeasureCategory::where('name', 'Overig')->first()->id;
        $lampen_22_MeasureCategoryId = MeasureCategory::where('name', 'Lampen')->first()->id;

        DB::table('measures')->insertGetId(['name'=> 'Overig uit Hoomdossier', 'measure_category_id' => $overig_14_MeasureCategoryId, 'number' => 'M2023-2', 'visible' => 0, 'external_hoom_id' => 'overig-uit-hoomdossier', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Vloerisolatie, meer info nodig', 'measure_category_id' => $vloerisolatie_1_MeasureCategoryId, 'number' => 'M2023-3', 'visible' => 0, 'external_hoom_id' => 'floor-insulation-research', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Muurisolatie, meer info nodig', 'measure_category_id' => $gevelisolatie_2_MeasureCategoryId, 'number' => 'M2023-4', 'visible' => 0, 'external_hoom_id' => 'wall-insulation-research', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'HR++ glas + kozijn', 'measure_category_id' => $isolatieglas_4_MeasureCategoryId, 'number' => 'M2023-5', 'visible' => 0, 'external_hoom_id' => 'hrpp-glass-frames', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'HR+++ glas + kozijn', 'measure_category_id' => $isolatieglas_4_MeasureCategoryId, 'number' => 'M2023-6', 'visible' => 0, 'external_hoom_id' => 'hr3p-frames', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Verbeteren kierdichting', 'measure_category_id' => $kierdichting_5_MeasureCategoryId, 'number' => 'M2023-7', 'visible' => 0, 'external_hoom_id' => 'crack-sealing', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Voegwerk repareren', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-8', 'visible' => 0, 'external_hoom_id' => 'repair-joint', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Metselwerk reinigen', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-9', 'visible' => 0, 'external_hoom_id' => 'clean-brickwork', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Gevelimpregnatie', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-10', 'visible' => 0, 'external_hoom_id' => 'impregnate-wall', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Gevelschilderwerk (stuc- of metselwerk)', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-11', 'visible' => 0, 'external_hoom_id' => 'paint-wall', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Gevelschilderwerk (hout)', 'measure_category_id' => $onderhoud_new_MeasureCategoryId	, 'number' => 'M2023-12', 'visible' => 0, 'external_hoom_id' => 'new	paint-wood-elements', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Dakpannen vervangen', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-13', 'visible' => 0, 'external_hoom_id' => 'replace-tiles', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Dakbedekking vervangen', 'measure_category_id' => $onderhoud_new_MeasureCategoryId	, 'number' => 'M2023-14', 'visible' => 0, 'external_hoom_id' => 'new	replace-roof-insulation', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Dakreparatie', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-15', 'visible' => 0, 'external_hoom_id' => 'inspect-repair-roofs', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Zinkwerk schuin dak', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-16', 'visible' => 0, 'external_hoom_id' => 'replace-zinc-pitched', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Zinkwerk plat dak', 'measure_category_id' => $onderhoud_new_MeasureCategoryId, 'number' => 'M2023-17', 'visible' => 0, 'external_hoom_id' => 'replace-zinc-flat', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Gebalanceerde ventilatie', 'measure_category_id' => $ventilatie_6_MeasureCategoryId, 'number' => 'M2023-18', 'visible' => 0, 'external_hoom_id' => 'ventilation-balanced-wtw', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Decentrale mechanische ventilatie', 'measure_category_id' => $ventilatie_6_MeasureCategoryId, 'number' => 'M2023-19', 'visible' => 0, 'external_hoom_id' => 'ventilation-decentral-wtw', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Vraaggestuurde ventilatie', 'measure_category_id' => $ventilatie_6_MeasureCategoryId, 'number' => 'M2023-20', 'visible' => 0, 'external_hoom_id' => 'ventilation-demand-driven', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Hybride warmtepomp met buitenlucht', 'measure_category_id' => $warmtepomp_8_MeasureCategoryId, 'number' => 'M2023-21', 'visible' => 0, 'external_hoom_id' => 'hybrid-heat-pump-outside-air', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Hybride warmtepomp met ventilatielucht', 'measure_category_id' => $warmtepomp_8_MeasureCategoryId, 'number' => 'M2023-22', 'visible' => 0, 'external_hoom_id' => 'hybrid-heat-pump-ventilation-air', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Hybride warmtepomp met pvt panelen', 'measure_category_id' => $warmtepomp_8_MeasureCategoryId, 'number' => 'M2023-23', 'visible' => 0, 'external_hoom_id' => 'hybrid-heat-pump-pvt-panels', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Volledige warmtepomp met buitenlucht', 'measure_category_id' => $warmtepomp_8_MeasureCategoryId, 'number' => 'M2023-24', 'visible' => 0, 'external_hoom_id' => 'full-heat-pump-outside-air', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Volledige warmtepomp met bodemwarmte', 'measure_category_id' => $warmtepomp_8_MeasureCategoryId, 'number' => 'M2023-25', 'visible' => 0, 'external_hoom_id' => 'full-heat-pump-ground-heat', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Volledige warmtepomp met pvt panelen', 'measure_category_id' => $warmtepomp_8_MeasureCategoryId, 'number' => 'M2023-26', 'visible' => 0, 'external_hoom_id' => 'full-heat-pump-pvt-panels', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Besparen met verlichting', 'measure_category_id' => $lampen_22_MeasureCategoryId, 'number' => 'M2023-27', 'visible' => 0, 'external_hoom_id' => 'save-energy-with-light', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Energiezuinige apparatuur', 'measure_category_id' => $overig_14_MeasureCategoryId, 'number' => 'M2023-28', 'visible' => 0, 'external_hoom_id' => 'energy-efficient-equipment', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Energiezuinige installaties', 'measure_category_id' => $overig_14_MeasureCategoryId, 'number' => 'M2023-29', 'visible' => 0, 'external_hoom_id' => 'energy-efficient-installations', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Besparen door kierdichting', 'measure_category_id' => $kierdichting_5_MeasureCategoryId, 'number' => 'M2023-30', 'visible' => 0, 'external_hoom_id' => 'save-energy-with-crack-sealing', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Verbeteren van de radiatoren', 'measure_category_id' => $warmteAfgifte_10_MeasureCategoryId, 'number' => 'M2023-31', 'visible' => 0, 'external_hoom_id' => 'improve-radiators', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Verbeteren van de verwarmingsinstallatie', 'measure_category_id' => $cvKetel_7_MeasureCategoryId, 'number' => 'M2023-32', 'visible' => 0, 'external_hoom_id' => 'improve-heating-installations', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Besparen op warm tapwate', 'measure_category_id' => $overig_14_MeasureCategoryId, 'number' => 'M2023-33', 'visible' => 0, 'external_hoom_id' => 'save-energy-with-warm-tap-water', 'import_from_hoom' => true, 'visible_in_econobis' => true]);
        DB::table('measures')->insertGetId(['name'=> 'Algemeen', 'measure_category_id' => $overig_14_MeasureCategoryId, 'number' => 'M2023-34', 'visible' => 0, 'external_hoom_id' => 'general', 'import_from_hoom' => true, 'visible_in_econobis' => true]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('measures', 'visible_in_econobis'))
        {
            Schema::table('measures', function (Blueprint $table)
            {
                $table->dropColumn('visible_in_econobis');
            });
        }
        if (Schema::hasColumn('measures', 'import_from_hoom'))
        {
            Schema::table('measures', function (Blueprint $table)
            {
                $table->dropColumn('import_from_hoom');
            });
        }
        if (Schema::hasColumn('measures', 'external_hoom_name'))
        {
            Schema::table('measures', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_name');
            });
        }
        if (Schema::hasColumn('measures', 'external_hoom_short_name'))
        {
            Schema::table('measures', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_short_name');
            });
        }
        if (Schema::hasColumn('measures', 'external_hoom_id'))
        {
            Schema::table('measures', function (Blueprint $table)
            {
                $table->dropColumn('external_hoom_id');
            });
        }
    }
}
