<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;


use App\Eco\Cooperation\Cooperation;
use App\Helpers\Delete\DeleteInterface;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * Class DeleteFreeFieldsField
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteMail implements DeleteInterface
{
    private $errorMessage = [];
    private $mail;

    /** Sets the model to delete
     *
     * @param Model $mail the model to delete
     */

    public function __construct(Model $mail)
    {
        $this->mail = $mail;
    }

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup($cleanupType)
    {
        $this->delete();

        $dateToday = Carbon::now();
        $cooperation = Cooperation::first();

        $cleanupItem = $cooperation->cleanupItems()->where('code_ref', $cleanupType)->first();

        $cleanupItem->number_of_items_to_delete = 0;
        $cleanupItem->date_cleaned_up = $dateToday;
        $cleanupItem->save();
    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array
     * @throws
     */
    public function delete()
    {
        $this->canDelete();
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();

        $this->mail->folder = 'removed';
        $this->mail->removed_by_id = Auth::user()->id;
        $this->mail->date_removed = new Carbon();
        $this->mail->save();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {

    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {

    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {

    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {

    }

    /** Model specific delete actions e.g. delete files from server
     */
    public function customDeleteActions()
    {

    }

}