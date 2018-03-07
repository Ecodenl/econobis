<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $superuserRole = \Spatie\Permission\Models\Role::find(1);

        $permissions = [
            'manage_marketing'
        ];

        foreach ($permissions as $permissionName) {
            \Spatie\Permission\Models\Permission::create([
                    'name' => $permissionName,
                    'guard_name' => 'api',
                ]
            );
        }

        $superuserRole->syncPermissions(\Spatie\Permission\Models\Permission::all());

        Schema::create('campaign_status', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        $campaignStatus = [
            'Niet gestart',
            'Gestart',
            'In afwachting',
            'Klaar',
        ];

        foreach ($campaignStatus as $status) {
            DB::table('campaign_status')->insert([
                    ['name' => $status],
                ]
            );
        }

        Schema::create('campaign_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
        });

        $campaignType = [
            'Huis aan huis',
            'Email',
            'Internet',
            'Campagne op maat',
            'Energiecafé',
        ];

        foreach ($campaignType as $type) {
            DB::table('campaign_types')->insert([
                    ['name' => $type],
                ]
            );
        }


        Schema::table('campaigns', function (Blueprint $table) {
            $table->string('number');
            $table->string('description')->nullable();

            $table->unsignedInteger('status_id')->nullable();
            $table->foreign('status_id')
                ->references('id')->on('campaign_status')
                ->onDelete('restrict');

            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->unsignedInteger('type_id');
            $table->foreign('type_id')
                ->references('id')->on('campaign_types')
                ->onDelete('restrict');

            $table->unsignedInteger('created_by_id')->nullable();
            $table->foreign('created_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');

            $table->unsignedInteger('owned_by_id')->nullable();
            $table->foreign('owned_by_id')
                ->references('id')->on('users')
                ->onDelete('restrict');
        });

        Schema::create('campaign_responses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('campaign_id');
            $table->unsignedInteger('contact_id');
            $table->date('date_responded');
            $table->timestamps();
        });

        Schema::create('campaign_measure', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id');
            $table->unsignedInteger('measure_id');
            $table->timestamps();
            $table->primary(['campaign_id', 'measure_id']);
        });

        Schema::create('campaign_organisation', function (Blueprint $table) {
            $table->unsignedInteger('campaign_id');
            $table->unsignedInteger('organisation_id');
            $table->timestamps();
            $table->primary(['campaign_id', 'organisation_id']);
        });
    }




    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
