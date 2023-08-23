<?php

use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationHoomCampaign;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class CreateFreeFieldsFieldRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('free_fields_field_records', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('field_id');
            $table->foreign('field_id')
                ->references('id')->on('free_fields_fields');

            $table->unsignedInteger('table_record_id');

            $table->text('field_value_text')->nullable();
            $table->boolean('field_value_boolean')->nullable();
            $table->integer('field_value_int')->nullable();
            $table->double('field_value_double')->nullable();
            $table->datetime('field_value_datetime')->nullable();

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
        Schema::dropIfExists('free_fields_field_records');
    }
}
