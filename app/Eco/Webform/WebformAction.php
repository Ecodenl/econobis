<?php

namespace App\Eco\Webform;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class WebformAction extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function webform()
    {
        return $this->belongsTo(Webform::class);
    }

    public function filters()
    {
        return $this->hasMany(WebformActionFilter::class);
    }
}
