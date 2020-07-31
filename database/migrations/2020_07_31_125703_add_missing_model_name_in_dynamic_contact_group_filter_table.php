<?php

use App\Eco\ContactGroup\DynamicContactGroupFilter;
use App\Eco\EnergySupplier\EnergySupplier;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMissingModelNameInDynamicContactGroupFilterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $dynamicContactGroupFiltersToChange = DynamicContactGroupFilter::where('type', 'extraFilter')->whereNull('model_name')->get();

        foreach($dynamicContactGroupFiltersToChange as $dynamicContactGroupFilterToChange){
            $modelName = $this->getModelByField($dynamicContactGroupFilterToChange->field);
            if(!empty($modelName)){
//                print_r("Field: " . $dynamicContactGroupFilterToChange->field . " Missende model_name: " . $modelName . "\n");
            $dynamicContactGroupFilterToChange->model_name = $modelName;
            $dynamicContactGroupFilterToChange->save();
            }
        }
    }

    private function getModelByField(String $field){
        switch ($field){
            case 'typeId':
                return 'App\Eco\Contact\ContactType';
                break;
            case 'statusId':
                return 'App\Eco\Contact\ContactStatus';
                break;
            case 'occupation':
            case 'occupationPrimary':
                return 'App\Eco\Occupation\Occupation';
                break;
            case 'opportunity':
                return 'App\Eco\Measure\MeasureCategory';
                break;
            case 'country':
                return 'App\Eco\Country\Country';
                break;
            case 'staticContactGroup':
                return 'App\Eco\ContactGroup\ContactGroup';
                break;
            case 'product':
                return 'App\Eco\Product\Product';
                break;
            case 'energySupplier':
                return EnergySupplier::class;
                break;
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
