<?php

use App\Eco\Invoice\Invoice;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LongFieldsToMediumText extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*
        Laravel bug https://github.com/laravel/framework/issues/17038
        */

        /*  revisions */
        \DB::statement('ALTER TABLE `revisions` MODIFY `old_value` MEDIUMTEXT');
        \DB::statement('ALTER TABLE `revisions` MODIFY `new_value` MEDIUMTEXT');

        /*document templates*/
        Schema::table('document_templates', function (Blueprint $table) {
            $table->mediumText('tmp_html_body')->nullable();
        });

        $documentTemplates = App\Eco\DocumentTemplate\DocumentTemplate::withTrashed()->get();

        foreach ($documentTemplates as $item) {
            $item->tmp_html_body = $item->html_body;
            $item->save();
        }

        Schema::table('document_templates', function (Blueprint $table) {
            $table->dropColumn('html_body');
            $table->renameColumn('tmp_html_body', 'html_body');
        });


        /*  email templates */
        Schema::table('email_templates', function (Blueprint $table) {
            $table->mediumText('tmp_html_body')->nullable();
        });

        $emailTemplates = App\Eco\EmailTemplate\EmailTemplate::withTrashed()->get();

        foreach ($emailTemplates as $item) {
            $item->tmp_html_body = $item->html_body;
            $item->save();
        }

        Schema::table('email_templates', function (Blueprint $table) {
            $table->dropColumn('html_body');
            $table->renameColumn('tmp_html_body', 'html_body');
        });

        /*  emails */
        Schema::table('emails', function (Blueprint $table) {
            $table->mediumText('tmp_html_body');
        });

        $emails = App\Eco\Email\Email::withTrashed()->get();

        foreach ($emails as $item) {
            $item->tmp_html_body = $item->html_body;
            $item->save();
        }

        Schema::table('emails', function (Blueprint $table) {
            $table->dropColumn('html_body');
            $table->renameColumn('tmp_html_body', 'html_body');
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
