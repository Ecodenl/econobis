<?php

namespace App\Eco\PortalFreeFields;

use App\Eco\FreeFields\FreeFieldsFieldFormat;
use App\Eco\FreeFields\FreeFieldsTable;
use Illuminate\Database\Eloquent\Model;

class PortalFreeFieldsField extends Model
{
    protected $guarded = ['id'];

    protected $table = 'portal_free_fields_fields';

    public function freeFieldsTable()
    {
        return $this->belongsTo(FreeFieldsTable::class, 'table_id');
    }

    public function freeFieldsFieldFormat()
    {
        return $this->belongsTo(FreeFieldsFieldFormat::class, 'field_format_id');
    }

    public function portalFreeFieldsPage()
    {
        return $this->belongsTo(PortalFreeFieldsPage::class, 'page_id');
    }

    public function portalFreeFieldsFieldRecords()
    {
        return $this->hasMany(PortalFreeFieldsFieldRecord::class, 'field_id');
    }

    public function hasPortalFreeFieldsFieldRecords(): bool
    {
        return $this->portalFreeFieldsFieldRecords()->exists();
    }
}


