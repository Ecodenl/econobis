<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EanAddressChanges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('contact_energy_supply_type', ))
        {
            Schema::rename('contact_energy_supply_type', 'energy_supply_types');
        }
        if (Schema::hasTable('contact_energy_supply_status', ))
        {
            Schema::rename('contact_energy_supply_status', 'energy_supply_statuses');
        }

        Schema::create('address_energy_suppliers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('address_id');
            $table->foreign('address_id', 'address_es_address_id_foreign')
                ->references('id')->on('addresses')
                ->onDelete('restrict');

            $table->unsignedInteger('energy_supply_type_id');
            $table->foreign('energy_supply_type_id')
                ->references('id')->on('energy_supply_types')
                ->onDelete('restrict');

            $table->unsignedInteger('energy_supplier_id');
            $table->foreign('energy_supplier_id')
                ->references('id')->on('energy_suppliers')
                ->onDelete('restrict');
            $table->date('member_since')->nullable();
            $table->date('end_date')->nullable();

            $table->unsignedInteger('energy_supply_status_id')->nullable();
            $table->foreign('energy_supply_status_id', 'address_es_energy_supply_status_id_foreign')
                ->references('id')->on('energy_supply_statuses')
                ->onDelete('restrict');

            $table->date('switch_date')->nullable();

            $table->boolean('is_current_supplier')->default(false);
            $table->string('es_number')->nullable();

            $table->timestamps();

            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('update_by_id')->nullable();
            $table->foreign('update_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
        });

        Schema::table('addresses', function (Blueprint $table) {
            $table->string('ean_electricity')->nullable();
            $table->string('ean_gas')->nullable();
        });

        Schema::table('participation_project', function (Blueprint $table) {
            $table->unsignedInteger('address_id')->nullable()->after('project_id');
            $table->foreign('address_id')
                ->references('id')->on('addresses')
                ->onDelete('restrict');
        });

        if (Schema::hasTable('contact_energy_supplier', ))
        {
            Schema::table('project_revenues', function (Blueprint $table) {
                $table->dropForeign('project_revenues_contact_energy_supplier_id_foreign');
                $table->dropIndex('project_revenues_contact_energy_supplier_id_foreign');
            });

            Schema::table('contact_energy_supplier', function (Blueprint $table) {
                $table->unsignedInteger('address_id')->nullable();
                $table->unsignedInteger('address_energy_supplier_id')->nullable();
                $table->text('address_conversion_text')->default('');
            });

            Schema::rename('contact_energy_supplier', 'xxx_contact_energy_supplier');

            Schema::table('project_revenues', function (Blueprint $table) {
                $table->unsignedInteger('address_energy_supplier_id')->nullable()->default(null)->after('participation_id');
                $table->foreign('address_energy_supplier_id')
                    ->references('id')->on('address_energy_suppliers')
                    ->onDelete('restrict');
                $table->renameColumn('contact_energy_supplier_id', 'xxx_contact_energy_supplier_id');
            });

        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('project_revenues', 'address_energy_supplier_id')) {
            Schema::table('project_revenues', function (Blueprint $table) {
                $table->dropForeign('project_revenues_address_energy_supplier_id_foreign');
                $table->dropIndex('project_revenues_address_energy_supplier_id_foreign');
                $table->renameColumn('xxx_contact_energy_supplier_id', 'contact_energy_supplier_id');
                $table->dropColumn('address_energy_supplier_id');
            });
        }

        if (Schema::hasTable('xxx_contact_energy_supplier',)) {
            if (Schema::hasColumn('xxx_contact_energy_supplier', 'address_id')) {
                Schema::table('xxx_contact_energy_supplier', function (Blueprint $table) {
                    $table->dropColumn('address_id');
                });
            }
            if (Schema::hasColumn('xxx_contact_energy_supplier', 'address_energy_supplier_id')) {
                Schema::table('xxx_contact_energy_supplier', function (Blueprint $table) {
                    $table->dropColumn('address_energy_supplier_id');
                });
            }
            if (Schema::hasColumn('xxx_contact_energy_supplier', 'address_conversion_text')) {
                Schema::table('xxx_contact_energy_supplier', function (Blueprint $table) {
                    $table->dropColumn('address_conversion_text');
                });
            }
            Schema::rename('xxx_contact_energy_supplier', 'contact_energy_supplier');
        }

        if (Schema::hasColumn('participation_project', 'address_id')) {
            Schema::table('participation_project', function (Blueprint $table) {
                $table->dropForeign('participation_project_address_id_foreign');
                $table->dropColumn('address_id');
            });
        }
        if (Schema::hasColumn('addresses', 'ean_electricity')) {
            Schema::table('addresses', function (Blueprint $table) {
                $table->dropColumn('ean_electricity');
            });
        }
        if (Schema::hasColumn('addresses', 'ean_gas')) {
            Schema::table('addresses', function (Blueprint $table) {
                $table->dropColumn('ean_gas');
            });
        }
        Schema::dropIfExists('address_energy_suppliers');
        if (Schema::hasTable('energy_supply_statuses',)) {
            Schema::rename('energy_supply_statuses', 'contact_energy_supply_status');
        }
        if (Schema::hasTable('energy_supply_types',)) {
            Schema::rename('energy_supply_types', 'contact_energy_supply_type');
        }

        if (Schema::hasColumn('project_revenues', 'contact_energy_supplier_id')) {
            Schema::table('project_revenues', function (Blueprint $table) {
                $table->foreign('contact_energy_supplier_id')
                    ->references('id')->on('contact_energy_supplier')
                    ->onDelete('restrict');
            });
        }
    }
}
