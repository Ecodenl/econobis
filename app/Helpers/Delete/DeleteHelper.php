<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete;

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
    public static function delete(Model $model)
    {
        //Get info file from config
        $deleteInfo = config('delete.' . class_basename($model));

        if (array_key_exists('relations', $deleteInfo)) {
            foreach ($deleteInfo['relations'] as $key => $relationInfo) {
                switch ($key) {
                    case 'dissociate':
                        DeleteHelper::dissociate($model, $relationInfo);
                        break;
                    case 'remove_pivots':
                        DeleteHelper::removePivots($model, $relationInfo);
                        break;
                    case 'delete_recursive':
                        DeleteHelper::deleteRecursive($model, $relationInfo);
                        break;
                    case 'remove':
                        DeleteHelper::remove($model, $relationInfo);
                        break;
                    default:
                        break;
                }
            }
        }

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
}