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
use Illuminate\Support\Facades\Storage;

/**
 * Interface DeleteInterface
 *
 * @package App\Helpers\Delete
 */
interface DeleteInterface
{
    /** Sets the model to delete
     *
     * @param Model $model the model to delete
     */

    public function __construct(Model $model);

    /** Main method for deleting this model and all it's relations
     * @return array errorMessage array
     * @throws
     */
    public function delete();

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete();

    /** Deletes models recursive
     */
    public function deleteModels();

    /** The relations which should be dissociated
     */
    public function dissociateRelations();

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations();

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions();
}