<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ContactgroupNameUnique extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $this->renameContactgroups();

        Schema::table('contact_groups', function (Blueprint $table) {
            $table->string('name')->unique()->change();
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

    public function renameContactgroups(){
        $contactGroups = \App\Eco\ContactGroup\ContactGroup::withTrashed()->get();

        foreach ($contactGroups as $contactGroup){
            if(\App\Eco\ContactGroup\ContactGroup::withTrashed()->where('name', $contactGroup->name)->count() > 1){
                $contactGroupsFound = \App\Eco\ContactGroup\ContactGroup::withTrashed()->where('name', $contactGroup->name)->get();
                $i = 0;
                foreach ($contactGroupsFound as $contactGroupFound){
                    if($i > 0){
                        $contactGroupFound->name = $contactGroupFound->name . $i;
                        $contactGroupFound->save();
                    }
                    $i++;
                }
                $this->renameContactgroups();
            }
        }
    }
}
