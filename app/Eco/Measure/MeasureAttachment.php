<?php

namespace App\Eco\Measure;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class MeasureAttachment extends Model
{

    use SoftDeletes, RevisionableTrait;

    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

}