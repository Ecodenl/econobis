<?php

namespace App\Eco\FreeFields;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class FreeFieldsFieldRecord extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $table = 'free_fields_field_records';

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function freeFieldsField()
    {
        return $this->belongsTo(FreeFieldsField::class, 'field_id');
    }

    public function freeFieldsFieldLogs()
    {
        return $this->hasMany(FreeFieldsFieldLog::class, 'free_fields_field_record_id');
    }

}


