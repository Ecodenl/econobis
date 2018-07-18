<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DynamicGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('type_id')->nullable();
        });

        foreach (\App\Eco\ContactGroup\ContactGroup::all() as $cg){
            $cg->type_id = 'static';
            $cg->save();
        }

        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('type_id')->nullable(false)->change();
            $table->boolean('show_contact_form')->default(false);
            $table->boolean('show_portal')->default(false);
            $table->boolean('edit_portal')->default(false);
        });

        Schema::create('dynamic_contact_group_filter', function (Blueprint $table) {
            $table->increments('id');
            $table->string('field');
            $table->string('comperator');
            $table->string('data');
            $table->string('type');
            $table->unsignedInteger('contact_group_id');
            $table->foreign('contact_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dynamic_contact_group_filter');

        Schema::table('contact_groups', function (Blueprint $table) {
            $table->dropColumn('type_id');
        });
    }
}
