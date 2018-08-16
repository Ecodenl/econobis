<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Administration\Administration;
use App\Eco\Order\Order;
use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteEmailTemplate
 *
 *
 *  Relation: 1-n administration default template. Action: dissociate
 *  Relation: 1-n administration default reminder. Action: dissociate
 *  Relation: 1-n administration default exhortations. Action: dissociate
 *  Relation: 1-n order template. Action: dissociate
 *  Relation: 1-n order reminder. Action: dissociate
 *  Relation: 1-n order exhortations. Action: dissociate
 *
 * @package App\Helpers\Delete
 */
class DeleteEmailTemplate implements DeleteInterface
{
    private $errorMessage = [];
    private $emailTemplate;

    /** Sets the model to delete
     *
     * @param Model $emailTemplate the model to delete
     */

    public function __construct(Model $emailTemplate)
    {
        $this->emailTemplate = $emailTemplate;
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
        $this->emailTemplate->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {

    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {

    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach (Administration::where('email_template_id', $this->emailTemplate->id)->get() as $administration) {
            $administration->emailTemplateId()->dissociate();
            $administration->save();
        }

        foreach (Administration::where('email_template_reminder_id', $this->emailTemplate->id)->get() as $administration){
            $administration->emailTemplateReminder()->dissociate();
            $administration->save();
        }

        foreach (Administration::where('email_template_exhortation_id', $this->emailTemplate->id)->get() as $administration){
            $administration->emailTemplateExhortation()->dissociate();
            $administration->save();
        }

        foreach (Order::where('email_template_id', $this->emailTemplate->id)->get() as $administration) {
            $administration->emailTemplateId()->dissociate();
            $administration->save();
        }

        foreach (Order::where('email_template_reminder_id', $this->emailTemplate->id)->get() as $administration){
            $administration->emailTemplateReminder()->dissociate();
            $administration->save();
        }

        foreach (Order::where('email_template_exhortation_id', $this->emailTemplate->id)->get() as $administration){
            $administration->emailTemplateExhortation()->dissociate();
            $administration->save();
        }

    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {

    }


    /** Model specific delete actions e.g. delete files from server
     *
     */
    public function customDeleteActions()
    {
    }
}