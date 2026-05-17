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
use Illuminate\Support\Facades\Log;

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
    public function cleanup()
    {
        try{
            if (! $this->canCleanup()) {
                return $this->errorMessage;
            }
            return $this->delete();
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Emails', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Emails. (meld dit bij Econobis support)");
            return $this->errorMessage;
        }
    }

    /** Main method for deleting this model and all it's relations
     *
     * @return array
     * @throws
     */
    public function delete()
    {
        if (! $this->canDelete()) {
            return $this->errorMessage;
        }
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();

        if( count($this->errorMessage) === 0 ) {
            $this->mail->folder = 'removed';
            $this->mail->removed_by_id = Auth::user()->id;
            $this->mail->date_removed = new Carbon();
            $this->mail->save();
        }

        return $this->errorMessage;
    }

    public function canDelete(): bool
    {
        // van hier uit altijd true
        return true;

    }

    public function canCleanup(): bool
    {
        $cooperation = Cooperation::first();

        if (! $cooperation?->cleanup_email) {
            $this->errorMessage[] =
                "E-mailcorrespondentie opschonen staat uit voor deze coöperatie.";

            return false;
        }

        if (
            $this->mail->order_id !== null
            || $this->mail->invoice_id !== null
            || $this->mail->participation_project_id !== null
            || $this->mail->intake_id !== null
            || $this->mail->opportunity_id !== null
        ) {
            $this->errorMessage[] =
                "Email {$this->mail->id} is nog gekoppeld aan een order, nota, deelname, intake of kans en mag daarom niet opgeschoond worden.";

            return false;
        }

        return true;
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