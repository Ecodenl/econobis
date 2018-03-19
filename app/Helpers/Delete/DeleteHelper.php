<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete;

use App\Eco\ProductionProject\ProductionProject;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class DeleteHelper
{


    /** Delete a model and its relations
     *
     * @param Model    $model        The main model to delete
     *
     */
    public static function delete($model)
    {
        //Wrong call
        if(! $model instanceof Model){
            return false;
        }

        //Get info file from config
        $deleteInfo = config('delete.' . class_basename($model));

        //Check for generic relation deletes
        if (array_key_exists('relations', $deleteInfo)) {
            foreach ($deleteInfo['relations'] as $key => $relationInfo) {
                switch (key($deleteInfo['relations'][$key])) {
                    case 'dissociate':
                        DeleteHelper::dissociate($model, $relationInfo['dissociate']);
                        break;
                    case 'remove_pivots':
                        DeleteHelper::removePivots($model, $relationInfo['remove_pivots']);
                        break;
                    case 'delete_recursive':
                        DeleteHelper::deleteRecursive($model, $relationInfo['delete_recursive']);
                        break;
                    case 'remove':
                        DeleteHelper::remove($model, $relationInfo['remove']);
                        break;
                    default:
                        break;
                }
            }
        }

        //Any custom delete function
        if(array_key_exists('custom_delete', $deleteInfo)){

            $methodName = $deleteInfo['custom_delete'];
            DeleteHelper::$methodName($model);
        }

        //delete the actual model
        try {
            $deleteInfo['soft_delete'] ? $model->delete()
                : $model->forceDelete();
        }
        catch (\Exception $e){
            Log::error('Error deleting: ' . $e);
        }
    }

    private static function dissociate(Model $model, $relationInfo){
        $relation = $relationInfo['relation'];
        $foreign_key = $relationInfo['foreign_key'];

        foreach($model->$relation as $item){
            $item->$foreign_key = null;
            $item->save();
        }
    }

    private static function removePivots(Model $model, $relationInfo){
        $model->$relationInfo()->sync([]);
    }

    private static function deleteRecursive(Model $model, $relationInfo){
        if($model->$relationInfo instanceof Collection){
            foreach ($model->$relationInfo as $relatedModel){
                DeleteHelper::delete($relatedModel);
            }
        }
        else{
            DeleteHelper::delete($model->$relationInfo);
        }
    }

    private static function remove(Model $model, $relationInfo){
        $model->$relationInfo->forceDelete();
    }

    private static function deleteProductionProject(ProductionProject $productionProject){

        foreach ($productionProject->productionProjectValueCourses as $ppvc){
            $ppvc->forceDelete();
        }

        foreach ($productionProject->productionProjectRevenues as $ppr){
            foreach($ppr->distribution as $distribution){
                $distribution->forceDelete();
            }
            $ppr->forceDelete();
        }

        foreach ($productionProject->participantsProductionProject as $participant){
            foreach($participant->documents as $document){
                $document->participation_production_project_id = null;
                $document->save();
            }

            foreach($participant->transactions as $transaction){
                $transaction->forceDelete();
            }

            foreach($participant->obligationNumbers as $obligationNumber){
                $obligationNumber->forceDelete();
            }

            $participant->forceDelete();
        }
    }
}