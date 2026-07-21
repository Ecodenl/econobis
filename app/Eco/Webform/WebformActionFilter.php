<?php

namespace App\Eco\Webform;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class WebformActionFilter extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function action()
    {
        return $this->belongsTo(WebformAction::class, 'webform_action_id');
    }
}
