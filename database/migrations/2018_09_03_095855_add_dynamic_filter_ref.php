<?php

use App\Eco\Address\Address;
use App\Eco\Contact\Contact;
use App\Eco\ContactNote\ContactNote;
use App\Eco\EmailAddress\EmailAddress;
use App\Eco\Organisation\Organisation;
use App\Eco\Person\Person;
use App\Eco\PhoneNumber\PhoneNumber;
use App\Eco\Task\Task;
use App\Eco\Task\TaskPropertyValue;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDynamicFilterRef extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dynamic_contact_group_filter', function (Blueprint $table) {
            $table->string('model_name')->nullable();
        });

        foreach (\App\Eco\ContactGroup\DynamicContactGroupFilter::all() as $dgf){
            switch ($dgf->field){
                case 'typeId':
                    $dgf->model_name = 'App\Eco\Contact\ContactType';
                    $dgf->save();
                    break;
                case 'statusId':
                    $dgf->model_name = 'App\Eco\Contact\ContactStatus';
                    $dgf->save();
                    break;
                case 'occupation':
                    $dgf->model_name = 'App\Eco\Occupation\Occupation';
                    $dgf->save();
                    break;
                case 'opportunity':
                    $dgf->model_name = 'App\Eco\Measure\MeasureCategory';
                    $dgf->save();
                    break;
                case 'product':
                    $dgf->model_name = 'App\Eco\Product\Product';
                    $dgf->save();
                    break;
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
        Schema::table('dynamic_contact_group_filter', function (Blueprint $table) {
            $table->dropColumn('model_name');
        });
    }
}
