<?php

namespace App\Eco\PortalFreeFields;

use Illuminate\Database\Eloquent\Model;

class PortalFreeFieldsPage extends Model
{
    protected $guarded = ['id'];

    protected $table = 'portal_free_fields_pages';

    public function portalFreeFieldsFields()
    {
        return $this->hasMany(PortalFreeFieldsField::class, 'page_id');
    }
}


