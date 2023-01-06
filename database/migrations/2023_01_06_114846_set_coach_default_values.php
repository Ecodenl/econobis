<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetCoachDefaultValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->integer('coach_max_appointments_per_week')->default(100)->change();
            $table->integer('coach_min_minutes_between_appointments')->default(30)->change();
        });

        foreach (\App\Eco\Contact\Contact::all() as $contact) {
            $contact->coach_max_appointments_per_week = 100;
            $contact->coach_min_minutes_between_appointments = 30;
            $contact->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->integer('coach_max_appointments_per_week')->nullable()->default(null)->change();
            $table->integer('coach_min_minutes_between_appointments')->nullable()->default(null)->change();
        });
    }
}
