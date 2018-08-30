<?php

use App\Eco\Administration\Sepa;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PaymentInvoices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('invoice_number');
            $table->string('number');

            $table->unsignedInteger('revenue_distribution_id');
            $table->foreign('revenue_distribution_id')
                ->references('id')->on('production_project_revenue_distribution')
                ->onDelete('restrict');

            $table->unsignedInteger('administration_id');
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');

            $table->string('status_id');

            $table->date('date_paid')->nullable();

            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('sepa_id')->nullable();
            $table->foreign('sepa_id')
                ->references('id')->on('sepas')
                ->onDelete('restrict');

            $table->softdeletes();
            $table->timestamps();
        });

        $sepas = Sepa::withTrashed()->get();

        Schema::table('sepas', function (Blueprint $table) {
            $table->string('sepa_type_id')->nullable();
        });

        foreach ($sepas as $sepa){
            $sepa->sepa_type_id = 'debit';
            $sepa->save();
        }

        Schema::table('sepas', function (Blueprint $table) {
            $table->string('sepa_type_id')->nullable(false)->change();
        });

        Schema::table('production_projects', function (Blueprint $table) {
            $table->unsignedInteger('administration_id')->nullable();
            $table->foreign('administration_id')
                ->references('id')->on('administrations')
                ->onDelete('restrict');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_invoices');
    }
}
