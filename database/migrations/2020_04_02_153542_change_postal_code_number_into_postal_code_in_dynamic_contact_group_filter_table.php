<?php

use App\Eco\ContactGroup\DynamicContactGroupFilter;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangePostalCodeNumberIntoPostalCodeInDynamicContactGroupFilterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $dynamicContactGroupFiltersToChange = DynamicContactGroupFilter::where('field', 'postalCodeNumber')->get();

        foreach($dynamicContactGroupFiltersToChange as $dynamicContactGroupFilterToChange){
            $dynamicContactGroupFilterToChange->field = 'postalCode';
            $dynamicContactGroupFilterToChange->save();
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
