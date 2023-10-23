<?php

namespace App\Eco\FreeFields;

use Illuminate\Database\Eloquent\Model;

class FreeFieldsTable extends Model
{
    protected $table = 'free_fields_tables';

    public function freeFieldsFields()
    {
        return $this->hasMany(FreeFieldsField::class, 'table_id');
    }
}


