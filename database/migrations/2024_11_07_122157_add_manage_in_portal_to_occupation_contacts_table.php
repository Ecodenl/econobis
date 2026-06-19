<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('occupation_contact', function (Blueprint $table) {
            $table->boolean('allow_manage_in_portal')->default(false)->after('primary');
        });

        // Update for primary occupation contacts linked to an organisation contact
        DB::table('occupation_contact')
            ->where('primary', true)
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('contacts')
                    ->whereRaw('contacts.id = occupation_contact.primary_contact_id')
                    ->where('contacts.type_id', 'organisation');
            })
            ->update(['allow_manage_in_portal' => true]);

        // Update for primary occupation contacts linked to a person contact with portal-enabled occupation
        DB::table('occupation_contact')
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('contacts')
                    ->whereRaw('contacts.id = occupation_contact.primary_contact_id')
                    ->where('contacts.type_id', 'person');
            })
            ->whereExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('occupations')
                    ->whereRaw('occupations.id = occupation_contact.occupation_id')
                    ->where('occupations.occupation_for_portal', true);
            })
            ->update(['allow_manage_in_portal' => true]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('occupation_contact', function (Blueprint $table) {
            $table->dropColumn('allow_manage_in_portal');
        });
    }
};
