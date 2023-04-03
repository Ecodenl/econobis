<?php

use App\Eco\Intake\IntakeStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldCodeRefToIntakeStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('intake_status', function (Blueprint $table) {
            $table->string('code_ref')->nullable(true)->after('name');
            $table->integer('order')->nullable(true)->after('code_ref');;
        });

        $intakeStatus = IntakeStatus::where('name', 'Open')->first();
        $intakeStatus->code_ref = "open";
        $intakeStatus->order = 1;
        $intakeStatus->save();

        $intakeStatus = IntakeStatus::where('name', 'In behandeling')->first();
        $intakeStatus->code_ref = "in_progress";
        $intakeStatus->order = 2;
        $intakeStatus->save();

        $intakeStatus = IntakeStatus::where('name', 'Afgesloten zonder kans')->first();
        $intakeStatus->code_ref = "closed_without_opportunity";
        $intakeStatus->order = 3;
        $intakeStatus->save();

        $intakeStatus = IntakeStatus::where('name', 'Afgesloten met kans')->first();
        $intakeStatus->code_ref = "closed_with_opportunity";
        $intakeStatus->order = 4;
        $intakeStatus->save();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('intake_status', 'order'))
        {
            Schema::table('intake_status', function (Blueprint $table)
            {
                $table->dropColumn('order');
            });
        }
        if (Schema::hasColumn('intake_status', 'code_ref'))
        {
            Schema::table('intake_status', function (Blueprint $table)
            {
                $table->dropColumn('code_ref');
            });
        }
    }
}
