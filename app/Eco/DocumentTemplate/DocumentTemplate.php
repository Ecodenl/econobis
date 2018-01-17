<?php

namespace App\Eco\DocumentTemplate;

use App\Eco\Document\DocumentGroup;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class DocumentTemplate extends Model
{
    protected $guarded = ['id'];

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function baseTemplate()
    {
        return $this->belongsTo(DocumentTemplate::class);
    }

    public function header()
    {
        return $this->belongsTo(DocumentTemplate::class);
    }

    public function footer()
    {
        return $this->belongsTo(DocumentTemplate::class);
    }

    public function getDocumentGroup()
    {
        if(!$this->document_group) return null;

        return DocumentGroup::get($this->document_group);
    }

    public function getTemplateType()
    {
        if(!$this->template_type) return null;

        return DocumentTemplateType::get($this->template_type);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

}
