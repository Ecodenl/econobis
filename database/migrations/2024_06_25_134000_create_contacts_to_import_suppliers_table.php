<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateContactsToImportSuppliersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_to_import_suppliers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->string('code_ref');
            $table->string('supplier');
            $table->text('file_header');
            $table->timestamps();
        });

        DB::table('contact_to_import_suppliers')->insert([
                [
                    'type' => 'csv',
                    'code_ref' => 'om',
                    'supplier' => 'Samen OM',
                    'file_header' => 'Coöperatie;Aanhef;Klant_Voornaam;Klant_Achternaam;Klant_Type;WebID;Klantnummer;EAN;EAN_Status;EAN_Type;EAN_Start;EAN_Eind;EAN_Adres;EAN_Postcode;EAN_Plaats;Verblijfsfunctie;Contract;Contract_Start;Contract_Eind;Termijnbedrag;SJV_LVR;SJV_TLV;NB_SJV_LVR;NB_SJV_TLV;Meterstatus;FacturenVia;Rekeningnummer;Betaalwijze;Email_Contact;Email_Facturen;Telefoonnummer;Geboortedatum;KvK;Nieuwsbrief_coöp;Nieuwsbrief_om;Herkomst;Bron;Jaarafrekenmoment;Actiecode;Marge_Factor;Marge_Factor_Reden;Ambassadeurscode',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]
            ]
        );


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contacts_to_import_suppliers');
        Schema::dropIfExists('contact_to_import_suppliers');
    }
}
