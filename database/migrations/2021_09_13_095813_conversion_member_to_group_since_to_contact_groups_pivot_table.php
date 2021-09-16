<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;

class ConversionMemberToGroupSinceToContactGroupsPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $contactGroups = \App\Eco\ContactGroup\ContactGroup::all();

        foreach ($contactGroups as $contactGroup){
            if ($contactGroup->contacts->count() > 1) {
                foreach ($contactGroup->contacts as $contact) {
                    $contactGroupsPivot= $contactGroup->contacts()->where('contact_id', $contact->id)->first()->pivot;
                    if (!$contactGroupsPivot->member_to_group_since) {
                        $contactGroup->contacts()->updateExistingPivot($contact->id, ['member_to_group_since' => Carbon::parse($contactGroup->created_at)]);
                    }
                }
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
    }
}
