<?php

use Illuminate\Database\Seeder;

class IndustriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ([
                     'ICT',
                     'Pharmacie',
                     'Verpakking',
                     'Auto',
                     'Bouw',
                     'Cultuur',
                     'Dienstverlening',
                     'Elektro',
                     'Food',
                     'Groothandel',
                     'Handel',
                     'Industrie',
                     'Kantoor',
                     'Landbouw',
                     'Logistiek',
                     'Metaal',
                     'Non-profit',
                     'Sport',
                     'Techniek',
                     'Verhuur',
                     'Winkel',
                 ] as $industry) {
            factory(\App\Eco\Industry\Industry::class)->create(['name' => $industry]);
        }
    }
}