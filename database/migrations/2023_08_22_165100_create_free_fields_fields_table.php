<?php

use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationHoomCampaign;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class CreateFreeFieldsFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('free_fields_fields', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('table_id');
            $table->foreign('table_id')
                ->references('id')->on('free_fields_tables')
                ->onDelete('restrict');

            $table->unsignedInteger('field_format_id');
            $table->foreign('field_format_id')
                ->references('id')->on('free_fields_field_formats')
                ->onDelete('restrict');

            $table->string('field_name');
            $table->boolean('visible_portal');
            $table->boolean('change_portal');
            $table->boolean('mandatory');
            $table->string('default_value');

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
        Schema::dropIfExists('free_fields_fields');
    }
}
