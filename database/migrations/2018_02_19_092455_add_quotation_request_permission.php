<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddQuotationRequestPermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_quotation_request',
            'guard_name' => 'api',
        ]);

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        $energyAdvisor = Role::findByName('Energie adviseur');
        $energyAdvisor->syncPermissions(['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'manage_group', 'manage_opportunity', 'manage_task', 'manage_intake','manage_housing_file', 'manage_measure', 'create_document', 'view_document', 'view_audit_trail', 'create_mailbox', 'manage_quotation_request']);
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
