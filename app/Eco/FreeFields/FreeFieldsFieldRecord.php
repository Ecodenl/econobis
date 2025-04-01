<?php

namespace App\Eco\FreeFields;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class FreeFieldsFieldRecord extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'free_fields_field_records';

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    public function freeFieldsField()
    {
        return $this->belongsTo(FreeFieldsField::class, 'field_id');
    }

}


