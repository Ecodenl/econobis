<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::table('document_templates', function (Blueprint $table) {
            $table->boolean('allow_change_html_body')->default(false);
        });
        Schema::table('documents', function (Blueprint $table) {
            $table->text('html_body')->nullable()->after('template_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn('html_body');
        });
        Schema::table('document_templates', function (Blueprint $table) {
            $table->dropColumn('allow_change_html_body');
        });
    }
};
