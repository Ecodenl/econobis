<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCurrentObligationsPcrLoanToContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->integer('obligations_current')->default(0)->after('iban_attn');
            $table->integer('loan_current')->default(0)->after('participations_current');
            $table->integer('postalcode_link_capital_current')->default(0)->after('participations_current');
        });

        $contacts = \App\Eco\Contact\Contact::all();

        foreach ($contacts as $contact){
            $obligations = 0;
            $participations = 0;
            $pcr = 0;
            $loan = 0;

            foreach ($contact->participations as $participation){
                $projectCodeRef = $participation->project->projectType->code_ref;
                switch ($projectCodeRef) {
                    case 'obligation':
                        $obligations += $participation->participations_definitive;
                        break;
                    case 'capital':
                        $participations += $participation->participations_definitive;
                        break;
                    case 'postalcode_link_capital':
                        $pcr += $participation->participations_definitive;
                        break;
                    case 'loan':
                        $loan += $participation->amount_definitive;
                        break;
                }
            }
            $contact->obligations_current = $obligations;
            $contact->participations_current = $participations;
            $contact->postalcode_link_capital_current = $pcr;
            $contact->loan_current = $loan;
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
            $table->dropColumn('obligations_current');
            $table->dropColumn('postalcode_link_capital_current');
            $table->dropColumn('loan_current');
        });
    }
}
