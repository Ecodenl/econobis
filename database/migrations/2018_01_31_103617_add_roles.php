<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //rename super user
        $superuserRole = Role::findByName('superuser');
        $superuserRole->name = 'Key user';
        $superuserRole->save();
        $superuserRole->syncPermissions(Permission::all());

        \Spatie\Permission\Models\Permission::create([
            'name' => 'manage_housing_file',
            'guard_name' => 'api',
        ]);

        $superuserRole = Role::findByName('Key user');
        $superuserRole->syncPermissions(Permission::all());

        //make roles
        $roles = ['Medewerker' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'manage_task', 'create_document', 'view_document', 'view_audit_trail', 'view_mailbox'],
            'Medewerker 2'  => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'update_contact_iban', 'update_contact_owner', 'manage_group', 'manage_task', 'create_document', 'view_document', 'view_audit_trail', 'view_mailbox'],
            'Projectmedewerker' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'manage_group', 'manage_task', 'create_document', 'view_document', 'create_document_template', 'view_document_template', 'view_audit_trail', 'view_mailbox', 'create_mailbox'],
            'Financieel medewerker' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'delete_organisation', 'update_contact_iban', 'manage_group', 'manage_task', 'create_document', 'view_document', 'create_document_template', 'view_document_template', 'view_audit_trail', 'view_mailbox', 'create_mailbox'],
            'Financieel controller' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'delete_organisation', 'update_contact_iban', 'manage_group', 'manage_task', 'create_document', 'view_document', 'create_document_template', 'view_document_template', 'view_audit_trail', 'view_mailbox', 'create_mailbox'],
            'Participatie medewerker' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'update_contact_iban', 'manage_group', 'manage_task', 'create_document', 'view_document', 'create_document_template', 'view_document_template', 'view_audit_trail', 'view_mailbox', 'create_mailbox'],
            'Energie adviseur' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'manage_group', 'manage_opportunity', 'manage_task', 'manage_intake','manage_housing_file', 'manage_measure', 'create_document', 'view_document', 'view_audit_trail', 'create_mailbox'],
            'Marketing medewerker' => ['create_person', 'view_person', 'update_person', 'delete_person', 'create_organisation', 'view_organisation', 'update_organisation', 'manage_group', 'manage_task', 'manage_marketing', 'create_document', 'view_document', 'create_document_template', 'view_document_template', 'view_audit_trail', 'view_mailbox', 'create_mailbox']
        ];

        foreach($roles as $role => $permissions) {
           $role =  \Spatie\Permission\Models\Role::create([
                'name' => $role,
                'guard_name' => 'api',
            ]);
            $role->syncPermissions($permissions);

        }

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
