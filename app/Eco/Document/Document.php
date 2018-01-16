<?php

namespace App\Eco\Document;

use App\Eco\Contact\Contact;
use App\Eco\ContactGroup\ContactGroup;
use App\Eco\Opportunity\Opportunity;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $guarded = ['id'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
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
        if(!$this->status) return null;

        return DocumentGroup::get($this->status);
    }

    public function getDocumentType()
    {
        if(!$this->status) return null;

        return DocumentType::get($this->status);
    }

}
