<?php

namespace App\Eco\Document;

use App\Eco\Administration\Administration;
use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Intake\Intake;
use App\Eco\Order\Order;
use App\Eco\ParticipantProject\ParticipantProject;
use App\Eco\Portal\PortalUser;
use App\Eco\Project\Project;
use App\Eco\QuotationRequest\QuotationRequest;
use App\Eco\Task\Task;
use App\Eco\User\User;
//use App\Helpers\Alfresco\AlfrescoHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Venturecraft\Revisionable\RevisionableTrait;

class Document extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function intake()
    {
        return $this->belongsTo(Intake::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function contactGroup()
    {
        return $this->belongsTo(ContactGroup::class);
    }

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function sentBy()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function documentCreatedFrom()
    {
        return $this->belongsTo(DocumentCreatedFrom::class);
    }

    public function getDocumentGroup()
    {
        if(!$this->document_group) return null;

        return DocumentGroup::get($this->document_group);
    }

    public function getDocumentType()
    {
        if(!$this->document_type) return null;

        return DocumentType::get($this->document_type);
    }

    public function template(){
        return $this->belongsTo(DocumentTemplate::class);
    }

    public function housingFile(){
        return $this->belongsTo(HousingFile::class);
    }

    public function campaign(){
        return $this->belongsTo(Campaign::class);
    }

    public function measure(){
        return $this->belongsTo(Measure::class);
    }

    public function task(){
        return $this->belongsTo(Task::class);
    }

    public function quotationRequest(){
        return $this->belongsTo(QuotationRequest::class);
    }

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function participant(){
        return $this->belongsTo(ParticipantProject::class, 'participation_project_id', 'id');
    }

    public function createdByPortalUser(){
        return $this->belongsTo(PortalUser::class, 'created_by_portal_user_id', 'id');
    }

    public function newEloquentBuilder($query)
    {
        return new DocumentBuilder($query);
    }

    public function getFileContents()
    {
        // indien document was gemaakt in a storage map (file_path_and_name ingevuld), dan halen we deze op uit die storage map.
        if ($this->file_path_and_name != null) {
            return Storage::disk('documents')->get($this->file_path_and_name);

        // anders indien alfresco_node_id ingevuld, dan halen we deze op uit Alfreso.
//        } elseif ($this->alfresco_node_id != null) {
//            $alfrescoHelper = new AlfrescoHelper(\Config::get('app.ALFRESCO_COOP_USERNAME'), \Config::get('app.ALFRESCO_COOP_PASSWORD'));
//            return $alfrescoHelper->downloadFile($this->alfresco_node_id);
        }

        return null;

    }
}
