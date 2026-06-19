<?php

namespace App\Eco\FreeFields;

use App\Eco\PortalFreeFields\PortalFreeFieldsField;
use Illuminate\Database\Eloquent\Model;

class FreeFieldsField extends Model
{
    protected $guarded = ['id'];

    protected $table = 'free_fields_fields';

    public function freeFieldsTable()
    {
        return $this->belongsTo(FreeFieldsTable::class, 'table_id');
    }

    public function freeFieldsFieldFormat()
    {
        return $this->belongsTo(FreeFieldsFieldFormat::class, 'field_format_id');
    }
    public function freeFieldsFieldRecords()
    {
        return $this->hasMany(FreeFieldsFieldRecord::class, 'field_id');
    }

    public function hasFreeFieldsFieldRecords(): bool
    {
        return $this->freeFieldsFieldRecords()->exists();
    }

    public function portalFreeFieldsFields()
    {
        return $this->hasMany(PortalFreeFieldsField::class, 'field_id');
    }

}


