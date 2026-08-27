<?php

namespace App\Eco\PortalFreeFields;

use App\Eco\FreeFields\FreeFieldsField;
use App\Eco\FreeFields\FreeFieldsFieldFormat;
use App\Eco\FreeFields\FreeFieldsTable;
use Illuminate\Database\Eloquent\Model;

class PortalFreeFieldsField extends Model
{
    protected $guarded = ['id'];

    protected $table = 'portal_free_fields_fields';

    public function portalFreeFieldsPage()
    {
        return $this->belongsTo(PortalFreeFieldsPage::class, 'page_id');
    }

    public function freeFieldsField()
    {
        return $this->belongsTo(FreeFieldsField::class, 'field_id');
    }

}


