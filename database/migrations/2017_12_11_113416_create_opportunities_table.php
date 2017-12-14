<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOpportunitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $superuserRole = \Spatie\Permission\Models\Role::get(1);

        $permissions = [
            'manage_changes'
        ];

        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole->syncPermissions(\Spatie\Permission\Models\Permission::all());

        Schema::create('opportunity_reactions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        $opportunityReasons = [
            'Positief',
            'Negatief',
            'Niet gelukt',
            'Geen',
        ];

        foreach ($opportunityReasons as $reason) {
            DB::table('opportunity_reactions')->insert([
                    ['name' => $reason],
                ]
            );
        }

        Schema::create('opportunity_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        $opportunityStatus = [
            'Actief',
            'Gewonnen',
            'In afwachting',
            'Verloren',
            'Gewonnen, doe het zelf',
        ];

        foreach ($opportunityStatus as $status) {
            DB::table('opportunity_status')->insert([
                    ['name' => $status],
                ]
            );
        }
        Schema::create('opportunities', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('measure_id');
            $table->foreign('measure_id')
                ->references('id')->on('measures')
                ->onDelete('restrict');
            $table->unsignedInteger('contact_id');
            $table->foreign('contact_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->string('number');
            $table->unsignedInteger('reaction_id')->nullable();
            $table->foreign('reaction_id')
                ->references('id')->on('opportunity_reactions')
                ->onDelete('restrict');
            $table->unsignedInteger('status_id');
            $table->foreign('status_id')
                ->references('id')->on('opportunity_status')
                ->onDelete('restrict');
            $table->unsignedInteger('registration_id')->nullable();
            $table->foreign('registration_id')
                ->references('id')->on('registrations')
                ->onDelete('restrict');
            $table->unsignedInteger('campaign_id')->nullable();
            $table->foreign('campaign_id')
                ->references('id')->on('campaigns')
                ->onDelete('restrict');
            $table->string('quotation_text')->nullable();
            $table->date('desired_date')->nullable();
            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->unsignedInteger('owned_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
            $table->timestamps();
        });

        Schema::create('quotations_opportunities', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('opportunity_id');
            $table->foreign('opportunity_id')
                ->references('id')->on('opportunities')
                ->onDelete('restrict');
            $table->unsignedInteger('organisation_id');
            $table->foreign('organisation_id')
                ->references('id')->on('contacts')
                ->onDelete('restrict');
            $table->date('date_requested')->nullable();
            $table->date('date_taken')->nullable();
            $table->date('date_valid_till')->nullable();
            $table->date('date_realised')->nullable();
            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
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
        Schema::dropIfExists('opportunity_reactions');
        Schema::dropIfExists('opportunity_status');
        Schema::dropIfExists('opportunities');
    }
}
