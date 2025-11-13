<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('free_fields_field_log', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('free_fields_field_record_id');
            $table->foreign('free_fields_field_record_id')
                ->references('id')->on('free_fields_field_records')
                ->onDelete('restrict');
            $table->string('changed_from', 10);
            $table->unsignedInteger('portal_user_id')->nullable();
            $table->foreign('portal_user_id')
                ->references('id')->on('portal_users')
                ->nullOnDelete();
            $table->unsignedInteger('user_id')->nullable();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->nullOnDelete();
            $table->mediumtext('old_value')->nullable();
            $table->mediumtext('new_value')->nullable();
            $table->timestamps();
        });

        //make permission and assign to roles inzake nieuw view permission housing_file_log
        Permission::create(['name' => 'view_free_fields_field_log', 'guard_name' => 'api']);
        $newViewRoles = [
            'Beheerder' => ['view_free_fields_field_log'],
        ];

        foreach($newViewRoles as $newViewRoleName => $permissions) {
            $role =  Role::findByName($newViewRoleName);
            $role->givePermissionTo($permissions);
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('free_fields_field_log');
        Permission::findByName('view_free_fields_field_log')->delete();
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

    }
};
