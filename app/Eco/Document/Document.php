<?php

namespace App\Eco\Document;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\DocumentTemplate\DocumentTemplate;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Registration\Registration;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $guarded = ['id'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function registration()
    {
        return $this->belongsTo(Registration::class);
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

}
