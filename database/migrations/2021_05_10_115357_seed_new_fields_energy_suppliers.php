<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SeedNewFieldsEnergySuppliers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('energy_suppliers')->where('name', 'OM')->update(['excel_template_id' => 7, 'abbreviation' => 'OM', 'file_format_id' => null, 'order' => 1 ]);
        DB::table('energy_suppliers')->where('name', 'Budget Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'BE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'E.on')->update(['excel_template_id' => 2, 'abbreviation' => 'EON', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Eneco')->update(['excel_template_id' => 1, 'abbreviation' => 'ENC', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Energiedirect')->update(['excel_template_id' => 2, 'abbreviation' => 'EGD', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Engie')->update(['excel_template_id' => 2, 'abbreviation' => 'ENG', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Essent')->update(['excel_template_id' => 2, 'abbreviation' => 'ESS', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Greenchoice')->update(['excel_template_id' => 2, 'abbreviation' => 'GC', 'file_format_id' => null, 'order' => 3 ]);
        DB::table('energy_suppliers')->where('name', 'Holland Wind')->update(['excel_template_id' => 2, 'abbreviation' => 'HW', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Main energie')->update(['excel_template_id' => 2, 'abbreviation' => 'ME', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'NL Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'NLE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Vattenfall')->update(['excel_template_id' => 4, 'abbreviation' => 'VF', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Oxxio')->update(['excel_template_id' => 3, 'abbreviation' => 'OX', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Pure energie')->update(['excel_template_id' => 6, 'abbreviation' => 'PE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Qurrent')->update(['excel_template_id' => 2, 'abbreviation' => 'QRT', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'VanDeBron')->update(['excel_template_id' => 2, 'abbreviation' => 'VDB', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Overig')->update(['excel_template_id' => 2, 'abbreviation' => 'OVG', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Energie VanOns')->update(['excel_template_id' => 5, 'abbreviation' => 'EVO', 'file_format_id' => null, 'order' => 2 ]);
        DB::table('energy_suppliers')->where('name', 'Huismerk Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'HME', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Energieflex')->update(['excel_template_id' => 2, 'abbreviation' => 'EF', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'United Consumers')->update(['excel_template_id' => 2, 'abbreviation' => 'UC', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Innova Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'INE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Betuwe stroom')->update(['excel_template_id' => 2, 'abbreviation' => 'BTS', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Delta Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'DE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Agem')->update(['excel_template_id' => 2, 'abbreviation' => 'AGM', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Anode Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'AE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'De Groene Stroomfabriek')->update(['excel_template_id' => 2, 'abbreviation' => 'DGS', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'HVC Kringloop Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'HVC', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Sepa Green')->update(['excel_template_id' => 2, 'abbreviation' => 'SG', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Servicehouse')->update(['excel_template_id' => 6, 'abbreviation' => 'SH', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Holthausen Clean Energy (HCE)')->update(['excel_template_id' => 2, 'abbreviation' => 'HCE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Total')->update(['excel_template_id' => 2, 'abbreviation' => 'TL', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Fenor energie')->update(['excel_template_id' => 2, 'abbreviation' => 'FE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Power peers')->update(['excel_template_id' => 2, 'abbreviation' => 'PP', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Energyhouse')->update(['excel_template_id' => 2, 'abbreviation' => 'EH', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'NieuweStroom')->update(['excel_template_id' => 2, 'abbreviation' => 'NS', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'ParkStroom')->update(['excel_template_id' => 2, 'abbreviation' => 'PS', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Groenpand')->update(['excel_template_id' => 2, 'abbreviation' => 'GP', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Windcentrale')->update(['excel_template_id' => 2, 'abbreviation' => 'WC', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Energiebesteding')->update(['excel_template_id' => 2, 'abbreviation' => 'EB', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'GreenNL')->update(['excel_template_id' => 2, 'abbreviation' => 'GNL', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Hezelaer')->update(['excel_template_id' => 2, 'abbreviation' => 'HZL', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Easyenergy')->update(['excel_template_id' => 2, 'abbreviation' => 'ESE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Dorpstroom')->update(['excel_template_id' => 2, 'abbreviation' => 'DST', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Welkom Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'WKE', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Qwint')->update(['excel_template_id' => 2, 'abbreviation' => 'QWT', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'Energie Zero')->update(['excel_template_id' => 2, 'abbreviation' => 'EZR', 'file_format_id' => null, 'order' => null ]);
        DB::table('energy_suppliers')->where('name', 'DGB Energie')->update(['excel_template_id' => 2, 'abbreviation' => 'DGB', 'file_format_id' => null, 'order' => null ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
