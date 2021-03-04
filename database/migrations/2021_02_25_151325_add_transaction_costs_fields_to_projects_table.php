<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTransactionCostsFieldsToProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('text_transaction_costs')->default('');
            $table->string('transaction_costs_code_ref', 16)->nullable()->default(null);
            $table->double('transaction_costs_amount', 10, 2)->nullable();
            $table->double('transaction_costs_percentage', 10, 2)->nullable();
        });

        $defaultTextTransactionCosts = 'Transactiekosten';
        $defaultTransactionCostsCodeRef = 'none';

        $projects = \App\Eco\Project\Project::all();

        foreach ($projects as $project){
            $project->text_transaction_costs = $defaultTextTransactionCosts;
            $project->transaction_costs_code_ref =$defaultTransactionCostsCodeRef;
            $project->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('text_transaction_costs');
            $table->dropColumn('transaction_costs_code_ref');
            $table->dropColumn('transaction_costs_amount');
            $table->dropColumn('transaction_costs_percentage');
        });
    }
}
