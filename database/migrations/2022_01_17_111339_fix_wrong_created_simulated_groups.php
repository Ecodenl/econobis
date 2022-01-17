<?php

use App\Eco\ContactGroup\ContactGroup;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class FixWrongCreatedSimulatedGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $simulatedGroups = ContactGroup::where('type_id', 'simulated')->whereNull('simulated_group_id')->get();
        foreach ($simulatedGroups as $simulatedGroup){
            $linkedToContactGroup = ContactGroup::where('type_id', 'simulated')->where('simulated_group_id', $simulatedGroup->id)->exists();
            if( $linkedToContactGroup ) {
                Log::info('Verwijder simulated contactgroup : ' . $simulatedGroup->id . '.' );
                $simulatedGroup->delete();
            }
        }

        $simulatedGroups2 = ContactGroup::where('type_id', 'simulated')->whereNotNull('simulated_group_id')->orderBy('simulated_group_id', 'asc')->get();
        foreach ($simulatedGroups2 as $simulatedGroup2){
            $linkedToContactGroup2 = ContactGroup::whereNotIn('type_id', ['simulated'])->where('simulated_group_id', $simulatedGroup2->id)->exists();
            if( $linkedToContactGroup2 ){
                Log::info('Correcte simulated contactgroup : ' . $simulatedGroup2->id . '. Maak simulated_group_id ' . $simulatedGroup2->simulated_group_id . ' leeg.' );
                $simulatedGroup2->simulated_group_id = null;
                $simulatedGroup2->save();
            } else {
                Log::info('Verwijder simulated contactgroup : ' . $simulatedGroup2->id . ' met simulated_group_id ' . $simulatedGroup2->simulated_group_id . '.' );
                $simulatedGroup2->delete();
            }

        }
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
