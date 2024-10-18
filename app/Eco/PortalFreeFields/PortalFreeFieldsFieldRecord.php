<?php

namespace App\Eco\PortalFreeFields;

use Illuminate\Database\Eloquent\Model;

class PortalFreeFieldsFieldRecord extends Model
{
    protected $table = 'free_fields_field_records';

    public function portalFreeFieldsField()
    {
        return $this->belongsTo(PortalFreeFieldsField::class, 'field_id');
    }

}


