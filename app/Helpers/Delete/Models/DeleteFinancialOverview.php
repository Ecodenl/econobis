<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 10-8-2018
 * Time: 14:37
 */

namespace App\Helpers\Delete\Models;


use App\Helpers\Delete\DeleteInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class DeleteFinancialOverview
 *
 * Relation: 1-n Emails. Action: dissociate
 * Relation: 1-n Documents. Action: dissociate
 * Relation: 1-n Tasks & notes. Action: call DeleteTask
 * Relation: 1-n Quotation requests. Action: call DeleteQuotationRequest
 *
 * @package App\Helpers\Delete\Models
 */
class DeleteFinancialOverview implements DeleteInterface
{
    private $errorMessage = [];
    private $financialOverview;

    /** Sets the model to delete
     *
     * @param Model $financialOverview the model to delete
     */

    public function __construct(Model $financialOverview)
    {
        $this->financialOverview = $financialOverview;
    }

    /** If it's called by the cleanup functionality, we land on this function, else on the delete function
     *
     * @return array
     * @throws
     */
    public function cleanup()
    {
        try{
            $this->delete();
            if(!empty($this->errorMessage)) {
                return $this->errorMessage;
            }
        }catch (\Exception $exception){
            Log::error('Fout bij opschonen Waardestaten', [
                'exception' => $exception->getMessage(),
                'errormessages' => implode(' | ', $this->errorMessage),
            ]);
            array_push($this->errorMessage, "Fout bij opschonen Waardestaten. (meld dit bij Econobis support)");
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
        $this->canDelete();
        $this->deleteModels();
        $this->dissociateRelations();
        $this->deleteRelations();
        $this->customDeleteActions();
        $this->financialOverview->delete();

        return $this->errorMessage;
    }

    /** Checks if the model can be deleted and sets error messages
     */
    public function canDelete()
    {
        if($this->financialOverview->definitive == true){
            array_push($this->errorMessage, "Deze waardestaat is al definitief.");
        }
        if($this->financialOverview->financialOverviewProjects->where('definitive', true)->count() > 0){
            array_push($this->errorMessage, "Er zijn al definitieve projecten gekoppeld aan deze waardestaat.");
        }
        if($this->financialOverview->financialOverviewContacts->where('status_id', '!=', 'concept')->count() > 0){
            array_push($this->errorMessage, "Er zijn al contacten in behandeling voor deze waardestaat.");
        }
        if($this->financialOverview->financialOverviewPosts->count() > 0){
            array_push($this->errorMessage, "Er zijn al bestanden waardestaten post gemaakt.");
        }
    }

    /** Deletes models recursive
     */
    public function deleteModels()
    {
        foreach ($this->financialOverview->financialOverviewProjects as $financialOverviewProject){
            $deleteFinancialOverviewProject = new DeleteFinancialOverviewProject($financialOverviewProject);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewProject->delete() ?? [] ) );
        }

        foreach ($this->financialOverview->financialOverviewContacts as $financialOverviewContact){
            $deleteFinancialOverviewContact = new DeleteFinancialOverviewContact($financialOverviewContact);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewContact->delete() ?? [] ) );
        }

        foreach ($this->financialOverview->financialOverviewPosts as $financialOverviewPost){
            $deleteFinancialOverviewPost = new DeleteFinancialOverviewPost($financialOverviewPost);
            $this->errorMessage = array_merge($this->errorMessage, ( $deleteFinancialOverviewPost->delete() ?? [] ) );
        }

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