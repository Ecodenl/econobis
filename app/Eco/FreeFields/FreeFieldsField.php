<?php

namespace App\Eco\FreeFields;

use Illuminate\Database\Eloquent\Model;

class FreeFieldsField extends Model
{
    protected $guarded = ['id'];

    protected $table = 'free_fields_fields';
//    protected $fillable = ['table_id','field_format_id','field_name','visible_portal','change_portal','mandatory','default_value'];

    public function freeFieldsTable()
    {
        return $this->belongsTo(FreeFieldsTable::class, 'table_id');
    }

    public function freeFieldsFieldFormat()
    {
        return $this->belongsTo(FreeFieldsFieldFormat::class, 'field_format_id');
    }
}


