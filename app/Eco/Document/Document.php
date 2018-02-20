<?php

namespace App\Eco\Document;

use App\Eco\Campaign\Campaign;
use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\HousingFile\HousingFile;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Intake\Intake;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Document extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function intake()
    {
        return $this->belongsTo(Intake::class);
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
}
