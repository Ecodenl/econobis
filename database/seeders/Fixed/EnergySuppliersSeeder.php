<?php

namespace Database\Seeders\Fixed;

use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Seeder;

class EnergySuppliersSeeder extends Seeder
{
    public function run(): void
    {
        $energySuppliers = [
            ['id' => 1, 'name' => 'OM', 'does_postal_code_links' => 1, 'excel_template_id' => 7, 'abbreviation' => 'OM', 'file_format_id' => null, 'order' => 1, 'end_date' => null],
            ['id' => 2, 'name' => 'Budget Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'BE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 3, 'name' => 'E.on', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'EON', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 4, 'name' => 'Eneco', 'does_postal_code_links' => 1, 'excel_template_id' => 1, 'abbreviation' => 'ENC', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 5, 'name' => 'Energiedirect', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'EGD', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 6, 'name' => 'Engie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ENG', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 7, 'name' => 'Essent', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ESS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 8, 'name' => 'Greenchoice', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'GC', 'file_format_id' => null, 'order' => 3, 'end_date' => null],
            ['id' => 9, 'name' => 'Holland Wind', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'HW', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 10, 'name' => 'Main energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ME', 'file_format_id' => null, 'order' => null, 'end_date' => null],
// voorheen 11 N.E.M.
            ['id' => 11, 'name' => 'N.E.M. (vervallen)', 'does_postal_code_links' => 0, 'excel_template_id' => null, 'abbreviation' => '', 'file_format_id' => null, 'order' => null, 'end_date' => '2020-09-18'],
// voorheen 12 NL Energie
            ['id' => 12, 'name' => 'NL Energie (vervallen)', 'does_postal_code_links' => 0, 'excel_template_id' => null, 'abbreviation' => '', 'file_format_id' => null, 'order' => null, 'end_date' => '2022-11-15'],
            ['id' => 13, 'name' => 'Vattenfall', 'does_postal_code_links' => 1, 'excel_template_id' => 4, 'abbreviation' => 'VF', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 14, 'name' => 'Oxxio', 'does_postal_code_links' => 1, 'excel_template_id' => 3, 'abbreviation' => 'OX', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 15, 'name' => 'Pure energie', 'does_postal_code_links' => 1, 'excel_template_id' => 6, 'abbreviation' => 'PE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 16, 'name' => 'Qurrent', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'QRT', 'file_format_id' => null, 'order' => null, 'end_date' => '2022-12-31'],
            ['id' => 17, 'name' => 'VanDeBron', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'VDB', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 18, 'name' => 'Overig', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'OVG', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 19, 'name' => 'Energie VanOns', 'does_postal_code_links' => 1, 'excel_template_id' => 5, 'abbreviation' => 'EVO', 'file_format_id' => null, 'order' => 2, 'end_date' => null],
            ['id' => 20, 'name' => 'Huismerk Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'HME', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 21, 'name' => 'Energieflex', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'EF', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 22, 'name' => 'United Consumers', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'UC', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 23, 'name' => 'Innova Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'INE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 24, 'name' => 'Betuwe stroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'BTS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 25, 'name' => 'Delta Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'DE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 26, 'name' => 'Agem', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'AGM', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 27, 'name' => 'Anode Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'AE', 'file_format_id' => null, 'order' => null, 'end_date' => '2022-12-31'],
            ['id' => 28, 'name' => 'De Groene Stroomfabriek', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'DGS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
// voorheen 29 Energie Van Ons
            ['id' => 29, 'name' => 'Energie Van Ons (vervallen)', 'does_postal_code_links' => 1, 'excel_template_id' => null, 'abbreviation' => '', 'file_format_id' => null, 'order' => null, 'end_date' => '2020-09-18'],
            ['id' => 30, 'name' => 'HVC Kringloop Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'HVC', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 31, 'name' => 'Sepa Green', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'SG', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 32, 'name' => 'Servicehouse', 'does_postal_code_links' => 1, 'excel_template_id' => 6, 'abbreviation' => 'SH', 'file_format_id' => null, 'order' => null, 'end_date' => null],
// voorheen 33 Holthausen Clean Energy (HCE)
            ['id' => 33, 'name' => 'Holthausen Clean Energy (HCE) (vervallen)', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'HCE', 'file_format_id' => null, 'order' => null, 'end_date' => '2022-08-09'],
            ['id' => 34, 'name' => 'Total', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'TL', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 35, 'name' => 'Fenor energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'FE', 'file_format_id' => null, 'order' => null, 'end_date' => '2022-12-31'],
            ['id' => 36, 'name' => 'Power peers', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'PP', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 37, 'name' => 'Energyhouse', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'EH', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 38, 'name' => 'NieuweStroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'NS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 39, 'name' => 'ParkStroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'PS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 40, 'name' => 'Groenpand', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'GP', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 41, 'name' => 'Windcentrale', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'WC', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 42, 'name' => 'Energiebesteding', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'EB', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 43, 'name' => 'GreenNL', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'GNL', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 44, 'name' => 'Hezelaer', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'HZL', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 45, 'name' => 'Easyenergy', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ESE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 46, 'name' => 'Dorpstroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'DST', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 47, 'name' => 'Welkom Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'WKE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 48, 'name' => 'Qwint', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'QWT', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 49, 'name' => 'EnergyZero', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'EZR', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 50, 'name' => 'Kikker Energie/DGB Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'DGB', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 51, 'name' => 'Discount Energie', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'DCE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 52, 'name' => 'EnerZie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ENZ', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 53, 'name' => 'DVEP Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'DVP', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 54, 'name' => 'Clean Energy', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'CE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 55, 'name' => 'Samsam', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'SAM', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 56, 'name' => 'Gezinsenergie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'GZE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 57, 'name' => 'Onbekend/n.v.t.', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ONB', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 58, 'name' => 'CEN / WoonEnergie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'CEN', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 59, 'name' => 'De Vrije Energie Producent', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'VEP', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 60, 'name' => 'Sefe energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'SFE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 61, 'name' => 'Nieuw Hollands Energiebedrijf', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'NHE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 62, 'name' => 'PostcodeStroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'PCS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 63, 'name' => 'PZEM', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'PZM', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 64, 'name' => 'Vrij Op Naam', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'VON', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 65, 'name' => 'Mijn Domein Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'MDE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 66, 'name' => 'ANWB Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ANW', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 67, 'name' => 'Shell Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'SHL', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 68, 'name' => 'Coolblue Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'CBE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 69, 'name' => 'HollandsStroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'HOS', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 70, 'name' => 'Tibber', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'TIB', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 71, 'name' => 'Frank energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'FRE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 72, 'name' => 'Gewoon Energie', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'GWE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 73, 'name' => 'Zonneplan', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'ZNP', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 74, 'name' => 'NextEnergy', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'NEG', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 75, 'name' => 'Prikenergie', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'PKE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 76, 'name' => 'Mega Energie', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'MG', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 77, 'name' => 'Live Energy', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'LE', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 78, 'name' => 'Gulf Gas and Power', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'GGP', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 79, 'name' => 'Atlas Power and Gas', 'does_postal_code_links' => 0, 'excel_template_id' => 2, 'abbreviation' => 'APG', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 80, 'name' => 'Noordstroom', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'NST', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 81, 'name' => 'GroenStroomLokaal', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'GSL', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 82, 'name' => 'Volti', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'VLT', 'file_format_id' => null, 'order' => null, 'end_date' => null],
            ['id' => 83, 'name' => 'Audax Renewables', 'does_postal_code_links' => 1, 'excel_template_id' => 2, 'abbreviation' => 'AUD', 'file_format_id' => null, 'order' => null, 'end_date' => null],
        ];

        foreach ($energySuppliers as $energySupplier) {
            EnergySupplier::updateOrCreate(
                ['id' => $energySupplier['id']],
                $energySupplier
            );
        }

    }
}