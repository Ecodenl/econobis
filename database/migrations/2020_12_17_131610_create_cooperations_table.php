<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateCooperationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cooperations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('city')->nullable();
            $table->string('kvk_number')->nullable();
            $table->string('btw_number')->nullable();
            $table->text('iban')->nullable();
            $table->text('iban_attn')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('logo_filename')->nullable();
            $table->string('logo_name')->nullable();
            $table->string('hoom_link')->nullable();
            $table->string('hoom_key')->nullable();
            $table->unsignedInteger('hoom_email_template_id')->nullable();
            $table->foreign('hoom_email_template_id')
                ->references('id')->on('email_templates')
                ->onDelete('restrict');
            $table->unsignedInteger('hoom_group_id')->nullable();
            $table->foreign('hoom_group_id')
                ->references('id')->on('contact_groups')
                ->onDelete('restrict');
            $table->unsignedInteger('created_by_id');
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('updated_by_id');
            $table->foreign('updated_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->timestamps();
            $table->softdeletes();
        });

        Permission::create([
            'name' => 'manage_cooperation_settings',
            'guard_name' => 'api',
        ]);

        $role = Role::create([
            'name' => 'Beheerder coöperatie instellingen',
            'guard_name' => 'api',
        ]);
        $role->syncPermissions(['manage_cooperation_settings']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cooperations');
    }
}
