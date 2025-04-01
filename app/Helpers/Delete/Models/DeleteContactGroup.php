<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Cooperation\Cooperation;
use App\Eco\PortalSettingsDashboard\PortalSettingsDashboardWidget;
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
        // contact_group_participation
        // contact_groups_pivot


        // Group can not be deleted if it is used in portalsettings
        $defaultContactGroupMemberId = PortalSettings::get('defaultContactGroupMemberId');
        $defaultContactGroupNoMemberId = PortalSettings::get('defaultContactGroupNoMemberId');
        if($this->contactGroup->id == $defaultContactGroupMemberId || $this->contactGroup->id == $defaultContactGroupNoMemberId){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in algemene portal instellingen.");
        }

        $usedInProjects = Project::where('question_about_membership_group_id', $this->contactGroup->id)->get();
        foreach ($usedInProjects as $usedInProject){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in project " . $usedInProject->code . " - Ledengroep");
        }

        $usedInProjects = Project::where('member_group_id', $this->contactGroup->id)->get();
        foreach ($usedInProjects as $usedInProject){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in project " . $usedInProject->code . " - Contacten die keuze 1 maken toevoegen aan");
        }

        $usedInProjects = Project::where('no_member_group_id', $this->contactGroup->id)->get();
        foreach ($usedInProjects as $usedInProject){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in project " . $usedInProject->code . " - Contacten die keuze 2 maken toevoegen aan");
        }

        $usedInTeams = $this->contactGroup->teams()->get();
        foreach ($usedInTeams as $usedInTeam){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in team " . $usedInTeam->name);
        }

        $usedInCooperation = cooperation::where('hoom_group_id', $this->contactGroup->id)->count();
        if ($usedInCooperation > 0){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in de cooperatie als Hoom groep");
        }

        $usedInPortalSettingsDashboardWidgets = PortalSettingsDashboardWidget::where('show_group_id', $this->contactGroup->id)->get();
        foreach ($usedInPortalSettingsDashboardWidgets as $usedInPortalSettingsDashboardWidget){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in de dashboard widget " . $usedInPortalSettingsDashboardWidget->title . " - Zichtbaar voor groep");
        }

        $usedInPortalSettingsDashboardWidgets = PortalSettingsDashboardWidget::where('hide_group_id', $this->contactGroup->id)->get();
        foreach ($usedInPortalSettingsDashboardWidgets as $usedInPortalSettingsDashboardWidget){
            array_push($this->errorMessage, "Deze groep wordt nog gebruikt in de dashboard widget " . $usedInPortalSettingsDashboardWidget->title . " - Verborgen voor groep");
        }

        $isParentGroupForGroups = $this->contactGroup->contactGroups()->get();
        foreach ($isParentGroupForGroups as $isParentGroupForGroup){
            array_push($this->errorMessage, "Deze groep heeft nog een sub groep " . $isParentGroupForGroup->name);
        }

        $isSubGroupFromGroups = $this->contactGroup->parent_groups_array;
        if($isSubGroupFromGroups) {
            foreach ($isSubGroupFromGroups as $key => $value) {
                array_push($this->errorMessage, "Deze groep is onderdeel van de volgende groep " . $value);
            }
        }

        $isParentGroupForGroupsExcepted = $this->contactGroup->contactGroupsExcepted()->get();
        foreach ($isParentGroupForGroupsExcepted as $isParentGroupForGroupExcepted){
            array_push($this->errorMessage, "Deze groep heeft nog een uitgezonderde sub groep " . $isParentGroupForGroupExcepted->name);
        }

        $isSubGroupFromGroupsExcepted = $this->contactGroup->parent_groups_excepted_array;
        if($isSubGroupFromGroupsExcepted) {
            foreach ($isSubGroupFromGroupsExcepted as $key => $value) {
                array_push($this->errorMessage, "Deze groep is uitgezonderd onderdeel van de volgende groep " . $value);
            }
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
        foreach ($this->contactGroup->tasks as $task){
            $task->contactGroup()->dissociate();
            $task->save();
        }

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