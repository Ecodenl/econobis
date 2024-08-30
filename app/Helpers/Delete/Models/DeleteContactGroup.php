<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Project\Project;
use App\Helpers\Delete\DeleteInterface;
use App\Helpers\Laposta\LapostaListHelper;
use App\Helpers\Settings\PortalSettings;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteContactGroup
 *
 * Relation 1-n: Documents. Action: dissociate
 * Relation 1-n: Emails. Action: dissociate
 * Relation 1-n: Tasks. Action: call DeleteTask
 *
 * @package App\Helpers\Delete
 */
class DeleteContactGroup implements DeleteInterface
{
    private $errorMessage = [];
    private $contactGroup;

    /** Sets the model to delete
     *
     * @param Model $contactGroup the model to delete
     */

    public function __construct(Model $contactGroup)
    {
        $this->contactGroup = $contactGroup;
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
        $this->contactGroup->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {
        //TODO: onderstaande zaken verder nakijken
        // Team kan contactgroepen hebben: koppeling blijft bestaan na verwijderen van de groep
        // tabel contact_group_participation uitzoeken


        // Group can not be deleted if it is used in portalsettings
        $defaultContactGroupMemberId = PortalSettings::get('defaultContactGroupMemberId');
        $defaultContactGroupNoMemberId = PortalSettings::get('defaultContactGroupNoMemberId');
        if($this->contactGroup->id == $defaultContactGroupMemberId || $this->contactGroup->id == $defaultContactGroupNoMemberId){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in algemene portal instellingen.");
        }

        if(Project::where('question_about_membership_group_id', $this->contactGroup->id)->exists()){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in projecten - Ledengroep");
        }
        if(Project::where('member_group_id', $this->contactGroup->id)->exists()){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in projecten - Contacten die keuze 1 maken toevoegen aan");
        }
        if(Project::where('no_member_group_id', $this->contactGroup->id)->exists()){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in projecten - Contacten die keuze 2 maken toevoegen aan");
        }

        array_push($this->errorMessage, "Stoppen tbv debug");

    }

    /** Deletes models recursive
     *
     */
    public function deleteModels()
    {
        foreach ($this->contactGroup->tasks as $task){
            $deleteTask = new DeleteTask($task);
            $this->errorMessage = array_merge($this->errorMessage, $deleteTask->delete());
        }
    }

    /** The relations which should be dissociated
     */
    public function dissociateRelations()
    {
        foreach ($this->contactGroup->documents as $document){
            $document->contactGroup()->dissociate();
            $document->save();
        }

        foreach ($this->contactGroup->emails as $email){
            $email->contactGroup()->dissociate();
            $email->save();
        }

        $this->contactGroup->contacts()->detach();
        $this->contactGroup->participants()->detach();
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
        if($this->contactGroup->laposta_list_id != null){
            $lapostaListHelper = new LapostaListHelper($this->contactGroup, false);
            $lapostaListHelper->deleteList();
        }

    }
}