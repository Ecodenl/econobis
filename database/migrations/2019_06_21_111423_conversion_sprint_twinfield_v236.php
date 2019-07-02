<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConversionSprintTwinfieldV236 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Eenmalige producten met 0% BTW voorzien van ledger_id = 1
        DB::statement("UPDATE products INNER JOIN price_history_product ON products.id = price_history_product.product_id SET products.ledger_id = 1
        WHERE products.ledger_id is Null AND products.deleted_at is Null AND products.code='EMP' AND ( price_history_product.vat_percentage=0 OR price_history_product.vat_percentage is Null)");
        // Eenmalige producten met 9% BTW voorzien van ledger_id = 2
        DB::statement("UPDATE products INNER JOIN price_history_product ON products.id = price_history_product.product_id SET products.ledger_id = 2
        WHERE products.ledger_id is Null AND products.deleted_at is Null AND products.code='EMP' AND price_history_product.vat_percentage IN ( 6, 9 )");
        // Eenmalige producten met 21% BTW voorzien van ledger_id = 3
        DB::statement("UPDATE products INNER JOIN price_history_product ON products.id = price_history_product.product_id SET products.ledger_id = 3
        WHERE products.ledger_id is Null AND products.deleted_at is Null AND products.code='EMP' AND price_history_product.vat_percentage=21");

        // Contacten voorzien van incasso gegevens uit actieve orders met betaalwijze Incasso.
        DB::statement("UPDATE contacts INNER JOIN orders ON contacts.id = orders.contact_id
        INNER JOIN order_product ON orders.id = order_product.order_id
        INNER JOIN products ON order_product.product_id = products.id
        SET contacts.is_collect_mandate = 1, contacts.collect_mandate_code = orders.number, contacts.collect_mandate_signature_date = order_product.date_start, contacts.collect_mandate_first_run_date = order_product.date_start
        WHERE contacts.is_collect_mandate = 0 AND orders.status_id='active' AND orders.payment_type_id='collection' AND orders.collection_frequency_id <>'once'
        AND contacts.deleted_at is Null AND orders.deleted_at is Null AND products.deleted_at is Null");

        //Voor als je migration wilt meerder malen wilt testen
        //dd('test migration');
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
