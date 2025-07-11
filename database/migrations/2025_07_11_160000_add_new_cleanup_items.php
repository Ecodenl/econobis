<?php

use App\Eco\Cooperation\Cooperation;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AddNewCleanupItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cooperation_cleanup_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('cooperation_id')->nullable();
            $table->foreign('cooperation_id')->references('id')->on('cooperations');
            $table->string('name');
            $table->string('code_ref');
            $table->unsignedInteger('years_for_delete')->default(7);
            $table->string('date_ref')->nullable();
            $table->unsignedInteger('number_of_items_to_delete')->default(0);
            $table->datetime('date_cleaned_up')->nullable();
            $table->datetime('date_determined')->nullable();

            $table->timestamps();
        });

        $this->fillCooperationCleanupItems();

        Schema::table('cooperations', function (Blueprint $table) {
            $table->boolean('cleanup_email')->default(0);
            $table->datetime('cleanup_years_contact_date_last_run_at')->nullable();
            $table->string('cleanup_excluded_group_ids')->nullable();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->boolean('cleanup_exception')->default(false);
        });

        //create the new role
        $role =  Role::create([
            'name' => 'Data opschoner',
            'guard_name' => 'api',
        ]);

        //create the permission
        Permission::create([
                'name' => 'menu_data_cleanup',
                'guard_name' => 'api',
            ]
        );
        //create the permission
        Permission::create([
                'name' => 'manage_cleanup_exception_products',
                'guard_name' => 'api',
            ]
        );

        //link the new role to the new permissions
        $role->givePermissionTo([
            'menu_data_cleanup',
            'manage_cleanup_exception_products',
        ]);

        //link the new permission to the Beheerder role
        $superuserRole = Role::findByName('Beheerder');
        if ($superuserRole) {
            $superuserRole->syncPermissions(Permission::all());
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Permission::where('name', 'manage_cleanup_exception_products')->delete();
        Permission::where('name', 'menu_data_cleanup')->delete();
        Role::where('name', 'Data opschoner')->delete();

        $superuserRole = Role::findByName('Beheerder');
        if ($superuserRole) {
            $superuserRole->syncPermissions(Permission::all());
        }

        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('cleanup_exception');
        });

        Schema::table('cooperations', function (Blueprint $table) {
            $table->dropColumn(['cleanup_excluded_group_ids', 'cleanup_years_contact_date_last_run_at', 'cleanup_email']);
        });

        Schema::dropIfExists('cooperation_cleanup_items');
    }

    /**
     * @return void
     */
    private function fillCooperationCleanupItems(): void
    {
        $cooperation = Cooperation::first();

        $cleanupItems = [
            [
                'name' => 'Nota\'s',
                'code_ref' => 'invoices',
                'date_ref' => 'Datum verstuurd'
            ],
            [
                'name' => 'Eenmalige orders',
                'code_ref' => 'ordersOneoff',
                'date_ref' => 'Ingangsdatum'
            ],
            [
                'name' => 'Periodieke orders',
                'code_ref' => 'ordersPeriodic',
                'date_ref' => 'Beëindigingsdatum'
            ],
            [
                'name' => 'Intakes',
                'code_ref' => 'intakes',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'name' => 'Kansen',
                'code_ref' => 'opportunities',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'name' => 'Deelnames zonder status Definitief',
                'code_ref' => 'participationsWithoutStatusDefinitive',
                'date_ref' => 'Mutatiedatum'
            ],
            [
                'name' => 'Deelnames met status Beëindigd',
                'code_ref' => 'participationsFinished',
                'date_ref' => 'Beëindigingsdatum'
            ],
            [
                'name' => 'Verplaats binnengekomen e-mailcorrespondentie naar de e-mailarchief map',
                'code_ref' => 'incomingEmails',
                'date_ref' => ''
            ],
            [
                'name' => 'Verplaats uitgaande e-mailcorrespondentie naar de e-mailarchief map',
                'code_ref' => 'outgoingEmails',
                'date_ref' => ''
            ],
            [
                'name' => 'Contacten',
                'code_ref' => 'contacts',
                'date_ref' => ''
            ],
        ];

        foreach ($cleanupItems as $cleanupItem) {
            DB::table('cooperation_cleanup_items')->insert([
                'cooperation_id' => $cooperation?->id ?: null,
                'name' => $cleanupItem['name'],
                'code_ref' => $cleanupItem['code_ref'],
                'date_ref' => $cleanupItem['date_ref']
            ]);
        }
    }
}
