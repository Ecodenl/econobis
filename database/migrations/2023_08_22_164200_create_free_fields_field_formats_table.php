<?php

use App\Eco\Cooperation\Cooperation;
use App\Eco\Cooperation\CooperationHoomCampaign;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class CreateFreeFieldsFieldFormatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('free_fields_field_formats', function (Blueprint $table) {
            $table->increments('id');
            $table->string('format_type');
            $table->string('format_name');
            $table->unsignedInteger('format_length');
            $table->unsignedInteger('format_decimals');

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
        Schema::dropIfExists('free_fields_field_formats');
    }
}
