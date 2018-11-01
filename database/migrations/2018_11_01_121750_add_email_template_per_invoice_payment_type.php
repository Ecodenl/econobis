<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEmailTemplatePerInvoicePaymentType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id_collection')->nullable();
            $table->foreign('email_template_id_collection')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
        });

        Schema::table('administrations', function (Blueprint $table) {
            $table->unsignedInteger('email_template_id_collection')->nullable();
            $table->foreign('email_template_id_collection')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
        });

        $orders = App\Eco\Order\Order::withTrashed()->get();

        foreach ($orders as $item) {
            $item->email_template_id_collection = $item->email_template_id;
            $item->save();
        }

        $administrations = App\Eco\Administration\Administration::withTrashed()->get();

        foreach ($administrations as $item) {
            $item->email_template_id_collection = $item->email_template_id;
            $item->save();
        }

        Schema::table('administrations', function (Blueprint $table) {
            $table->renameColumn('email_template_id', 'email_template_id_transfer');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->renameColumn('email_template_id', 'email_template_id_transfer');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('orders', function (Blueprint $table) {
            $table->renameColumn('email_template_id_transfer', 'email_template_id');
            $table->dropForeign(['email_template_id_collection']);
            $table->dropColumn('email_template_id_collection');
        });

        Schema::table('administrations', function (Blueprint $table) {
            $table->renameColumn('email_template_id_transfer', 'email_template_id');
            $table->dropForeign(['email_template_id_collection']);
            $table->dropColumn('email_template_id_collection');
        });

    }
}
