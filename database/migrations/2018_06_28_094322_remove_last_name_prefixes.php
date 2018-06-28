<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveLastNamePrefixes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //ophalen
       $lastNamePrefixes = \App\Eco\LastNamePrefix\LastNamePrefix::all();


        //fk weg
        Schema::table('people', function (Blueprint $table) {
            $table->dropForeign(['last_name_prefix_id']);
        });

        //int naar string
        Schema::table('people', function ($table) {
            $table->string('last_name_prefix_id', 155)->nullable()->change();
        });

        //van id naar text vervangen
        $people = \App\Eco\Person\Person::all();

        foreach ($people as $person){

            if($person->last_name_prefix_id === null){
                continue;
            }
            if($person->last_name_prefix_id === 0){
                $person->last_name_prefix_id = null;
            }
            else{
                $lnpf = $lastNamePrefixes->filter(function ($lastNamePrefix) use ($person) {
                    return $lastNamePrefix->id == $person->last_name_prefix_id;
                });

                $person->last_name_prefix_id = $lnpf->first()->name;
            }

            $person->save();
        }

        //renamen
        Schema::table('people', function($t) {
            $t->renameColumn('last_name_prefix_id', 'last_name_prefix');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
