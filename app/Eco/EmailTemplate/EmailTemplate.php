<?php

namespace App\Eco\EmailTemplate;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use JosKolenberg\LaravelJory\Traits\JoryTrait;
use Venturecraft\Revisionable\RevisionableTrait;

class EmailTemplate extends Model
{
    use RevisionableTrait, SoftDeletes, JoryTrait;
    protected $guarded = ['id'];

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

}
