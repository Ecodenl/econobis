<?php

use App\Eco\Cooperation\Cooperation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCooperationCleanupItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cooperation_cleanup_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cooperation_id');
            $table->foreign('cooperation_id')->references('id')->on('cooperations');
            $table->string('name');
            $table->string('code_ref');
            $table->unsignedInteger('years_for_delete')->default(7);
            $table->string('date_ref')->nullable();
            $table->unsignedInteger('number_of_items_to_delete')->default(0);
            $table->datetime('date_cleaned_up')->nullable();
            $table->datetime('date_determined')->nullable();
        });

        $cooperation = Cooperation::first();

        $cleanupItems = [
            0 => [
                'name' => 'Nota\'s',
                'code_ref' => 'invoices',
                'date_ref' => 'Datum verstuurd'
            ],
            1 => [
                'name' => 'Eenmalige orders',
                'code_ref' => 'orders_oneoff',
                'date_ref' => 'Ingangsdatum'
            ],
            2 => [
                'name' => 'Periodieke orders',
                'code_ref' => 'orders_periodic',
                'date_ref' => 'Beëindigingsdatum'
            ],
            3 => [
                'name' => 'Intakes',
                'code_ref' => 'intakes',
                'date_ref' => 'Mutatiedatum'
            ],
            4 => [
                'name' => 'Kansen',
                'code_ref' => 'opportunities',
                'date_ref' => 'Mutatiedatum'
            ],
            5 => [
                'name' => 'Deelnames met status Interesse, Ingeschreven of toegekend',
                'code_ref' => 'participations_with_status',
                'date_ref' => 'Mutatiedatum'
            ],
            6 => [
                'name' => 'Deelnames met status Beëindigd',
                'code_ref' => 'participations_finished',
                'date_ref' => 'Beëindigingsdatum'
            ],
            7 => [
                'name' => 'Verplaats binnengekomen e-mailcorrespondentie naar de e-mailarchief map',
                'code_ref' => 'email_incoming',
                'date_ref' => ''
            ],
            8 => [
                'name' => 'Verplaats uitgaande e-mailcorrespondentie naar de e-mailarchief map',
                'code_ref' => 'email_outgoing',
                'date_ref' => ''
            ],
            9 => [
                'name' => 'Contacten',
                'code_ref' => 'contacts',
                'date_ref' => ''
            ],
        ];

        foreach($cleanupItems as $cleanupItem) {
            DB::table('cooperation_cleanup_items')->insert([
                'cooperation_id' => $cooperation->id,
                'name' => $cleanupItem['name'],
                'code_ref' => $cleanupItem['code_ref'],
                'date_ref' => $cleanupItem['date_ref']
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cooperation_cleanup_items');
    }
}
