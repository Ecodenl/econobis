<?php

use App\Eco\Project\ProjectType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('participant_mutation_types')
            ->where('project_type_id', ProjectType::where('code_ref', 'obligation')->first()->id)
            ->where('code_ref', 'result_deposit')
            ->update([
                'description' => 'Uitkering handmatig'
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('participant_mutation_types')
            ->where('project_type_id', ProjectType::where('code_ref', 'obligation')->first()->id)
            ->where('code_ref', 'result_deposit')
            ->update([
                'description' => 'Resultaat bijschrijven'
            ]);
    }
};
