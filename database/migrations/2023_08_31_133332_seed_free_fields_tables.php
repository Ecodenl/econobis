<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class SeedFreeFieldsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //make permission and assign to roles inzake nieuw view permission manage_free_fields
        Permission::create(['name' => 'manage_free_fields', 'guard_name' => 'api']);
        $newViewRoles = [
            'Key user' => ['manage_free_fields'],
        ];
        foreach($newViewRoles as $newViewRoleName => $permissions) {
            $role =  Role::findByName($newViewRoleName);
            $role->givePermissionTo($permissions);
        }

        DB::table('free_fields_tables')->insert([
            ['table'=> 'contacts', 'name'=> 'Contacten'],
            ['table'=> 'addresses', 'name'=> 'Adressen'],
            ['table'=> 'projects', 'name'=> 'Projecten'],
        ]);

        DB::table('free_fields_field_formats')->insert([
            ['format_type'=> 'boolean', 'format_name'=> 'Schuifje (Ja/Nee)', 'format_length'=> 1, 'format_decimals'=> 0],
            ['format_type'=> 'text_short', 'format_name'=> 'Korte tekst', 'format_length'=> 191, 'format_decimals'=> 0],
            ['format_type'=> 'text_long', 'format_name'=> 'Lange tekst', 'format_length'=> 0, 'format_decimals'=> 0],
            ['format_type'=> 'int', 'format_name'=> 'Numeriek geen decimalen', 'format_length'=> 10, 'format_decimals'=> 0],
            ['format_type'=> 'double_2_dec', 'format_name'=> 'Numeriek 2 decimalen', 'format_length'=> 11, 'format_decimals'=> 2],
            ['format_type'=> 'amount_euro', 'format_name'=> 'Bedrag', 'format_length'=> 11, 'format_decimals'=> 2],
            ['format_type'=> 'date', 'format_name'=> 'Datum', 'format_length'=> 0, 'format_decimals'=> 0],
            ['format_type'=> 'datetime', 'format_name'=> 'Datum met tijd', 'format_length'=> 0, 'format_decimals'=> 0],
        ]);

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
