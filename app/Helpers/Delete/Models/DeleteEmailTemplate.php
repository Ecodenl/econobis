<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Administration\Administration;
use App\Eco\Opportunity\OpportunityStatus;
use App\Eco\Order\Order;
use App\Eco\QuotationRequest\QuotationRequestStatus;
use App\Eco\Task\TaskType;
use App\Helpers\Delete\DeleteInterface;
use App\Eco\PortalSettings\PortalSettings;
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
        // Email template can not be deleted if it is used in portalsettings
        $emailTemplateNewAccountId = PortalSettings::first()?->email_template_new_account_id;
        if($emailTemplateNewAccountId == $this->emailTemplate->id){
            array_push($this->errorMessage,'Ontkoppel deze template eerst in Portal instellingen bij "E-mail template Nieuwe account activeren"');
        }
        $taskTypesNames = TaskType::where('email_template_id_wf_expired_task', $this->emailTemplate->id)->orWhere('email_template_id_wf_completed_task', $this->emailTemplate->id)->pluck('name')->toArray();
        if($taskTypesNames){
            array_push($this->errorMessage,'Ontkoppel template eerst in de volgende Taak types: ' . implode(', ', $taskTypesNames));
        }
        $quotationRequestStatusNames = QuotationRequestStatus::where('email_template_id_wf', $this->emailTemplate->id)->pluck('name')->toArray();
        if($quotationRequestStatusNames){
            array_push($this->errorMessage,'Ontkoppel template eerst in de volgende kansactie statussen: ' . implode(', ', $quotationRequestStatusNames));
        }
        $opportunityStatusNames = OpportunityStatus::where('email_template_id_wf', $this->emailTemplate->id)->pluck('name')->toArray();
        if($opportunityStatusNames){
            array_push($this->errorMessage,'Ontkoppel template eerst in de volgende kans statusen: ' . implode(', ', $opportunityStatusNames));
        }

        // Email template can not be deleted if it is used in administrations
        $administrationNames = Administration::where('email_template_id_collection', $this->emailTemplate->id)->orWhere('email_template_id_transfer', $this->emailTemplate->id)->orWhere('email_template_reminder_id', $this->emailTemplate->id)->orWhere('email_template_exhortation_id', $this->emailTemplate->id)->orWhere('email_template_financial_overview_id', $this->emailTemplate->id)->pluck('name')->toArray();
        if($administrationNames){
            array_push($this->errorMessage,'Ontkoppel template eerst in de volgende administraties: ' . implode(', ', $administrationNames));
        }

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
        foreach (Order::where('email_template_id_collection', $this->emailTemplate->id)->get() as $order) {
            $order->emailTemplateCollection()->dissociate();
            $order->save();
        }

        foreach (Order::where('email_template_id_transfer', $this->emailTemplate->id)->get() as $order) {
            $order->emailTemplateTransfer()->dissociate();
            $order->save();
        }

        foreach (Order::where('email_template_reminder_id', $this->emailTemplate->id)->get() as $order){
            $order->emailTemplateReminder()->dissociate();
            $order->save();
        }

        foreach (Order::where('email_template_exhortation_id', $this->emailTemplate->id)->get() as $order){
            $order->emailTemplateExhortation()->dissociate();
            $order->save();
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