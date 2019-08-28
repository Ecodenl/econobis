<?php

use App\Eco\Occupation\OccupationContact;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ChangeOccupationPerson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('occupation_contact', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('occupation_id');
            $table->foreign('occupation_id')
                ->references('id')->on('occupations')
                ->onDelete('restrict');

            $table->unsignedInteger('primary_contact_id');
            $table->foreign('primary_contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');

            $table->unique(['occupation_id', 'primary_contact_id', 'contact_id'], 'unique_3_keys');

            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('primary')->default(false);
            $table->timestamps();
        });

        $occupation_persons = DB::table('occupation_person')->get();

        foreach($occupation_persons as $occupation_person){
            $occupationContact = new OccupationContact();
            $occupationContact->occupation_id = $occupation_person->occupation_id;

            $occupationContact->primary_contact_id = Person::find($occupation_person->person_id)->first()->value('contact_id');
            $occupationContact->contact_id = Organisation::find($occupation_person->organisation_id)->first()->value('contact_id');

            $occupationContact->start_date = $occupation_person->start_date;
            $occupationContact->end_date = $occupation_person->end_date;
            $occupationContact->primary = $occupation_person->primary;
            $occupationContact->save();
        }

        Schema::dropIfExists('occupation_person');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('occupation_contact');

        Schema::create('occupation_person', function (Blueprint $table) {
            $table->unsignedInteger('occupation_id')->nullable();
            $table->foreign('occupation_id')
                ->references('id')->on('occupations')
                ->onDelete('restrict');

            $table->unsignedInteger('person_id')->nullable();
            $table->foreign('person_id')
                ->references('id')->on('people')
                ->onDelete('restrict');

            $table->unsignedInteger('organisation_id')->nullable();
            $table->foreign('organisation_id')
                ->references('id')->on('organisations')
                ->onDelete('restrict');

            $table->primary(['occupation_id', 'person_id', 'organisation_id'], 'primary_3_keys');

            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('primary')->default(false);
            $table->timestamps();
        });


    }
}
