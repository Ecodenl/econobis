<?php
/**
 * Created by PhpStorm.
 * User: Fren de Haan
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Delete\Models;

use App\Eco\Contact\Contact;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\FinancialOverview\FinancialOverview;
use App\Eco\FinancialOverview\FinancialOverviewContact;
use App\Eco\Project\Project;
use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DeleteDocumentTemplate
 *
 * Relation: 1-n Documents. Action: dissociate
 *
 * @package App\Helpers\Delete
 */
class DeleteDocumentTemplate implements DeleteInterface
{
    private $errorMessage = [];
    private $documentTemplate;

    /** Sets the model to delete
     *
     * @param Model $documentTemplate the model to delete
     */

    public function __construct(Model $documentTemplate)
    {
        $this->documentTemplate = $documentTemplate;
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
        $this->documentTemplate->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted
     *
     */
    public function canDelete()
    {

        $documentTemplateNames = DocumentTemplate::where('base_template_id', $this->documentTemplate->id)->orWhere('header_id', $this->documentTemplate->id)->orWhere('footer_id', $this->documentTemplate->id)->pluck('name')->toArray();
        if($documentTemplateNames){
            abort('409','Ontkoppel eerst de volgende templates: ' . implode(', ', $documentTemplateNames));
        }

        $projectNames = Project::where('document_template_agreement_id', $this->documentTemplate->id)->pluck('name')->toArray();
        if($projectNames){
            abort('409','Ontkoppel template inschrijfformulier eerst in de volgende projecten: ' . implode(', ', $projectNames));
        }

        $projectNames = Project::where('document_template_increase_participations_id', $this->documentTemplate->id)->pluck('name')->toArray();
        if($projectNames){
            abort('409','Ontkoppel template bijschrijfformulier eerst in de volgende projecten: ' . implode(', ', $projectNames));
        }

        // Document template can not be deleted if it is used in financial overviews
        $financialOverviewNames = FinancialOverview::where('document_template_financial_overview_id', $this->documentTemplate->id)->pluck('description')->toArray();
        if($financialOverviewNames){
            array_push($this->errorMessage,'Ontkoppel template eerst in de volgende waardestaten: ' . implode(', ', $financialOverviewNames));
        }
        $financialOverviewContactIds = FinancialOverviewContact::where('document_template_financial_overview_id', $this->documentTemplate->id)->pluck('contact_id')->toArray();
        $contactNumbers = Contact::whereIn('id', array_unique($financialOverviewContactIds))->pluck('number')->toArray();
        if($contactNumbers){
            array_push($this->errorMessage,'Template in gebruik in waardestaten bij contacten: ' . implode(', ', $contactNumbers));
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

    }

    /**
     * Delete relations who dont need their own Delete class
     */
    public function deleteRelations()
    {
//        foreach ($this->documentTemplate->documents as $document){
//            $document->template()->dissociate();
//            $document->save();
//        }
    }


    /** Model specific delete actions e.g. delete files from server
     *
     */
    public function customDeleteActions()
    {
    }
}