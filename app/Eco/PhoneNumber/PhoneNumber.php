<?php

namespace App\Eco\PhoneNumber;

use App\Eco\AbstractType\HasTypeTrait;
use App\Eco\Contact\Contact;
use App\Eco\PhoneNumber\PhoneNumberType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class PhoneNumber extends Model
{

    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'primary' => 'boolean',
    ];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function getType()
    {
        if(!$this->type_id) return null;

        return PhoneNumberType::get($this->type_id);
    }
}
