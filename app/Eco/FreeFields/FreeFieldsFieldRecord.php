<?php

namespace App\Eco\FreeFields;

use Illuminate\Database\Eloquent\Model;

class FreeFieldsFieldRecord extends Model
{
    protected $table = 'free_fields_field_records';

    public function freeFieldsField()
    {
        return $this->belongsTo(FreeFieldsField::class, 'field_id');
    }

}


